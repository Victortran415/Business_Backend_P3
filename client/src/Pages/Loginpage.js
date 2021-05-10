import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import pic2 from "../Img/toppic.png";
import showPwdImg from "../Img/show-password.svg";
import hidePwdImg from "../Img/hide-password.svg";

const Login = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	const [form, setForm] = useState({});
	const history = useHistory();

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submit = async (e) => {
		e.preventDefault();

		try {
			const loginRes = await Axios.post("/users/login", {
				email: form.email,
				password: form.password,
			});
			if (!loginRes.data.user.confirmed) {
				history.push("/confirm");
			} else {
				setUserData({
					token: loginRes.data.token,
					user: loginRes.data.user,
					role: loginRes.data.user.role,
				});
				localStorage.setItem("auth-token", loginRes.data.token);
				const userRole = loginRes.data.user.role;
				if (userRole === "Manager") {
					history.push("/Mmain");
				} else {
					if (userRole === "Employee") {
						history.push("/Emain");
					}
				}
			}
		} catch (err) {
			console.log("problem", err);
		}
	};

	useEffect(() => {
		if (userData.userData) history.push("/");
	}, [userData.user, history]);

	return (
		<div class="container03">
			<span className="top02">HUDDLE ROOM</span>
			<br></br>
			<span className="coname">An Employee Management Portal </span>
			<br></br>
			<img class="img01" src={pic2} alt="pic"></img>
			<br></br>
			Welcome! Please sign in or signup to view contents
			<br></br>
			<div class="formcont">
				<form id="form" onSubmit={submit}>
					{" "}
					<br></br>
					<label htmlFor="email">Email: </label>
					<input
						type="text"
						className="loginEmail"
						name="email"
						class="input"
						onChange={onChange}
					/>
					<br />
					<p></p>
					<label htmlFor="password">Password: </label>
					<input
						type={isRevealPwd ? "text" : "password"}
						name="password"
						className="loginPassword"
						input
						class="input"
						onChange={onChange}
					/>
					<img
						className="hideShowPw"
						title={isRevealPwd ? "Hide password" : "Show password"}
						src={isRevealPwd ? hidePwdImg : showPwdImg}
						onClick={() => setIsRevealPwd((prevState) => !prevState)}
					/>
					<input class="btn02" type="submit" value="Login" />
				</form>
			</div>
			<br></br>
			Don't have an account? <Link to="/Signup"> Click here to Sign Up!</Link>
			<br></br>
		</div>
	);
};

export default Login;
