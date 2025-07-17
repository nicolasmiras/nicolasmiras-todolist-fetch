import React, { useState } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState([]);

	// 
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	// agregao una tarea cuando aprieto enter
	const handleKeyDown = (event) => {
		if (event.key !== "Enter" || inputValue.trim() === "") return;
		setTasks([...tasks, inputValue]);
		setInputValue("");
	};

	// Elimino la tarea
	const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h1>Lista de Pendientes</h1>
			<input
				type="text"
				className="form-control"
				placeholder="¿Qué Tienes Pendiente?"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>

			<ul>
				{tasks.map((task, index) => (
					<li
						key={index}>
						{task}
						<button
							onClick={() => deleteTask(index)}>
						</button>
					</li>
				))}
			</ul>
			<p>
				{tasks.length} {tasks.length === 1 ? "item" : "items"} por hacer
			</p>
		</div>
	);
};

export default Home;
