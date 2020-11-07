import Person from './Person'

const Persons = ({persons, filter}) => 
  persons
    .filter(({name}) => name.includes(filter))
    .map((person) => <Person person={person} />)

export default Persons