import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import TextInput from "./TextInput"
import Select from "react-select"

const SetBirthyear = ({allAuthors}) => {
  const [author, setAuthor] = useState()
  const [birthyear, setBirthyear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = () => {
    editAuthor({variables: {name: author.value, setBornTo: parseInt(birthyear)}})
    setAuthor('')
    setBirthyear('')
  }
  
  console.log('all auth:', allAuthors);
  const authorNames = allAuthors.map(a => ({value: a.name, label: a.name}))
  console.log(authorNames);

  return (
    <div>
      <h3>set birthyear</h3>
      <Select 
        options={authorNames}
        value={author}
        onChange={setAuthor}
        placeholder="author name"
      />
      <div>
        Birth year: 
        <TextInput value={birthyear} setValue={setBirthyear}/>
      </div>
      <button onClick={submit}>Change</button>
    </div>
  )
}

export default SetBirthyear
