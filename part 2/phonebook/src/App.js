import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonServices from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('NEUTRAL')

  useEffect(() => {
    PersonServices
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const notify = (content, type) => {
    setMessage(content)
    setMessageType(type)
    
    setTimeout(() => {
      setMessage(null)
      setMessageType('NEUTRAL')
    }, 5000);
  }

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
            notify('Updated successfully', 'SUCCESS')
            setPersons(persons.map(person => (person.id === id ? response.data : person)))
          })
      }
      
    } else {
      PersonServices
        .create(newPerson)
        .then(ret => {
          setPersons(persons.concat(ret))
          notify('Added successfully', 'SUCCESS')
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
        .catch(err => {
          console.log(err);
          notify('This person is deleted in the server. Please reload this page.', 'ERROR')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new person</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )
}

export default App