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
import { v4 as uuidv4 } from "uuid";
import { Gender, User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { LoginInput } from "../inputs/LoginInput";
import { CarInfos } from "../entities/CarInfos";
import { TempUser } from "../entities/TempUser";
import { Resend } from "resend";
import jwt, { Secret } from "jsonwebtoken";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

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
      throw new Error("This email is already used.");
    } else {
      // On génère un code aléatoire
      const randomCode = uuidv4();
      // On sauvegarde l'utilisateur dans la table TempUser ave toutes ses infos
      const result = await TempUser.save({
        email: newUserData.email,
        password: await argon2.hash(newUserData.password),
        randomCode: randomCode,
        firstname: newUserData.firstname,
        lastname: newUserData.lastname,
        birthdate: newUserData.birthdate,
        gender: newUserData.gender as Gender,
        phone: newUserData.phone,
      });
      const resend = new Resend(process.env.RESEND_API_KEY);

      (async function () {
        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [newUserData.email],
          subject: "Verify Email",
          html: `
                <p>Merci de cliquer sur le lien ci-dessous pour valider votre adresse email</p>
                <a href="http://localhost:8000/email-confirmation/${randomCode}">
                  http://localhost:8000/email-confirmation/${randomCode}
                </a>
                `,
        });

        if (error) {
          return console.error({ error });
        }
        console.log({ data });
      })();
      console.log("result", result);
    }
    return "The user is temporarily created. Please check your email for the confirmation code.";
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("codeByUser") codeByUser: string) {
    const tempUser = await TempUser.findOneByOrFail({ randomCode: codeByUser });
    // L'utilisateur a bien confirmé son adresse, on l'enregistre dans la table user
    await User.save({
      email: tempUser.email,
      password: tempUser.password,
      firstname: tempUser.firstname,
      lastname: tempUser.lastname,
      birthdate: tempUser.birthdate,
      gender: tempUser.gender as Gender,
      phone: tempUser.phone,
    });
    // et on le retire de la table tempUser
    tempUser.remove();
    return "User email confirmed with success.";
  }

  @Mutation(() => String)
  async login(@Arg("data") loginData: LoginInput, @Ctx() context: any) {
    let isPasswordCorrect = false;
    // On récupère l'utilisateur via son email s'il existe
    // "findOneByOrFail" nous renverrait comme erreur que l'email n'est pas bon, pour des raisons de sécurité, on utilise findOneBy
    const user = await User.findOneBy({ email: loginData.email });
    if (user) {
      isPasswordCorrect = await argon2.verify(
        user.password,
        loginData.password
      );
    }
    // On vérifie son mdp => retourne un booléen
    if (isPasswordCorrect && user) {
      /* Le jwt prend 2 arguments :
         1. Les éléments du payload (exemple : email, role, etc)
         2. La clé secrète (stockée dans un fichier .env pour plus de sécurité)
      */
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY as Secret
      );
      // Stockage du token dans les cookies
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);
      return "User logged in.";
    } else {
      throw new Error("Incorrect login");
    }
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
    if (!car) throw new Error("Car model not found");

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

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as { email: string };

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
      // Recherche de l'utilisateur dans la base de données en fonction de son email
      const user = await User.findOne({ where: { email: context.email } });

      if (user) {
        return {
          isLoggedIn: true,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          birthdate: user.birthdate, // Assure-toi que la date est au bon format ISO 8601
          gender: user.gender,
          phone: user.phone,
          avatar: user.avatar || "", // Si l'avatar n'est pas défini, on renvoie une chaîne vide
        };
      } else {
        return { isLoggedIn: false };
      }
    } else {
      return { isLoggedIn: false };
    }
  }
}