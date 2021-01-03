import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonServices from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    PersonServices
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if (persons.map((person) => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already in the list, do you want to modify this person?`)) {
        let id
        persons.forEach(person => {
          if (person.name === newName) {
            id = person.id
          }
        })
        PersonServices
          .update(id, {...newPerson, id})
          .then(response => {
            setPersons(persons.map(person => (person.id === id ? response.data : person)))
          })
      }
      
    } else {
      PersonServices
        .create(newPerson)
        .then(ret => {
          setPersons(persons.concat(ret))
        })
        .catch((err) => {console.log(err);})
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      PersonServices
        .remove(id)
        .then(ret => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new person</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )
}

export default App