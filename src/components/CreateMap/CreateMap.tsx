import "leaflet/dist/leaflet.css";
import React, { FC } from "react";
import { Circle, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
// import { farmIcon, productIcon } from "@/common";

export const farmIcon = L.icon({
	iconUrl: `/icons/grange.png`,
	iconSize: [30, 30],
	iconAnchor: [15, 15],
});

export const productIcon = L.icon({
	iconUrl: `/icons/tractor.png`,
	iconSize: [30, 30],
	iconAnchor: [15, 15],
});

const center = [45.73257306794853, -0.3435314023816621] as L.LatLngTuple;

interface CreateMapProps {
	position: L.LatLngTuple | undefined;
	setPosition: React.Dispatch<React.SetStateAction<L.LatLngTuple | undefined>>;
	isFarmForm: boolean;
}

const CreateMap: FC<CreateMapProps> = ({ position, setPosition, isFarmForm }) => {
	return (
		<MapContainer
			center={center}
			zoom={13}
			scrollWheelZoom={true}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Circle
				center={center}
				pathOptions={{ fillColor: "transparent" }}
				radius={2300}
				eventHandlers={{
					click: (e) => {
						setPosition([e.latlng.lat, e.latlng.lng]);
					},
				}}
			/>
			{!!position && (
				<Marker
					position={position}
					icon={isFarmForm ? farmIcon : productIcon}
					eventHandlers={{
						dragend: (e) => {
							setPosition([e.target._latlng.lat, e.target._latlng.lng]);
						},
					}}
					draggable
				>
					<Popup>
						Tu es ici: <br />
						Lat: {position[0]} <br />
						Long: {position[1]}
					</Popup>
				</Marker>
			)}
		</MapContainer>
	);
};

export default CreateMap;
