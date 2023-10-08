import { Router } from "./Router";
import firebase, { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";
import ThemeContext from "context/ThemeContext";

const App = () => {
	const context = useContext(ThemeContext);
	const auth = getAuth(app);
	// auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
	const [init, setInit] = useState<boolean>(false);
	// auth의 currentUser가 있으면 authenticated로 변경
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
			setInit(true);
		});
	}, [auth]);

	console.log(auth);

	return (
		<div className={context.theme === "light" ? "white" : "dark"}>
			<ToastContainer />
			{init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
		</div>
	);
};

export default App;
