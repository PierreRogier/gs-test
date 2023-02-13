import { useAuth } from "@/contexts";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./LoginForm.module.scss";
import { FirebaseError } from "firebase/app";
import { FIREBASE_ERRORS_CODE } from "@/firebase/firebase-errors";

const schema = yup
	.object({
		email: yup
			.string()
			.email("email non valide")
			.max(60, "60 caractères maximum")
			.required("ce champs est requis"),
		password: yup
			.string()
			.min(6, "6 caractères minimum")
			.max(20, "20 caractères maximum")
			.required("ce champs est requis"),
	})
	.required();

type FormInputs = yup.InferType<typeof schema>;

interface LoginFormProps {
	handleRedirect: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleRedirect }) => {
	const [serverError, setServerError] = useState("");
	const { logIn } = useAuth();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		if (!isValid) return;
		try {
			const res = await logIn(data.email, data.password);
			handleRedirect();
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.message === FIREBASE_ERRORS_CODE.TOO_MUCH_ATTEMPTS) {
					setServerError("accès refusé, trop de tentatives...");
				} else {
					setServerError("mauvaise combinaison entre l'email et le mot de passe");
				}
			} else {
				setServerError("une erreur est survenue");
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<h2>Se Connecter</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formControl}>
					<label htmlFor="email">email</label>
					<input
						className="input w-full"
						{...register("email")}
						type="email"
						name="email"
						id="email"
					/>
					<p className={styles.errorMessage}>{errors.email?.message}</p>
				</div>
				<div className={styles.formControl}>
					<label htmlFor="password">mot de passe</label>
					<input
						className="input w-full"
						{...register("password")}
						type="password"
						name="password"
						id="password"
					/>
					<p className={styles.errorMessage}>{errors.password?.message}</p>
				</div>
				{!!serverError && <p className={styles.errorMessage}>{serverError}</p>}
				<button
					disabled={!isValid || isSubmitting}
					type="submit"
					className="btn btn-lg btn-primary w-full"
				>
					valider
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
