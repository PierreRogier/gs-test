import { GeoPoint } from "firebase/firestore";

export interface Product {
	name: string;
	alias: string;
	location: GeoPoint;
}

export interface ProductWithId extends Product {
	id: string;
	type: "product";
	distance: number;
}
