import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

interface AuthProps {
	children: ReactNode;
}

const AuthContext = createContext({
	user: null as User | null,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
	const auth = getAuth(app);
	const [currentUser, setCurentUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurentUser(user);
			} else {
				setCurentUser(user);
			}
		});
	}, [auth]);

	return <AuthContext.Provider value={{ user: currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
