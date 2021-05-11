import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import pic2 from "../Img/toppic2.png";
import showPwdImg from "../Img/show-password.svg";
import hidePwdImg from "../Img/hide-password.svg";

const Signup = () => {
	const [form, setForm] = useState();
	const [isRevealPwd, setIsRevealPwd] = useState(false);
	const history = useHistory();

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submit = async (e) => {
		e.preventDefault();
		try {
			await Axios.post("/users/register", form);
			history.push("/login");
		} catch (err) {
			alert("problem", err);
		}
	};

	return (
		<div class="container03">
			<span className="top02">HUDDLE ROOM</span>
			<br></br>
			<span className="coname">An Employee Management Portal </span>
			<br></br>
			<img class="img01" src={pic2} alt="pic"></img>
			<p></p>
			<h2>Create an Account </h2>
			Welcome! Please input your information below to create an account
			<br></br>
			<div class="formcont">
				<form onSubmit={submit}>
					<label htmlFor="email">Email: </label>
					<input
						onChange={onChange}
						type="text"
						name="email"
						placeholder="email"
						class="input"
					></input>{" "}
					<p></p>
					<label htmlFor="displayName">Fullname: </label>
					<input
						onChange={onChange}
						type="text"
						name="displayName"
						placeholder="First & Last Name"
						class="input"
					></input>
					<p></p>
					<label htmlFor="password">Password: </label>
					<input
						onChange={onChange}
						type={isRevealPwd ? "text" : "password"}
						name="password"
						placeholder="password"
						class="input"
					></input>
					<img
						className="hideShowPw"
						title={isRevealPwd ? "Hide password" : "Show password"}
						src={isRevealPwd ? hidePwdImg : showPwdImg}
						onClick={() => setIsRevealPwd((prevState) => !prevState)}
					/>
					{" "}
					<p></p>
					<label htmlFor="passwordCheck">Re-enter Password: </label>
					<input
						onChange={onChange}
						type={isRevealPwd ? "text" : "password"}
						name="passwordCheck"
						placeholder="passwordCheck"
						class="input"
					></input>
					<p></p>
					<br />
					<label>Select Job Title:</label>{" "}
					<select name="role" onChange={onChange} placeholder="Job Title">
						<option value="Select">Select</option>
						<option value="Employee">Employee</option>
						<option value="Manager">Manager</option>
					</select>
					<p></p>
					<input class="btn02" type="submit"></input>
				</form>
			</div>
			<br></br>
			Already have an account? <Link to="/login"> Click here to Login!</Link>
		</div>
	);
};

export default Signup;
