import { useAuth } from "@/contexts";
import React, { FC } from "react";
import Header from "./Header/Header";
import styles from "./Layout.module.scss";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	const { isLoggedIn, logOut, user } = useAuth();

	return (
		<div className={styles.wrapper}>
			<Header isLoggedIn={isLoggedIn} logOut={logOut} user={user} />
			<div className={styles.contentWrapper}>
				{isLoggedIn && <Sidebar />}
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
