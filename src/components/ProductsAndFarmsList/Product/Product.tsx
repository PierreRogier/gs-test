import { db } from "@/firebase/firebase.config";
import { ProductWithId } from "@/models";
import { collection, doc, updateDoc } from "firebase/firestore";
import React, { FC, useState } from "react";
import styles from "./Product.module.scss";

interface ProductProps {
	product: ProductWithId;
}

export const Product: FC<ProductProps> = ({ product }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [textInput, setTextInput] = useState(product.alias);

	const handleSubmit = async () => {
		if (textInput === product.alias) return;
		const res = await updateDoc(doc(db, "products", product.id), {
			alias: textInput,
		});
		console.log(res);
		setIsUpdating(false);
	};
	return (
		<div className={`${styles.product} ${styles.item}`}>
			<span>
				<span className="bold">produit: </span>
				{product.name}
			</span>
			{!isUpdating && (
				<span>
					<span className="bold">alias: </span>
					{product.alias ? product.alias : "ø"}
				</span>
			)}
			{isUpdating && (
				<div className={styles.formControl}>
					<input
						className="input"
						type="text"
						value={textInput}
						onChange={(e) => setTextInput(e.target.value)}
					/>
					<button className="btn btn-sm btn-primary" onClick={handleSubmit}>
						valider
					</button>
					<button className="btn btn-sm btn-secondary" onClick={() => setIsUpdating(false)}>
						x
					</button>
				</div>
			)}
			<span>
				<span className="bold">lat: </span>
				{product.location.latitude.toFixed(3)}
			</span>
			<span>
				<span className="bold">lng: </span>
				{product.location.longitude.toFixed(3)}
			</span>
			<span>
				<span className="bold">dist: </span>
				{Math.floor(product.distance)}m
			</span>
			{!isUpdating && (
				<button className="btn btn-sm btn-secondary" onClick={() => setIsUpdating(true)}>
					edit
				</button>
			)}
		</div>
	);
};
