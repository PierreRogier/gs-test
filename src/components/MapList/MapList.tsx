import "leaflet/dist/leaflet.css";
import React, { FC } from "react";
import {
	Circle,
	LayerGroup,
	LayersControl,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { FarmWithId, ProductWithId } from "@/models";

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

interface MapListProps {
	farms: FarmWithId[];
	products: ProductWithId[];
}

const MapList: FC<MapListProps> = ({ farms, products }) => {
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
			<Circle center={center} pathOptions={{ fillColor: "transparent" }} radius={2300} />
			<Circle center={center} pathOptions={{ fillColor: "red" }} radius={1} />
			<LayersControl position="topright">
				{!!farms.length && (
					<LayersControl.Overlay checked name="fermes">
						<LayerGroup>
							{farms.map((farm) => {
								const { contact, id, name, location } = farm;
								return (
									<Marker
										key={id}
										position={[location.latitude, location.longitude]}
										icon={farmIcon}
									>
										<Popup>
											<p>{name}</p>
											<p>
												{contact.prenom} {contact.nom}
											</p>
											<p>{contact.email}</p>
											<p>{contact.tel}</p>
										</Popup>
									</Marker>
								);
							})}
						</LayerGroup>
					</LayersControl.Overlay>
				)}
				{!!products.length && (
					<LayersControl.Overlay checked name="produits">
						<LayerGroup>
							{products.map((product) => {
								const { alias, id, name, location } = product;
								return (
									<Marker
										key={id}
										position={[location.latitude, location.longitude]}
										icon={productIcon}
									>
										<Popup>
											<p>{name}</p>
											<p>{alias}</p>
										</Popup>
									</Marker>
								);
							})}
						</LayerGroup>
					</LayersControl.Overlay>
				)}
			</LayersControl>
		</MapContainer>
	);
};

export default MapList;
