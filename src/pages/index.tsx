import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { Modal, LoginForm, AnimatedLogo, RedirectRoute } from "@/components";
import styles from "@/styles/views/Home.module.scss";
import Image from "next/image";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleRedirect = () => {
		handleCloseModal();
		setIsSuccess(true);
	};

	return (
		<RedirectRoute>
			<div className={styles.wrapper}>
				<div className={styles.wrapperContent}>
					<div className={styles.imgContainer}>
						<Image
							src="/images/farm.svg"
							alt="une ferme avec un tracteur"
							fill
							priority
						/>
					</div>
					<div className={styles.contentContainer}>
						<h1>Greenshield</h1>
						<p>
							Nous sommes tous conscients du besoin d’évoluer vers des pratiques plus
							durables. Cependant, face aux impératifs de rendement, à la difficulté
							dadopter des prat&apos;iques alternatives, ou à l’incertitude apportée par le
							changement climatique, il peut être difficile de franchir le cap.
							Comment peut-on faire évoluer les pratiques quand cela comporte autant
							de risques ?
						</p>
						<p>
							C’est pour cela que nous avons rassemblé une équipe d’experts en
							agronomie, en mathématiques et en intelligence artificielle autour d’un
							objectif : permettre d’adopter des pratiques plus durables tout en
							maîtrisant les risques sanitaires.
						</p>
						<button className="btn btn-lg btn-secondary" onClick={handleOpenModal}>
							se connecter
						</button>
					</div>
				</div>

				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => {
						if (isSuccess) {
							setTimeout(() => {
								router.push("/resources");
							}, 2000);
						}
						return null;
					}}
				>
					{isModalOpen && (
						<Modal onClose={handleCloseModal} isOpened={isModalOpen}>
							<aside className={styles.modalContainer}>
								<div className={styles.logoContainer}>
									<AnimatedLogo />
								</div>
								<LoginForm handleRedirect={handleRedirect} />
								<button onClick={handleCloseModal} className={styles.closeBtn}>
									x
								</button>
							</aside>
						</Modal>
					)}
				</AnimatePresence>
			</div>
		</RedirectRoute>
	);
}
