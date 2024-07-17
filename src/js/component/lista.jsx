import React, { useState, useEffect } from "react";

const Lista = () => {
    const [tareas, setTareas] = useState([]);
    const [valorInput, setValorInput] = useState("");

    const host="https://playground.4geeks.com/todo";
    const user="pepito12";

    // Función para crear usuario
    async function crearUsuario() {
        const uri = `${host}/users/${user}`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        };
        const response = await fetch(uri, options);

        // Manejo de errores
        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log("Usuario creado:", data);
    }

    // Función para crear tareas (método POST)
    async function crearTareas(tarea) {
        const uri = `${host}/todos/${user}`;
        const todo = { label: tarea, is_done: false };
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(todo)
        };

        const response = await fetch(uri, options);

        // Manejo de errores
        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
            return;
        }

        // Limpiar el input y traer las tareas nuevamente
        setValorInput("");
        traerTareas();
    }

    // Función para traer las tareas (método GET)
    async function traerTareas() {
        const uri = `${host}/users/${user}`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);

        // Manejo de errores
        if (!response.ok) {
            console.log("Error", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        setTareas(data.todos);
    }

    // Función para borrar tareas (método DELETE)
    async function borrarTarea(id) {
        const uri = `${host}/todos/${id}`;
        const options = { method: "DELETE", headers: { "accept": "application/json" } };
        const response = await fetch(uri, options);

        // Traer las tareas nuevamente después de borrar
        traerTareas();
    }

    useEffect(() => {
        crearUsuario();
        traerTareas();
    }, []);
        
        // html
    return (
            <div className="container d-flex flex-column align-items-center">
                <h1 className="mt-5">Lista de tareas</h1>
                    <ul className="list-group">
                        <li className="list-group-item hoja ">
                            <input
                                    type="text"
                                    placeholder="añade tarea"
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            setTareas(tareas.concat(valorInput));
                                            setValorInput("");
                                        }
                                    }}
                                    value={valorInput}
                                    onChange={(e) => setValorInput(e.target.value)}
                                />
                                 {tareas.length === 0 ? (
                        <p className="text-center">
                            No hay tareas
                        </p>
                    ) : (
                            <>
                                {tareas.map((item, index) => (
                                    <ul key={index} className="nuevatarea">
                                        {item}
                                        <button
                                            className="btn btn-danger eliminar-btn"
                                            onClick={() => setTareas(tareas.filter((t, currentIndex) => index !== currentIndex))}
                                        >
                                            Eliminar
                                        </button>
                                    </ul>
                                ))}
                                {/* Mostrar el número total de tareas */}
                                <ul className="text-center">
                                    
                                    {tareas.length === 1  ? 
                                        (<p> 1 Tarea </p>) 
                                        : (<p>{tareas.length} Tareas</p>)
                                    }
                                    
                                </ul> 
                            </>
                        )}
                        </li>
                    </ul>
        </div>
    );
};

export default Lista;


