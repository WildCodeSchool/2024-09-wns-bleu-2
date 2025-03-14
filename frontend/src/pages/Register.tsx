import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";

const Register = () => {
   const [signUp] = useRegisterMutation();
   const navigate = useNavigate();

   type InputValues = {
      email: string,
      password: string,
      confirmPassword: string,
      firstname: string,
      lastname: string,
      birthdate: string,
      gender: string,
      phone: string
   }

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch
   } = useForm<InputValues>();

   const password = watch("password");
   const confirmPassword = watch("confirmPassword");

   const onSubmit: SubmitHandler<InputValues> = (data) => {
      if (password !== confirmPassword) {
         toast.error("Les mots de passe ne correspondent pas.");
         return;
      } else {
         const birthdateForBackend = new Date(data.birthdate).toISOString();
         const dataForBackend = {
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            birthdate: birthdateForBackend,
            gender: data.gender,
            phone: data.phone
         };
   
         console.log("data for backend", dataForBackend);
         
         signUp({ 
            variables: { data: dataForBackend },
            onCompleted: () => {
               toast.success("Vous pouvez à présent confirmer votre adresse email et vous connecter.");
               navigate("/");
            },
            onError: (error: any) => {
               console.log("Error details:", error);
               if (error) {
                  toast.error("Cet email est déjà utilisé. Veuillez en choisir un autre.");
              } else {
                  toast.error("Une erreur s'est produite lors de la création de votre compte.");
              }
            },
         });
      }

   }

   return (
      <>
         <h1>Inscription</h1>
         <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="lastname">Nom
               <input type="text" placeholder="Doe" {...register("lastname", { required: true })} />
               {errors.lastname && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="firstname">Prénom
               <input type="text" placeholder="John" {...register("firstname", { required: true })} />
               {errors.firstname && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="birthdate">Date de naissance
               <input type="date" {...register("birthdate", { required: true })} />
               {errors.birthdate && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="gender">Genre
               <div>
                  <label>
                     <input 
                        type="radio" 
                        value="Homme" 
                        {...register("gender", { required: true })} 
                     />
                     Homme
                  </label>
                  <label>
                     <input 
                        type="radio" 
                        value="Femme" 
                        {...register("gender", { required: true })} 
                     />
                     Femme
                  </label>
               </div>
               {errors.gender && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="login">Adresse email
               <input type="email" placeholder="johndoe@gmail.com" {...register("email", { required: true })} />
               {errors.email && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="phone">Téléphone
               <input type="tel" placeholder="0675896158" {...register("phone", { required: true })} />
               {errors.phone && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="password">Mot de passe
               <input type="password" {...register("password", { required: true })} />
               {errors.password && <span>Ce champ est requis.</span>}
            </label>
            <label htmlFor="confirmPassword">Confirmer le mot de passe
               <input type="password" {...register("confirmPassword", { required: true })} />
               {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </label>
            {/* Vérification du mdp + confirmation */}
            {password && confirmPassword && password !== confirmPassword && (
               <span>Les mots de passe ne correspondent pas.</span>
            )}

            <button type="submit">Créer mon compte</button>
            <div className="switch-login">
               <p>Vous avez déjà un compte ?</p>
               <Link to="/login" className="login-button">Connectez-vous</Link>
            </div>
         </form>
      </>
   );
};

export default Register;