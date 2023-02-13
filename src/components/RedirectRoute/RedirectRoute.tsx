import { useAuth } from "@/contexts";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const RedirectRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const {user} = useAuth();

	useEffect(() => {
		if (user?.uid) {
			router.push("/resources");
		}
	}, [router, user]);
	
	return <>{user ? null : children}</>;
};

export default RedirectRoute;
