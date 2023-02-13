import { useAuth } from "@/contexts";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const {user} = useAuth();

	useEffect(() => {
		if (!user?.uid) {
			router.push("/");
		}
	}, [router, user]);
	return <>{user ? children : null}</>;
};

export default ProtectedRoute;
