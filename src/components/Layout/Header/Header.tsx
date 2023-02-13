import { useAuth } from "@/contexts";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
	const { isLoggedIn, logOut, user } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logOut();
		router.push("/");
	};
	return (
		<header className={styles.wrapper}>
			<h3>Greenshield</h3>
			{isLoggedIn && (
				<div className={styles.infos}>
					<p>{user?.email}</p>
					<button className="btn btn-sm btn-secondary" onClick={handleLogout}>logout</button>
				</div>
			)}
		</header>
	);
};

export default Header;
