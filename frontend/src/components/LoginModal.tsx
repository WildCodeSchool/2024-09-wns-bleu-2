// import "../styles/login.scss";
import { toast } from "react-toastify";
import { useLoginMutation } from "../generated/graphql-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "../generated/graphql-types";
import { ChevronRight, LockKeyholeOpen, X } from "lucide-react";
import { useState } from "react";

type Props = {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({ setIsLoginModalOpen }: Props) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { refetch } = useGetUserInfoQuery();

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  type Inputs = {
    login: string;
    password: string;
  };

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
          password: data.password,
        },
      },
      onCompleted: async () => {
        console.log("Login response:", Response);
        await refetch(); // 👈 Important
        setIsLoginModalOpen(false);
        toast.success("Ravi de vous revoir !");
        navigate("/");
      },
      onError: (error: any) => {
        toast.error("Erreur lors de la connexion. Vérifiez vos identifiants.");
        console.log("error", error);
      },
    });
  };

  return (
    <div className="modal">
      <div className="close-btn">
        <X onClick={closeModal} size={50} />
      </div>
      <div className="modalContent">
        <h1>Se connecter</h1>
        <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label htmlFor="login">
              Adresse email
              <input
                className="text-field"
                type="email"
                placeholder="monemail@gmail.com"
                {...register("login", { required: true })}
              />
              {errors.login && <span>Ce champ est requis.</span>}
            </label>
          </div>

          <div className="input-container">
            <label htmlFor="password">Votre mot de passe</label>
            <div className="show-password">
              <input
                className="text-field pwd"
                type={showPassword ? "text" : "password"}
                
                {...register("password", { required: true })}
              />
              <LockKeyholeOpen size={18} className="password-icon" onClick={() => setShowPassword(!showPassword)} />
              </div>
              {errors.password && <span>Ce champ est requis.</span>}
            
          </div>
          <div className="links">
            <Link to="/forgotten-password" className="login-button">
              Mot de passe oublié ?
            </Link>
            <Link to="/register" className="login-button">
              S'inscrire
            </Link>
          </div>

          <div className="submit-container">
            <button type="submit">
              <ChevronRight size={30} /> Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
