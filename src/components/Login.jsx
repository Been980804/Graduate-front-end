import axios from "axios";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import id from "/src/assets/images/profile.png";
import pwd from "/src/assets/images/password.png";

import { useForm } from "react-hook-form";

export default function Login({ show, onHide }) {
	const { register, handleSubmit } = useForm();
	async function handleLogin(data) {
		await axios({
			method: "post",
			url: "http://localhost:8080/user/login",
			withCredentials: true,
			data: {
				mem_id: data.mem_id,
				pwd: data.pwd,
			},
		})
			.then((response) => {
				if (response.status === 200) return response.data;
			})
			.then((result) => {
				if (result.common.res_code === 200) {
					alert("환영합니다.");
				} else {
					alert("ID 혹은 PW가 일치하지 않습니다.");
				}
			});
		onHide();
	}

	function handleJoin() {
		//join 관련 처리
		onHide();
	}
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Label><img src={id} style={{width:'25px' ,margin: '0 0 0 5px'}}/></Form.Label>
					<Form.Control
						placeholder="ID"
						autoFocus
						{...register("mem_id", { required: true })}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label><img src={pwd} style={{width:'25px' ,margin: '10px 0 0 5px'}}/></Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						{...register("pwd", { required: true })}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					회원가입
				</Button>
				<Button variant="primary" onClick={handleSubmit(handleLogin)}>
					로그인
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
