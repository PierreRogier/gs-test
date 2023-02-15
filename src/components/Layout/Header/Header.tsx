import { useAuth } from "@/contexts";
import { IUser } from "@/models";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import styles from "./Header.module.scss";

const SIDEBAR_LINKS = [
	{ path: "/resources", name: "ressources" },
	{ path: "/resources/create", name: "création" },
];

interface HeaderProps {
	user: IUser | null;
	isLoggedIn: boolean;
	logOut: () => void;
}

const Header: FC<HeaderProps> = ({ isLoggedIn, logOut, user }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	const handleLogout = () => {
		logOut();
		router.push("/");
	};
	return (
		<header className={styles.wrapper}>
			<h3>Greenshield</h3>
			{isLoggedIn && (
				<>
					<div className={styles.infos}>
						<p>{user?.email}</p>
						<button className="btn btn-sm btn-secondary" onClick={handleLogout}>
							logout
						</button>
					</div>
					<div className={styles.phoneMenu}>
						<button
							className="btn btn-sm btn-secondary"
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							menu
						</button>
					</div>
				</>
			)}
			{isLoggedIn && (
				<div className={`${styles.menu} ${isMenuOpen && styles.menuOpen}`}>
					<header>
						<button
							className="btn btn-sm btn-secondary"
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							X
						</button>
					</header>
					<div className={`${styles.menuInfos}`}>
						<p>{user?.email}</p>
						<button className="btn btn-sm btn-secondary" onClick={handleLogout}>
							logout
						</button>
					</div>
					<nav>
						{SIDEBAR_LINKS.map((l) => {
							return (
								<button
									className={styles.link}
									key={l.name}
									onClick={() => {
										setIsMenuOpen(false);
										router.push(l.path);
									}}
								>
									{l.name}
								</button>
							);
						})}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
