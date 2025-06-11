import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useConfirmEmailMutation } from "../generated/graphql-types";
import "../styles/emailConfirm.scss";
import { ApolloError } from "@apollo/client";

const EmailConfirmation = () => {
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
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
        // TODO : utilisation de React Context pour afficher la modale
        toast.success(
          "Adresse mail confirmée ! Vous pouvez à présenter vous connecter."
        );
        navigate("/");
      },
      onError: (error: ApolloError) => {
        const graphQLError = error.graphQLErrors[0];
        
        const code = graphQLError?.extensions?.code;
        if (code === "CODE_EXPIRED") {
          toast.error("Le code a expiré. Veuillez en demander un nouveau.");
        } else {
          toast.error("Une erreur s'est produite.");
        }
      },
    });
  };
  return (
    <div className="email-confirm-wrapper">
      <form className="email-confirm-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Confirmation de votre email</h1>
        <p className="subtitle">Veuillez saisir le code reçu par email.</p>
        <input
          placeholder="854921"
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
