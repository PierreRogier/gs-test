import { GeoPoint } from "firebase/firestore";

export interface Farm {
	name: string;
	location: GeoPoint;
	contact: FarmContact;
}

export interface FarmWithId extends Farm {
	id: string;
	type: "farm";
	distance: number;
}

export interface FarmContact {
	nom: string;
	prenom: string;
	tel: string;
	email: string;
}
