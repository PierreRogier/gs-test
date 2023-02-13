import React, { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import L from "leaflet";
import { FirebaseError } from "firebase/app";
import styles from "./ProductForm.module.scss";
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

const schema = yup
	.object({
		name: yup.string().max(60, "60 caractères maximum").required("ce champs est requis"),
		lat: yup.number().required("ce champs est requis"),
		lng: yup.number().required("ce champs est requis"),
		alias: yup.string(),
	})
	.required();

type FormInputs = yup.InferType<typeof schema>;

interface ProductFormProps {
	position: L.LatLngTuple | undefined;
	isValidCoordinates: boolean;
}

const ProductForm: FC<ProductFormProps> = ({ position, isValidCoordinates }) => {
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
			const productDocRef = await addDoc(collection(db, "products"), {
				name: data.name,
				alias: data.alias,
				location: new GeoPoint(data.lat, data.lng),
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
		if (!!position) {
			setValue("lat", position[0]);
			setValue("lng", position[1]);
		}
	}, [position, setValue]);

	return (
		<div className={styles.wrapper}>
			<h2>Ajout d'un produit</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGroup}>
					<h3>Produit</h3>
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
						<label htmlFor="name">nom</label>
						<input
							className="input w-full"
							{...register("name")}
							type="string"
							name="name"
							id="name"
						/>
						<p className={styles.errorMessage}>{errors.name?.message}</p>
					</div>
					<div className={styles.formControl}>
						<label htmlFor="alias">alias</label>
						<input
							className="input w-full"
							{...register("alias")}
							type="string"
							name="alias"
							id="alias"
						/>
						<p className={styles.errorMessage}>{errors.name?.message}</p>
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

export default ProductForm;
