import {useParams} from 'react-router-dom'

const Anecdote = ({anecdotes}) => {
  const id = useParams().id; // HACK
  const anec = anecdotes.filter(x => x.id === id)[0]

  return(
    <div>
      <h2>Anecdote</h2>
        <ul>
          <li>Content: {anec.content} </li>
          <li>Author: {anec.author} </li>
          <li>Info: {anec.info} </li>
        </ul>
      
    </div>
  )
}

export default Anecdote