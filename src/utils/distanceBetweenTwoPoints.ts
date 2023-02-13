import L from "leaflet";

export const distanceBetweenTwoPoints = (point1: L.LatLngTuple, point2: L.LatLngTuple): number => {
	const radianLat1 = toRadians(point1[0]);
	const radianLong1 = toRadians(point1[1]);
	const radianLat2 = toRadians(point2[0]);
	const radianLong2 = toRadians(point2[1]);

	const earthRadius = 6371e3;
	const deltaLat = radianLat2 - radianLat1;
	const deltaLong = radianLong2 - radianLong1;
	const a =
		Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(radianLat1) *
			Math.cos(radianLat2) *
			Math.sin(deltaLong / 2) *
			Math.sin(deltaLong / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadius * c;
	return distance;
};

function toRadians(degree: number): number {
	return (degree * Math.PI) / 180;
}
