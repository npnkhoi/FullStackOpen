import Person from './Person'

const Persons = ({persons, filter, removePerson}) => {
  return persons
    .filter(({name}) => name.includes(filter))
    .map((person) => (
      <div key={person.id}>
        <Person person={person} removePerson={removePerson}/>
        <button onClick={() => removePerson(person.id)}>Delete</button>
      </div>
    ))
}

export default Persons