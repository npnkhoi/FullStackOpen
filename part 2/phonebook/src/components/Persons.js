import Person from './Person'

const Persons = ({persons, filter}) => {
  return persons
    .filter(({name}) => name.includes(filter))
    .map((person) => <Person key={person.name} person={person} />)
}

export default Persons