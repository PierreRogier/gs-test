import React, { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import L from "leaflet";
import { FirebaseError } from "firebase/app";

const schema = yup
	.object({
		name: yup.string().max(60, "60 caractères maximum").required("ce champs est requis"),
		lat: yup.number().required("ce champs est requis"),
		lng: yup.number().required("ce champs est requis"),
		nom: yup.string().required("ce champs est requis"),
		prenom: yup.string().required("ce champs est requis"),
		tel: yup
			.string()
			.matches(new RegExp(/^\d{10}$/), "téléphone non valide")
			.required("ce champs est requis"),
		email: yup
			.string()
			.email("email non valide")
			.max(60, "60 caractères maximum")
			.required("ce champs est requis"),
	})
	.required();

type FormInputs = yup.InferType<typeof schema>;

import styles from "./FarmForm.module.scss";
import { db } from "@/firebase/firebase.config";
import { addDoc, collection, GeoPoint } from "firebase/firestore";

interface FarmFormProps {
	position: L.LatLngTuple | undefined;
	isValidCoordinates: boolean;
}

const FarmForm: FC<FarmFormProps> = ({ position, isValidCoordinates }) => {
	const [serverError, setServerError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid },
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		setIsLoading(true);
		setServerError("");
		if (!isValid) {
			setIsLoading(false);
			return;
		}
		if (!isValidCoordinates) {
			setServerError("coordonnées non valides");
			setIsLoading(false);
			return;
		}
		try {
			const farmDocRef = await addDoc(collection(db, "farms"), {
				name: data.name,
				location: new GeoPoint(data.lat, data.lng),
				contact: {
					nom: data.nom,
					prenom: data.prenom,
					email: data.email,
					tel: data.tel,
				},
			});
			setIsLoading(false);
			reset();
		} catch (error) {
			console.error(error);
			if (error instanceof FirebaseError) {
				setServerError(error.message);
			} else {
				setServerError("Oups, une erreur est survenue");
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (position) {
			setValue("lat", position[0]);
			setValue("lng", position[1]);
		}
	}, [position, setValue]);

	return (
		<div className={styles.wrapper}>
			<h2>Ajout d'une Ferme</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGroup}>
					<h3>Ferme</h3>

					<div className={styles.coordinates}>
						<div className={styles.formControl}>
							<label htmlFor="lat">latitude</label>
							<input
								className="input w-full"
								{...register("lat")}
								type="number"
								name="lat"
								id="lat"
								disabled
							/>
							<p className={styles.errorMessage}>{errors.lat?.message}</p>
						</div>
						<div className={styles.formControl}>
							<label htmlFor="lng">longitude</label>
							<input
								className="input w-full"
								{...register("lng")}
								type="number"
								name="lng"
								id="lng"
								disabled
							/>
							<p className={styles.errorMessage}>{errors.lng?.message}</p>
						</div>
					</div>
					<div className={styles.formControl}>
						<label htmlFor="name">Nom de la ferme</label>
						<input
							className="input w-full"
							{...register("name")}
							type="string"
							name="name"
							id="name"
						/>
						<p className={styles.errorMessage}>{errors.name?.message}</p>
					</div>
				</div>
				<div className={styles.formGroup}>
					<h3>Contact</h3>
					<div className={styles.formControl}>
						<label htmlFor="nom">nom</label>
						<input
							className="input w-full"
							{...register("nom")}
							type="string"
							name="nom"
							id="nom"
						/>
						<p className={styles.errorMessage}>{errors.nom?.message}</p>
					</div>
					<div className={styles.formControl}>
						<label htmlFor="prenom">prénom</label>
						<input
							className="input w-full"
							{...register("prenom")}
							type="string"
							name="prenom"
							id="prenom"
						/>
						<p className={styles.errorMessage}>{errors.prenom?.message}</p>
					</div>
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
						<label htmlFor="tel">téléphone</label>
						<input
							className="input w-full"
							{...register("tel")}
							type="string"
							name="tel"
							id="tel"
							placeholder="0102030405"
						/>
						<p className={styles.errorMessage}>{errors.tel?.message}</p>
					</div>
				</div>
				{!!serverError && <p className={`${styles.errorMessage} py-3`}>{serverError}</p>}
				<button
					disabled={isLoading || !isValid}
					type="submit"
					className="btn btn-lg btn-primary w-full"
				>
					ajouter
				</button>
			</form>
		</div>
	);
};

export default FarmForm;
