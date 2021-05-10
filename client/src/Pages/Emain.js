import React, { useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import Enav from "../Component/enav";
import EmpNotes from "../Component/EmpNotes";
import Profile from "../Component/empcover";
import pic4 from "../Img/em.png";

// This is the main page that a regular employee will see after logging in

function Emain() {
	const { userData } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (!userData.user) history.push("/");
	}, [userData.user, history]);

	return (
		<div>
			<Enav />
			<h2>
				{" "}
				Hello{" "}
				<span className="" id="specialtxt">
					{" "}
					{userData.user ? userData.user.displayName : null}{" "}
				</span>{" "}
			</h2>
			<p>
				Welcome to your employee portal. Review the links above to select a task
				<br></br> <img class="img-fluid" src={pic4} alt="pic"></img>
				<p></p>
				<p></p>
			</p>
			<span class="rolenm"> Your Profile: </span> Please notify HR of any
			changes
			<Profile />
			<p></p>
			<p></p>
			<EmpNotes />
		</div>
	);
}

export default Emain;
