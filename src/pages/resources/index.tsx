import dynamic from "next/dynamic";
import React, { FC, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Modal, ProtectedRoute } from "@/components";
import styles from "@/styles/views/Resources/Resources.module.scss";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { FarmWithId, ProductWithId } from "@/models";
import { distanceBetweenTwoPoints } from "@/utils";
import { center } from "@/common";
import ProductAndFarmsList from "@/components/ProductsAndFarmsList/ProductAndFarmsList";

const MapList = dynamic(() => import("@/components/MapList/MapList"), { ssr: false });

interface ResourcesProps {}

const Resources: FC<ResourcesProps> = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [farms, setFarms] = useState<FarmWithId[]>([]);
	const [products, setProducts] = useState<ProductWithId[]>([]);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const unsubscribe2 = onSnapshot(collection(db, "products"), (docs) => {
			const products = docs.docs.map((doc) => {
				const distance = distanceBetweenTwoPoints(center, [
					doc.data().location.latitude,
					doc.data().location.longitude,
				]);
				return { id: doc.id, ...doc.data(), distance, type: "product" } as ProductWithId;
			});
			setProducts(products);
		});
		const unsubscribe = onSnapshot(collection(db, "farms"), (docs) => {
			const farms = docs.docs.map((doc) => {
				const distance = distanceBetweenTwoPoints(center, [
					doc.data().location.latitude,
					doc.data().location.longitude,
				]);
				return { id: doc.id, ...doc.data(), type: "farm", distance } as FarmWithId;
			});
			setFarms(farms);
		});

		return () => {
			unsubscribe();
			unsubscribe2();
		};
	}, []);

	// if (isLoading) return <p>Loading...</p>;

	return (
		<ProtectedRoute>
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<h1>Liste des ressources</h1>
					<button onClick={handleOpenModal} className="btn btn-md btn-secondary">
						carte
					</button>
				</header>
				<ProductAndFarmsList farms={farms} products={products} />
				<AnimatePresence>
					{isModalOpen && (
						<Modal onClose={handleCloseModal} isOpened={isModalOpen}>
							<div className={styles.modalContainer}>
								<h2>Carte des ressources</h2>
								<div className={styles.mapContainer}>
									<MapList farms={farms} products={products} />
								</div>
							</div>
						</Modal>
					)}
				</AnimatePresence>
			</div>
		</ProtectedRoute>
	);
};

export default Resources;
