import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    // console.log(persons, newPerson, persons.includes(newPerson));
    if (persons.map((person) => person.name).includes(newName)) {
      window.alert(`${newName} is already in the list`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter - shown with name
        <input value={filter} onChange={(event) => setFilter(event.target.value)}></input>
      </div>
      <h2>Add a new person</h2>
      <form>
        <div>
          name:
          <input onChange={(event) => setNewName(event.target.value)} value={newName} />
        </div>
        <div>
            number: 
            <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(({name}) => name.includes(filter))
      .map((person) => 
        <div key={person.name}>{person.name}: {person.number}</div>
      )}
    </div>
  )
}

export default App