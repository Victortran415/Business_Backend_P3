import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ConfirmUser = (props) => {
	const history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				await axios.post("/register", {
					token: props.match.params.token,
				});
				history.push("/");
			} catch (err) {
				console.log(err);
			}
		})();
	}, [history, props.match.params.token]);

	return <div>User has been confirmed {props.match.params.token}</div>;
};

export default ConfirmUser;
