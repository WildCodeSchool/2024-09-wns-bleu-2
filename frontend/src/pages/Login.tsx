import { toast } from "react-toastify";
import { useLoginMutation  } from "../generated/graphql-types";
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
   const [login] = useLoginMutation();
   const navigate = useNavigate();
   type Inputs = {
      login: string
      password: string
   }
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      login({ 
         variables: {
            data: {
               email: data.login,
               password: data.password
            }
         },
         onCompleted: () => {
            toast.success("Ravi de vous revoir !");
            navigate("/");
         },
         onError: (error: any) => {
            console.log("error", error);
         },
      });
   }

   return (
      <>
         <h1>Connexion</h1>
            
         <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="login">Votre email
               <input className="text-field" type="email" placeholder="monemail@gmail.com" {...register("login", { required: true })} defaultValue="nono@gmail.com" />
               {errors.login && <span>Ce champ est requis.</span>}
            </label>

            <label htmlFor="password">Votre mot de passe
               <input className="text-field pwd" type="password" defaultValue="monmdp" {...register("password", { required: true })} />
               {errors.password && <span>Ce champ est requis.</span>}
            </label>
            <div className="forgotten-pwd">
               <Link to="/forgotten-password" className="login-button">Mot de passe oublié ?</Link>
            </div>

            <button className="button" type="submit">Connexion</button>
            
            <div className="switch-login">
               <p>Pas encore de compte ?</p>
               <Link to="/register" className="login-button">Inscrivez-vous</Link>
            </div>
         </form>
      </>
   );
};

export default Login;