import { toast } from "react-toastify";
import {
  useLoginMutation,
  useGetUserInfoQuery,
} from "../generated/graphql-types";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../graphql/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, LockKeyholeOpen, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useModal } from "../contexts/ModalContext";

type Inputs = {
  login: string;
  password?: string;
};

const LoginModal = () => {
  const [loginMutation] = useLoginMutation();
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");

  const { refetch } = useGetUserInfoQuery();

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    redirectAfterLogin,
    setRedirectAfterLogin,
  } = useModal();

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setRedirectAfterLogin(null);
    setMode("login");
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
    reset,
  } = useForm<Inputs>();

  const onSubmitLogin: SubmitHandler<Inputs> = (data) => {
    loginMutation({
      variables: {
        data: {
          email: data.login,
          password: data.password || "",
        },
      },
      onCompleted: async () => {
        await refetch();
        setIsLoginModalOpen(false);
        toast.success("Ravi de vous revoir !");
        navigate(redirectAfterLogin || "/", { replace: true });
        setRedirectAfterLogin(null);
        reset();
      },
      onError: () => {
        toast.error("Erreur lors de la connexion. Vérifiez vos identifiants.");
      },
    });
  };

  const onSubmitForgot: SubmitHandler<Inputs> = (data) => {
    forgotPassword({
      variables: { email: data.login },
      onCompleted: () => {
        toast.success(
          "Un email de réinitialisation vous a été envoyé si l'adresse existe."
        );
        setMode("login");
        reset();
      },
      onError: () => {
        toast.error("Erreur lors de la demande de réinitialisation.");
      },
    });
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div
          className="close-btn"
          title="Fermer la fenêtre"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (["Enter", " ", "Escape"].includes(e.key)) closeModal();
          }}
          onClick={closeModal}
        >
          <X size={50} />
        </div>

        {mode === "login" && (
          <>
            <h1>Se connecter</h1>
            <form
              className="form login-form"
              onSubmit={handleSubmit(onSubmitLogin)}
            >
              <div className="input-container">
                <label htmlFor="login">
                  Adresse email
                  <input
                    id="login"
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
                    id="password"
                    className="text-field pwd"
                    type={showPassword ? "text" : "password"}
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
                <button
                  type="button"
                  className="mdp-button"
                  onClick={() => setMode("forgot")}
                >
                  Mot de passe oublié ?
                </button>
                <Link to="/register" className="login-button">
                  S'inscrire
                </Link>
              </div>

              <div className="submit-container">
                <button type="submit" className="submit-button">
                  <ChevronRight size={30} /> Connexion
                </button>
              </div>
            </form>
          </>
        )}

        {mode === "forgot" && (
          <>
            <h1>Réinitialiser le mot de passe</h1>
            <form
              className="form login-form"
              onSubmit={handleSubmit(onSubmitForgot)}
            >
              <div className="input-container">
                <label htmlFor="login">
                  Adresse email
                  <input
                    id="login"
                    className="text-field"
                    type="email"
                    placeholder="monemail@gmail.com"
                    {...register("login", { required: true })}
                  />
                  {errors.login && <span>Ce champ est requis.</span>}
                </label>
              </div>

              <div className="submit-container">
                <button type="submit" className="submit-button">
                  <ChevronRight size={30} /> Envoyer le lien
                </button>
              </div>

              <div className="links">
                <button
                  type="button"
                  className="retour-button"
                  onClick={() => setMode("login")}
                >
                  Retour
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
