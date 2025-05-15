import { SubmitHandler, useForm } from "react-hook-form";
//import { useConfirmEmailMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../generated/graphql-types";
import "../styles/EmailConfirm.scss";

const EmailConfirmation = () => {
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
  const { code } = useParams();
  type Input = {
    code: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    confirmEmail({
      variables: { codeByUser: data.code },
      onCompleted: () => {
        toast.success(
          "Adresse mail confirmée ! Vous pouvez à présenter vous connecter."
        );
        navigate("/login");
      },
      onError: () => {
        toast.error("Erreur lors de la confirmation.");
      },
    });
  };
  return (
    <div className="email-confirm-wrapper">
      <form className="email-confirm-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Confirmation de votre email</h1>
        <p className="subtitle">Veuillez saisir le code reçu par email.</p>
        <input
          defaultValue={code}
          placeholder="Entrez votre code"
          {...register("code", { required: true })}
        />
        {errors.code && (
          <span className="error-message">Le code est obligatoire !</span>
        )}
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
};

export default EmailConfirmation;
