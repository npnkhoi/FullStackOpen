import React from 'react'

const Header = (props) => {
  return (
    <h2> {props.course} </h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => 
        <Part key={part.id} part={part}/>
      )}
    </>
  )
}

const Total = (props) => {
  return (
    <p><b>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course