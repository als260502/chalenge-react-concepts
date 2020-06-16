import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    api.get('repositories')
      .then(response => {
        setRepositories(response.data)
      })

  }, [])

  async function handleAddRepository() {

    const url = 'https://github.com/als260502/chalenge-react-concepts'
    const title = 'Desafio ReactJS'
    const techs = ['ReactJS', 'Node.js', 'JavaScript']


    const response = await api.post('repositories', {
      title,
      url,
      techs
    })

    const newRepository = response.data

    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter(repository => repository.id !== id)

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>
              <strong>
                {repository.title}
              </strong>
              <a href={repository.url}>Link</a>
              <strong>Tecnologia(as): {repository.techs.join(', ')}</strong>

            </span>

            <button onClick={() => handleRemoveRepository(repository.id)}>
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
