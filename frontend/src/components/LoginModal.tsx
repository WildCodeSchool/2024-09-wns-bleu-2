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
      <div className="close-btn" title="Fermer la fenêtre de connexion" aria-label="Fermer la fenêtre de connexion" role="button" tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") closeModal();
      }}
      onClick={closeModal}
      >
        <X size={50} />
      </div>
      <div className="modalContent">
        <h1>Se connecter</h1>
        <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label htmlFor="login">
              Adresse email
              <input
                id="login"
                className="text-field"
                type="email"
                title="Entrer une adresse email valide"
                aria-required="true"
                aria-invalid={errors.login ? "true" : "false"}
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
                id="password"
                className="text-field pwd"
                type={showPassword ? "text" : "password"}
                title="Entrer votre mot de passe"
                aria-required="true"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", { required: true })}
              />
              <LockKeyholeOpen size={18} className="password-icon" onClick={() => setShowPassword(!showPassword)} />
              </div>
              {errors.password && <span>Ce champ est requis.</span>}
            
          </div>
          <div className="links">
            <Link to="/forgotten-password" className="login-button" title="Réinitialiser votre mot de pase">
              Mot de passe oublié ?
            </Link>
            <Link to="/register" className="login-button" title="Créer un compte">
              S'inscrire
            </Link>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit-button" title="Connexion à votre compte">
              <ChevronRight size={30} /> Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
