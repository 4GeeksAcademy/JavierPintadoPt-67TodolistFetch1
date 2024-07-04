import React, { useState } from "react";

const Lista = () => {
    const [tareas, setTareas] = useState([]);
    const [valorInput, setValorInput] = useState("");

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1>Lista de tareas</h1>
                <ul className="inline">
                    <li>
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
                    </li>
                    {tareas.length === 0 ? (
                        <li>No hay tareas</li>
                    ) : (
                        tareas.map((item, index) => (
                            <li key={index} className="nuevatarea">
                                {item}
                                <button
                                    className="btn btn-danger eliminar-btn"
                                    onClick={() => setTareas(tareas.filter((t, currentIndex) => index !== currentIndex))}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default Lista;

