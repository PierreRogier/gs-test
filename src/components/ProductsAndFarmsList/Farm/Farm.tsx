import { FarmWithId } from "@/models";
import React, { FC } from "react";
import styles from "./Farm.module.scss";

interface FarmProps {
	farm: FarmWithId;
}

export const Farm: FC<FarmProps> = ({ farm }) => {
	return (
		<div className={`${styles.farm} ${styles.item}`} >
			<span>
				<span className="bold">ferme: </span>
				{farm.name}
			</span>
			<span>
				<span className="bold">nom: </span>
				{farm.contact.nom}
			</span>
			<span>
				<span className="bold">prenom: </span>
				{farm.contact.prenom}
			</span>
			<span>
				<span className="bold">email: </span>
				{farm.contact.email}
			</span>
			<span>
				<span className="bold">tel: </span>
				{farm.contact.tel}
			</span>
			<span>
				<span className="bold">lat: </span>
				{farm.location.latitude.toFixed(3)}
			</span>
			<span>
				<span className="bold">lng: </span>
				{farm.location.longitude.toFixed(3)}
			</span>
			<span>
				<span className="bold">dist: </span>
				{Math.floor(farm.distance)}m
			</span>
		</div>
	);
};
