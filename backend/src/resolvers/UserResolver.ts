import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { Gender, User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { CarInfos } from "../entities/CarInfos";
import { TempUser } from "../entities/TempUser";
import { Resend } from "resend";

@Resolver(User)
export class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
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
}