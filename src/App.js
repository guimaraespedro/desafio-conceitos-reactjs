import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((r) => setProjects(r.data));
  }, []);

  async function handleAddRepository() {
    await api
      .post("/repositories",{
        title: `Repositorio ${Date.now()}`,
      })
      .then((r) => setProjects([...projects, r.data]));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then((r) => setProjects(projects.filter((p) => p.id !== id)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects && projects.map((proj) => (
          <li key={proj.id}>
            {proj.title}
            <button onClick={() => handleRemoveRepository(proj.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
