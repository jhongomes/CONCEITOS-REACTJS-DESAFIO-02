import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, SetRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      SetRepositories(response.data);
    });

  },[]);

  
  //Add repository

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
    url: "http://github.com",
    title: `New Project ${Date.now()}`,
    techs: ["NodeJs", "ReactJs", "React Native"]
    });

    const repository = response.data;

    SetRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);

      SetRepositories(repositories.filter(repository => repository.id !== id));

    }catch{      
      alert("Erro the delet repository")

    }//fim try catch
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
        <li key={repository.id}>
          {repository.title}
          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

