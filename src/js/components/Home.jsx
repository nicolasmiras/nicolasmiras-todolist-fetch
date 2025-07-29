import React, { useState, useEffect } from "react";

const API_BASE = "https://playground.4geeks.com/todo";
const USER = "nicolas_miras";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const resp = await fetch(`${API_BASE}/users/${USER}`);
        const data = await resp.json();
        setTasks(data.todos || []);
    };

    const inputChange = (e) => setInputValue(e.target.value);

    const listDown = async (e) => {
        if (e.key !== "Enter" || inputValue.trim() === "") return;
        const newTask = {
            label: inputValue.trim(),
            is_done: false
        };
        await fetch(`${API_BASE}/todos/${USER}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });
        setInputValue("");
        fetchTasks();
    };

    const deleteTask = async (task_id) => {
        await fetch(`${API_BASE}/todos/${task_id}`, {
            method: "DELETE"
        });
        fetchTasks();
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
                {tasks.length === 0 ? (
                    <li className="list-group-item text-center text-muted">
                        Sin Tareas
                    </li>
                ) : (
                    tasks.map((task) => (
                        <li
                            key={task.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {task.label}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteTask(task.id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))
                )}
            </ul>
            <p className="text-secondary mt-2">
                {tasks.length} {tasks.length === 1 ? "item" : "Tareas"} por Hacer
            </p>
        </div>
    );
};

export default Home;
