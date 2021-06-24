import { useQuery } from "@apollo/client"
import SetBirthyear from './SetBirthyear'
import { ALL_AUTHORS } from "../queries"

const Author = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return (
      <div>Loading ...</div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {result.data.allAuthors.map(author => (
          <tr key={author.name}>
            <td>{author.name}</td>
            <td>{author.born}</td>
            <td>{author.bookCount}</td>
          </tr>
        ))}
      </table>
      <SetBirthyear allAuthors={result.data.allAuthors}/>
      
    </div>
  )
}

export default Author