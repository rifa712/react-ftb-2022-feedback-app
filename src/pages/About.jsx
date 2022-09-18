import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

const About = () => {
  return (
    <Card>
      <div className='about'>
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback</p>
        <p>Version: 1.0.0</p>
      </div>

      <p>
        <Link to='/'>Back To Home</Link>
      </p>
    </Card>
  )
}

export default About
