import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../assets/css/Search.css";

export default function Search() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	async function handleSearch(data) {
		await axios({
			method: "get",
			url: "http://localhost:8080/common/search/" + data.title,
			withCredentials: true,
		})
			.then((response) => {
				if (response.status === 200) return response.data;
			})
			.then((result) => {
				if (result.common.res_code === 200) return result.data;
			})
			.then((movList) => {
				navigate("/search", { state: movList });
			});
	}
	return (
		<>
			<form onSubmit={handleSubmit(handleSearch)}>
				<input
					className="searchInput"
					{...register("title", { required: true })}
				/>
				<button type="submit" className="searchBtn">
					Search
				</button>
			</form>
		</>
	);
}
