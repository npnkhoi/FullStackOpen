import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdotes, selected, votes}) => (
  <div>
    <p>{anecdotes[selected]}</p>
    <p>has {votes} votes </p>
  </div>
)

const App = (props) => {
  const numAnecdotes = props.anecdotes.length;
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(numAnecdotes).fill(0))

  const randomizeSelected = () => {
    setSelected(Math.floor(Math.random() * numAnecdotes));
  };

  const vote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const maxVoteIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes[selected]}/>
      <Button onClick={vote} text='vote'/>
      <Button onClick={randomizeSelected} text='Next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selected={maxVoteIndex} votes={votes[maxVoteIndex]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)