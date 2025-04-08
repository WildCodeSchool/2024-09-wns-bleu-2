import { SubmitHandler, useForm } from "react-hook-form";
//import { useConfirmEmailMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../generated/graphql-types";

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
            toast.success("Adresse mail confirmée ! Vous pouvez à présenter vous connecter.");
            navigate("/login");
         },
         onError: () => {
            toast.error("Erreur lors de la confirmation.");
         },
      });
   };
   return (
      <form className="form confirmation-form" onSubmit={handleSubmit(onSubmit)}>
         <h1>Confirmez votre email</h1>
         <input
            defaultValue={code}
            placeholder="code"
            {...register("code", { required: true })}
         />
         {errors.code && <span>Le code est obligatoire !</span>}
         <button className="button" type="submit">Confirmer</button>
      </form>
   );
};

export default EmailConfirmation;