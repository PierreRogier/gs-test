import { FarmWithId, ProductWithId } from "@/models";
import React, { FC } from "react";
import { motion, useDragControls } from "framer-motion";
import styles from "./ProductsAndFarmsList.module.scss";
import { Product } from "./Product/Product";
import { Farm } from "./Farm/Farm";

interface ProductAndFarmsListProps {
	farms: FarmWithId[];
	products: ProductWithId[];
}

const ProductAndFarmsList: FC<ProductAndFarmsListProps> = ({ farms, products }) => {
	const controls = useDragControls();
	const myArr = [...farms, ...products];
	const sortedArr = myArr.sort((a, b) => a.distance - b.distance);

	return (
		<div className={styles.wrapper}>
			<div className={styles.contentContainer}>
				<div className={styles.listContainer}>
					{sortedArr.map((el) => {
						return el.type === "product" ? (
							<Product product={el} key={el.id} />
						) : (
							<Farm farm={el} key={el.id} />
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ProductAndFarmsList;
