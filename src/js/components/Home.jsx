import React, { useState } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState([]);

	const inputChange = (e) => {
		setInputValue(e.target.value);
	};

	const listDown = (e) => {
		if (e.key !== "Enter" || inputValue.trim() === "") return;
		setTasks([...tasks, inputValue]);
		setInputValue("");
	};

	// Elimino la tarea
	const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};

	return (
		
		<div className="container w-50">
			<h1 className="text-center">Lista de Pendientes</h1>
			<input
				type="text"
				className="form-control"
				placeholder="¿Qué Tienes Pendiente?"
				value={inputValue}
				onChange={inputChange}
				onKeyDown={listDown}
			/>

			<ul className="list-group mt-3">
				{tasks.map((task, index) => (
					<li
						key={index}
						className="list-group-item d-flex justify-content-between align-items-center">
						{task}
						<button
							className="btn btn-danger" onClick={() => deleteTask(index)}>
						</button>
					</li>
				))}
			</ul>
			<p className="text-secondary mt-2">
				{tasks.length} {tasks.length === 1 ? "item" : "items"} por hacer
			</p>
		</div>
	);
};

export default Home;
