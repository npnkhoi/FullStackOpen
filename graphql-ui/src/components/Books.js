import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return (
      <div>Loading ...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {result.data.allBooks.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Books