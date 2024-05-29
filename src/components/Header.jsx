import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import Logout from "./Logout";
export default function Header() {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		isLogin: false,
		mem_name: "",
		mem_id: "",
		mem_class: "",
	});
	const auth = async () => {
		await axios({
			method: "get",
			url: "http://localhost:8080/user/auth",
			data: {},
			withCredentials: true,
		}).then((response) => {
			if (response.data.common.res_code === 200) {
				setLogin({
					isLogin: true,
					mem_name: response.data.data.mem_name,
					mem_id: response.data.data.mem_id,
					mem_class: response.data.data.mem_class,
				});
			}
		});
	};

	useEffect(() => {
		auth();
	}, []);

	const handleClick = () => {
		navigate("/login");
	};
	return (
		<>
			<header>
				<div className="header-container">
					<Link to={"/"}>
						<div>logo</div>
					</Link>
					{login.isLogin ? (
						<Logout />
					) : (
						<button onClick={handleClick}>Login</button>
					)}
					<div>{login.mem_name}</div>
					<div className="search-container">
						<input></input>
						<Button>Search</Button>
					</div>
				</div>
			</header>
		</>
	);
}