import Link from "next/link";
import React, { FC } from "react";
import styles from "./Sidebar.module.scss";

const SIDEBAR_LINKS = [
	{ path: "/resources", name: "ressources" },
	{ path: "/resources/create", name: "création" },
];

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
	return (
		<aside className={`${styles.wrapper}`}>
			<nav className={`${styles.nav}`}>
				{SIDEBAR_LINKS.map((l) => {
					return (
						<Link className={styles.link} key={l.name} href={l.path}>
							{l.name}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
