import "../styles/register-form.scss";
import { ApolloError, useQuery } from "@apollo/client";
import {
  GET_CAR_BRANDS,
  GET_CAR_COLORS,
  GET_CAR_YEARS,
} from "../graphql/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";

const Register = () => {
  const [signUp] = useRegisterMutation();
  const navigate = useNavigate();
  const { data: brandsData } = useQuery(GET_CAR_BRANDS);
  const { data: colorsData } = useQuery(GET_CAR_COLORS);
  const { data: yearsData } = useQuery(GET_CAR_YEARS);
  // Date du jour convertie au format "YYYY-MM-DD"
  const today = new Date().toISOString().split("T")[0];

  type InputValues = {
    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: string;
    phone: string;
    carBrand: string;
    carColor: string;
    carYear: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputValues>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<InputValues> = (data) => {
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const birthdateForBackend = new Date(data.birthdate).toISOString();
    const dataForBackend = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: birthdateForBackend,
      gender: data.gender,
      phone: data.phone,
      brand: data.carBrand,
      color: data.carColor,
      year: Number(data.carYear),
    };

    console.log("data for backend", dataForBackend);

    signUp({
      variables: { data: dataForBackend },
      onCompleted: () => {
        toast.success(
          "Vous pouvez à présent confirmer votre adresse email et vous connecter."
        );
        navigate("/email-confirmation");
      },
      onError: (error: ApolloError) => {
        console.log("Error details:", error);
        const graphQLError = error.graphQLErrors[0];
        const code = graphQLError?.extensions?.code;

        if (code === "UNDER_AGE") {
          toast.error("Vous devez avoir au moins 18 ans pour vous inscrire.");
        } else if (code === "EMAIL_ALREADY_USED") {
          toast.error("Cette adresse email est déjà utilisée.");
        } else {
          toast.error("Une erreur est survenue lors de l'inscription.");
        }
      },
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-content">
        <h1>Formulaire d'inscription</h1>
        <div className="register-wrapper">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                placeholder="Doe"
                className={errors.lastname ? "error-border" : ""}
                {...register("lastname", { required: "Ce champ est requis." })}
              />
              {errors.lastname && (
                <span className="error">{errors.lastname.message}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                placeholder="John"
                className={errors.firstname ? "error-border" : ""}
                {...register("firstname", { required: "Ce champ est requis." })}
              />
              {errors.firstname && (
                <span className="error">{errors.firstname.message}</span>
              )}
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="birthdate">Date de naissance</label>
              <input
                type="date"
                max={today}
                className={errors.birthdate ? "error-border" : ""}
                {...register("birthdate", {
                  required: "Ce champ est requis.",
                  max: {
                    value: today,
                    message: "Vous ne pouvez pas choisir la date d'aujourd'hui. 😾",
                  },
                  validate: (value) => {
                    if (!value){
                      return true;
                    } else {
                      const birthDate = new Date(value);
                      const now = new Date(today);
                      const eighteenYearsAgo = new Date(
                        // Année en cours - 18
                        now.getFullYear() - 18,
                        now.getMonth(),
                        now.getDate()
                      );
  
                      const isOldEnough = birthDate <= eighteenYearsAgo;
                      if (!isOldEnough) {
                        return "Vous devez avoir au moins 18 ans pour vous inscrire.";
                      }
                      return true;
                    }
                  },
                  })
                }
              />
              {errors.birthdate && (
                <span className="error">{errors.birthdate.message}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="gender">Sexe</label>
              <select
                className={errors.gender ? "error-border" : ""}
                {...register("gender", { required: "Ce champ est requis." })}
              >
                <option value="">Sélectionner</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.gender && (
                <span className="error">{errors.gender.message}</span>
              )}
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className={errors.email ? "error-border" : ""}
                {...register("email", { required: "Ce champ est requis." })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                placeholder="0675896158"
                className={errors.phone ? "error-border" : ""}
                {...register("phone",
                  { required: "Ce champ est requis.",
                    pattern: {
                      value: /^0[67]\d{8}$/,
                      message: "Le numéro doit commencer par 06 ou 07 et contenir 10 chiffres.",
                    }
                  }
                )}
              />
              {errors.phone && (
                <span className="error">{errors.phone.message}</span>
              )}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                className={errors.password ? "error-border" : ""}
                {...register("password",
                  { required: "Ce champ est requis.",
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                      message: "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.",
                    }
                  }
                )}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                className={errors.confirmPassword ? "error-border" : ""}
                {...register("confirmPassword", {
                  required: "Ce champ est requis.",
                })}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </div>
          </div>

          {password && confirmPassword && password !== confirmPassword && (
            <span className="error">
              Les mots de passe ne correspondent pas.
            </span>
          )}
        </div>
        <h3>Conducteur ? Renseigne ta voiture !</h3>
        <div className="input-row car-infos-row">
          <div className="input-group ">
            <label htmlFor="carBrand">Marque de voiture</label>
            <select {...register("carBrand")}>
              <option value="">Sélectionner la marque</option>
              {brandsData?.getCarBrands.map((brand: string) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="carColor">Couleur de voiture</label>
            <select {...register("carColor")}>
              <option value="">Sélectionner la couleur</option>
              {colorsData?.getCarColors.map((color: string) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="carYear">Année de construction</label>
            <select
              {...register("carYear", {
                valueAsNumber: true,
              })}
            >
              <option value="">Sélectionner l'année</option>
              {yearsData?.getCarYears.map((year: number) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="checkbox-container">
          <label>
            <input type="checkbox" required />
            J’accepte les <a href="#">conditions générales</a> d'utilisation de
            GrumpyCar
          </label>
        </div>

        <div className="login">
          <Link to="/login">J'ai déjà un compte</Link>
        </div>

        <div className="submit-container">
          <button type="submit">
            <ChevronRight /> S'inscrire
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
