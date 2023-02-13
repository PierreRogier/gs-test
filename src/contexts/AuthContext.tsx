import { auth } from "@/firebase/firebase.config";
import { IUser } from "@/models";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
} from "firebase/auth";
import React, { createContext, FC, useState, useContext, useEffect } from "react";

interface IAuthContext {
	isLoggedIn: boolean;
	logIn: (email: string, password: string) => Promise<UserCredential>;
	logOut: () => void;
	user: IUser | null;
}

const AuthContext = createContext<IAuthContext>({
	isLoggedIn: false,
	logOut: () => {},
	logIn: (email: string, password: string) => new Promise<UserCredential>((res, rej) => {}),
	user: { email: "", uid: "" },
});

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = async () => {
		setUser(null);
		setIsLoggedIn(false);
		await signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userRes) => {
			if (userRes) {
				setUser({ email: userRes.email!, uid: userRes.uid });
				setIsLoggedIn(true);
				setIsLoading(false);
			} else {
				setUser(null);
				setIsLoggedIn(false);
				setIsLoading(false);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, logIn, logOut, user }}>
			{isLoading ? <p>loading...</p> : children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth doit être utilisé dans le AuthProvider");
	}
	return context;
}
