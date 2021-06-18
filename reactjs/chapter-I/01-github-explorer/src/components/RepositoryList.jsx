import { RepositoryItem } from "./RepositoryItem"

const dbtRepository = {
  name: 'dbt',
  description: 'A transformation tool.', 
  link: 'https://github.com/'
}

const jenkinsRepository = {
  name: 'Jenkins',
  description: 'Implement a CI/CD with Jenkins.', 
  link: 'https://github.com/'
}

export function RepositoryList() {
  return (
    <section className="repository-list">
      <h1>Repositories List</h1>

      <ul>
        <RepositoryItem repository={dbtRepository} />
        <RepositoryItem repository={jenkinsRepository}/>
      </ul>
    </section>
  )
}