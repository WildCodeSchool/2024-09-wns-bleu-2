import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Field,
} from "type-graphql";
import * as argon2 from "argon2";
import { Gender, User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { LoginInput } from "../inputs/LoginInput";
import { CarInfos } from "../entities/CarInfos";
import { TempUser } from "../entities/TempUser";
import { Resend } from "resend";
import jwt, { Secret } from "jsonwebtoken";
import { GraphQLError } from "graphql";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: String;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  birthdate?: Date;

  @Field({ nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  car?: CarInfos;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    // Vérifie si l'email existe déjà
    const existingUser = await User.findOne({
      where: { email: newUserData.email },
    });
    if (existingUser) {
      throw new GraphQLError("Email already used.", {
        extensions: { code: "EMAIL_ALREADY_USED" },
      });
    } else {
      // Vérification de l'âge : doit être >= à 18 ans
      const birthdate = new Date(newUserData.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      if (age < 18) {
        throw new GraphQLError(
          "The user must be at least 18 years old to register.",
          {
            extensions: { code: "UNDER_AGE" },
          }
        );
      }

      // On génère un code aléatoire à 6 chiffres
      const generateRandomCode = () => {
        let code = "";
        // code à 6 chiffres random, de 0 à 9
        for (let i = 0; i < 6; i++) {
          code += Math.floor(Math.random() * 10);
        }
        return code;
      };
      const randomCode = generateRandomCode();
      
      // On sauvegarde l'utilisateur dans la table TempUser avec toutes ses infos
      const result = new TempUser();
      result.email = newUserData.email;
      result.password = await argon2.hash(newUserData.password);
      result.randomCode = randomCode;
      result.firstname = newUserData.firstname;
      result.lastname = newUserData.lastname;
      result.birthdate = newUserData.birthdate;
      result.gender = newUserData.gender as Gender;
      result.phone = newUserData.phone;

      await result.save();

      let car: CarInfos | null = null;
      if (newUserData.brand || newUserData.year || newUserData.color) {
        car = new CarInfos();
        car.brand = newUserData.brand || "";
        car.year = newUserData.year || 0;
        car.color = newUserData.color || "";
        await car.save();
      }

      if (car) {
        result.car = car;
        await result.save();
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      (async function () {
        const { data, error } = await resend.emails.send({
          from: "GrumpyCar <onboarding@resend.dev>",
          to: [newUserData.email],
          subject: "GrumpyCar - Confirmez votre email",
          html: `
                <p style="color:#1a1a1a;">Bonjour <strong>${result.firstname}</strong>, merci d'avoir rejoint <strong>GrumpyCar</strong> ! 🚗</p>
                <p style="color:#1a1a1a;">Pour finaliser votre inscription, il ne vous reste plus qu'à saisir ce code dans le formulaire de validation.</p>
                <p style="color:#1a1a1a;">Votre code de confirmation : <strong>${randomCode}</strong>.</p>
                <p style="color:#1a1a1a;">Si vous n’avez pas demandé cette validation, ne tenez pas compte de ce message.</p>
                <p style="color:#1a1a1a;">À très vite 😾</p>
                <p style="color:#1a1a1a;">L'équipe <strong>GrumpyCar</strong></p>
                `,
        });

        if (error) {
          console.error("Email sending error.", error);
        } else {
          console.log("Email successfully sent.", data);
        }
      })();
    }
    return "The user is temporarily created. The email confirmation is required.";
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("codeByUser") codeByUser: string) {
    const tempUser = await TempUser.findOne({
      where: { randomCode: codeByUser },
      relations: ["car"],
    });

    if (!tempUser) {
      throw new Error("Temp user not found");
    }

    // Expiration du code sous 10min
    const now = new Date().getTime();
    const createdAt = new Date(tempUser.createdAt).getTime();
    const difference = now - createdAt;

    const expirationTime = 10 * 60 * 1000;

    if (difference > expirationTime) {
      await tempUser.remove();
      throw new GraphQLError("Code has expired", {
        extensions: { code: "CODE_EXPIRED" },
      });
    }

    const user = new User();
    user.email = tempUser.email;
    user.password = tempUser.password;
    user.firstname = tempUser.firstname;
    user.lastname = tempUser.lastname;
    user.birthdate = tempUser.birthdate;
    user.gender = tempUser.gender as Gender;
    user.phone = tempUser.phone;

    if (tempUser.car) {
      user.car = tempUser.car;
    }

    await user.save();
    await tempUser.remove();

    return "User email confirmed with success.";
  }

  @Mutation(() => String)
  async login(@Arg("data") loginData: LoginInput, @Ctx() context: any) {
    const user = await User.findOneBy({ email: loginData.email });
    if (!user) throw new GraphQLError("Incorrect login", { extensions: { code: "INVALID_CREDENTIALS" } });

    const isPasswordCorrect = await argon2.verify(user.password, loginData.password);
    if (!isPasswordCorrect) throw new GraphQLError("Incorrect login", { extensions: { code: "INVALID_CREDENTIALS" } });

    
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY as Secret);
      /* Le jwt prend 2 arguments :
         1. Les éléments du payload (exemple : email, role, etc)
         2. La clé secrète (stockée dans un fichier .env pour plus de sécurité)
      */
 
      // Stockage du token dans les cookies
      // Cookie sécurisé en prod, pas en dev
    const isProd = process.env.NODE_ENV === "production";
    context.res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; SameSite=Lax; Secure=${isProd}`
    );

    console.log("User logged in:", user.email);
    return "User logged in.";
  }

  @Mutation(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader(
      "Set-Cookie",
      `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
    );
    return "User logged out.";
  }

  @Mutation(() => User)
  async setUserCar(
    @Arg("userId") userId: number,
    @Arg("carId") carId: number
  ): Promise<User> {
    const user = await User.findOne({
      where: { id: userId },
      relations: ["car"],
    });
    if (!user) throw new Error("User not found");

    const car = await CarInfos.findOne({ where: { id: carId } });
    if (!car) throw new Error("Car not found");

    user.car = car;
    await user.save();
    return user;
  }

  @Query(() => [User])
  async getAllUsers() {
    return await User.find({ relations: ["carpools"] });
  }

  @Query(() => User, { nullable: true })
  async getUserInfoConnexion(@Ctx() context: any): Promise<User | null> {
    try {
      const token = context.req.cookies.token;
      if (!token) return null;

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as Secret
      ) as { email: string };

      const user = await User.findOne({
        where: { email: decoded.email },
      });

      return user || null;
    } catch (error) {
      console.error("Erreur getUserInfo:", error);
      return null;
    }
  }

  @Mutation(() => User)
  async updateUserProfile(
    @Arg("email") email: string,
    @Arg("firstname", { nullable: true }) firstname?: string,
    @Arg("lastname", { nullable: true }) lastname?: string,
    @Arg("birthdate", { nullable: true }) birthdate?: Date,
    @Arg("gender", { nullable: true }) gender?: Gender,
    @Arg("phone", { nullable: true }) phone?: string,
    @Arg("avatar", { nullable: true }) avatar?: string
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    if (firstname !== undefined) user.firstname = firstname;
    if (lastname !== undefined) user.lastname = lastname;
    if (birthdate !== undefined) user.birthdate = birthdate;
    if (gender !== undefined) user.gender = gender;
    if (phone !== undefined) user.phone = phone;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    return user;
  }

  @Query(() => UserInfo)
  async getUserInfo(@Ctx() context: any) {
    if (context.email) {
      const user = await User.findOne({
        where: { email: context.email },
        relations: ["car"],
      });

      if (user) {
        return {
          isLoggedIn: true,
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          birthdate: user.birthdate,
          gender: user.gender,
          phone: user.phone,
          avatar: user.avatar || "",
          car: user.car,
        };
      } else {
        return { isLoggedIn: false };
      }
    } else {
      return { isLoggedIn: false };
    }
  }

  @Mutation(() => CarInfos)
  async updateCarInfos(
    @Arg("color") color: string,
    @Arg("year") year: number,
    @Arg("brand") brand: string,
    @Arg("userId") userId: number
  ): Promise<CarInfos> {
    const user = await User.findOne({
      where: { id: userId },
      relations: ["car"],
    });
    if (!user) throw new Error("User not found");

    if (!user.car) {
      const newCar = CarInfos.create({ brand, color, year });
      await newCar.save();

      user.car = newCar;
      await user.save();

      return newCar;
    } else {
      user.car.brand = brand;
      user.car.color = color;
      user.car.year = year;
      await user.car.save();

      return user.car;
    }
  }
}
