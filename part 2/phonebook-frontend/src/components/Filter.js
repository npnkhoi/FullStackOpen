const Filter = ({filter, setFilter}) => {
  return (
  <div>
    Filter - shown with name
    <input value={filter} onChange={(event) => setFilter(event.target.value)}></input>
  </div>
  )
}

export default Filter