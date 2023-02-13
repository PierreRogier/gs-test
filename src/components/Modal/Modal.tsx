import React, { FC } from "react";
import styles from "./Modal.module.scss";
import { motion } from "framer-motion";

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			type: "spring",
			damping: 30,
			stiffness: 400,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
	isOpened: boolean;
}

const Modal: FC<ModalProps> = ({ children, onClose, isOpened }) => {
	
	return (
		<motion.div
			className={styles.wrapper}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className={styles.mask} onClick={onClose}>
				<motion.div
					className={styles.modalContainer}
					onClick={(e) => {
						e.stopPropagation();
					}}
					variants={dropIn}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					{children}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Modal;
