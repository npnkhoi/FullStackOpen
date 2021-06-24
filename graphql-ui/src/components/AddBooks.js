import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ADD_BOOK } from "../queries";
import TextInput from "./TextInput";

const AddBooks = () => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

    const [addBook] = useMutation(ADD_BOOK)

  const submitGenre = (e) => {
    e.preventDefault()
    if (genre !== '') {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  }

  const submitForm = (e) => {
    e.preventDefault()
    addBook({variables: {title, author, published: parseInt(published), genres}})
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')    
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          Title: 
          <TextInput value={title} setValue={setTitle}/>
        </div>
        <div>
          Author: 
          <TextInput value={author} setValue={setAuthor}/>
        </div>
        <div>
          Published: 
          <TextInput value={published} setValue={setPublished}/>
        </div>
        <div>
          <TextInput value={genre} setValue={setGenre}/>
          <button onClick={submitGenre}> Add genre</button>
        </div>
        <p>
          Genres: {genres.join(', ')}
        </p>
        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  )
}
export default AddBooks