import { toast } from "react-toastify";
import {
  useLoginMutation,
  useGetUserInfoQuery,
} from "../generated/graphql-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, LockKeyholeOpen, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useModal } from "../contexts/ModalContext";

type Inputs = {
  login: string;
  password: string;
};

const LoginModal = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { refetch } = useGetUserInfoQuery();

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    redirectAfterLogin,
    setRedirectAfterLogin,
  } = useModal();

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setRedirectAfterLogin(null); // reset pour éviter des effets de bord
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        await refetch();
        setIsLoginModalOpen(false);
        toast.success("Ravi de vous revoir !");
        navigate(redirectAfterLogin || "/", { replace: true }); //redirige vers la page souhaitée avant connexion
        setRedirectAfterLogin(null);
      },
      onError: (error: any) => {
        toast.error("Erreur lors de la connexion. Vérifiez vos identifiants.");
        console.error("Login error:", error);
      },
    });
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div
        className="modalContent"
        onClick={(e) => e.stopPropagation()} // Empêche fermeture si clic dans la modal
      >
        <div
          className="close-btn"
          title="Fermer la fenêtre de connexion"
          role="button"
          aria-label="Fermer la fenêtre de connexion"
          tabIndex={0}
          onKeyDown={(e) => {
            if (["Enter", " ", "Escape"].includes(e.key)) closeModal();
          }}
          onClick={closeModal}
        >
          <X size={50} />
        </div>

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
              <LockKeyholeOpen
                size={18}
                className="password-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && <span>Ce champ est requis.</span>}
          </div>

          <div className="links">
            <Link
              to="/forgotten-password"
              className="login-button"
              title="Réinitialiser votre mot de passe"
            >
              Mot de passe oublié ?
            </Link>
            <Link
              to="/register"
              className="login-button"
              title="Créer un compte"
            >
              S'inscrire
            </Link>
          </div>

          <div className="submit-container">
            <button type="submit" title="Connexion à votre compte">
              <ChevronRight size={30} /> Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
