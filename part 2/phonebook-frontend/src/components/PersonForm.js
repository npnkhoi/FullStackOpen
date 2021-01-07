const PersonForm = (props) => {
  return (
      <form>
      <div>
        name:
        <input onChange={(event) => props.setNewName(event.target.value)} value={props.newName} />
      </div>
      <div>
          number: 
          <input onChange={(event) => props.setNewNumber(event.target.value)} value={props.newNumber} />
      </div>
      <div>
        <button type="submit" onClick={props.addPerson}>add</button>
      </div>
    </form>

  )
}

export default PersonForm