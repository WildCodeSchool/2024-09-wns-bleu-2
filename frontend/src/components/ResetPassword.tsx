import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../graphql/mutations";
import { ChevronRight } from "lucide-react";
import "../styles/emailConfirm.scss";

type Inputs = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    resetPassword({
      variables: { token, newPassword: data.newPassword },
      onCompleted: () => {
        toast.success("Mot de passe réinitialisé avec succès !");
        navigate("/");
      },
      onError: () => {
        toast.error("Le lien est invalide ou a expiré.");
      },
    });
  };

  return (
    <div className="email-confirm-wrapper">
      <form className="email-confirm-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Réinitialiser le mot de passe</h1>
        <p className="subtitle">Veuillez saisir votre nouveau mot de passe.</p>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          {...register("newPassword", { required: true })}
        />
        {errors.newPassword && (
          <span className="error-message">Ce champ est requis.</span>
        )}
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <span className="error-message">Ce champ est requis.</span>
        )}
        <button type="submit" className="submit-button">
          <ChevronRight /> Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
