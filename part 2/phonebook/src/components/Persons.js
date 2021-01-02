import Person from './Person'

const Persons = ({persons, filter}) => {
  console.log(persons);
  console.log(filter);
  return persons
    .filter(({name}) => name.includes(filter))
    .map((person) => <Person key={person.name} person={person} />)
}

export default Persons