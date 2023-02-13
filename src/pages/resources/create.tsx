import { FarmForm, ProductForm, ProtectedRoute } from "@/components";
import React, { FC, useEffect, useState } from "react";
import L from "leaflet";
import styles from "@/styles/views/Resources/CreateResource.module.scss";
import dynamic from "next/dynamic";
import { distanceBetweenTwoPoints } from "@/utils";
import { center, radiusSize } from "@/common";

const CreateMap = dynamic(() => import("@/components/CreateMap/CreateMap"), { ssr: false });

interface CreateResourceProps {}

const CreateResource: FC<CreateResourceProps> = () => {
	const [isFarmForm, setIsFarmForm] = useState(true);
	const [position, setPosition] = useState<L.LatLngTuple | undefined>(undefined);
	const [isValidCoordinates, setIsValidCoordinates] = useState(false);

	const resetPosition = () => {
		setPosition(undefined);
	};

	useEffect(() => {
		if (!!position) {
			const distance = distanceBetweenTwoPoints(center, position);
			const isValidCoordinates = distance <= radiusSize;
			setIsValidCoordinates(isValidCoordinates);
		}
	}, [position]);

	return (
		<ProtectedRoute>
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<h1></h1>
					<div>
						<select
							className="select"
							onChange={(e) => {
								if (e.target.value === "ferme") {
									setIsFarmForm(true);
								} else {
									setIsFarmForm(false);
								}
								setPosition(undefined);
							}}
						>
							<option value={"ferme"}>ferme</option>
							<option value={"product"}>produit</option>
						</select>
					</div>
				</header>
				<div className={styles.contentContainer}>
					<div className={styles.mapContainer}>
						<CreateMap
							position={position}
							setPosition={setPosition}
							isFarmForm={isFarmForm}
						/>
					</div>
					<div className={styles.formContainer}>
						{isFarmForm ? (
							<FarmForm
								position={position}
								isValidCoordinates={isValidCoordinates}
								resetPosition={resetPosition}
							/>
						) : (
							<ProductForm
								position={position}
								isValidCoordinates={isValidCoordinates}
								resetPosition={resetPosition}
							/>
						)}
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default CreateResource;
