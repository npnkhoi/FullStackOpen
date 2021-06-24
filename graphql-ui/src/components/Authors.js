import { gql, useQuery } from "@apollo/client"

const Author = () => {
  const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born
      bookCount
    }
  }
  `
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return (
      <div>Loading ...</div>
    )
  }

  return (
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
  )
}

export default Author