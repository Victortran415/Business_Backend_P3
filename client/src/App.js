import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Loginpage";
import Signup from "./Pages/Signup";
import Mmain from "./Pages/Mmain";
import Emain from "./Pages/Emain";
import mSchedule from "./Pages/Mschedule";
import Profile from "./Pages/Profilepage";
import empPage from "./Pages/Emppage";
import MAnnoucements from "./Pages/Mannouncements";
import UserContext from "./Context/UserContext";
import Eannouncements from "./Pages/Eannouncements";
import Confirm from "./Pages/Confirm";
import ConfirmUser from "./Pages/ConfirmUser";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./Component/UseDarkMode";
import { GlobalStyles } from "./Component/GlobalStyle";
import { lightTheme, darkTheme } from "./Component/Themes";
import Toggle from "./Component/Toggler";

function App() {
	const [userData, setUserData] = useState({
		user: undefined,
		token: undefined,
	});

	const [theme, themeToggler, mountedComponent] = useDarkMode();

	const themeMode = theme === "light" ? lightTheme : darkTheme;

	const checkLoggedIn = async () => {
		let token = localStorage.getItem("auth-token");

		if (token === null) {
			localStorage.setItem("auth-token", "");
			token = "";
		} else {
			const userRes = await axios.get("/users", {
				headers: { "x-auth-token": token },
			});

			setUserData({
				token,
				user: userRes.data,
			});
		}
	};

	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		});

		localStorage.setItem("auth-token", "");
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	if (!mountedComponent) return <div />;

	return (
		<ThemeProvider theme={themeMode}>
			<>
				<GlobalStyles />
				<div className="App">
					<Toggle theme={theme} toggleTheme={themeToggler} />
					<BrowserRouter>
						<UserContext.Provider value={{ userData, setUserData }}>
							<Switch>
								<Route path="/login" component={Login} />
								<Route path="/signup" component={Signup} />
								<Route path="/Mmain" component={Mmain} />
								<Route path="/Emain" component={Emain} />
								<Route path="/Mschedule" component={mSchedule} />
								<Route path="/Profilepage" component={Profile} />
								<Route path="/Emppage" component={empPage} />
								<Route path="/Eannouncements" component={Eannouncements} />
								<Route path="/Mannouncements" component={MAnnoucements} />
								<Route path="/confirm" component={Confirm} />
								<Route path="/confirm_token/:token" component={ConfirmUser} />
								<Route path="/" component={Login} />
							</Switch>
						</UserContext.Provider>
					</BrowserRouter>
				</div>
			</>
		</ThemeProvider>
	);
}

export default App;
