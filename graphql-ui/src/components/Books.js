import { gql, useQuery } from "@apollo/client"

const Books = () => {
  const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
  `
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return (
      <div>Loading ...</div>
    )
  }

  return (
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
  )
}

export default Books