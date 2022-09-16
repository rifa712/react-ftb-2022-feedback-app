import React from 'react'
import PropTypes from 'prop-types'
// components
import FeedbackItem from './FeedbackItem'

const FeedbackList = ({ feedback, handleDelete }) => {
  if (!feedback || feedback.length === 0) {
    return <p>No feedback yet</p>
  }

  return (
    <div className='feedback-list'>
      {feedback.map((f) => (
        <FeedbackItem key={f.id} item={f} handleDelete={handleDelete} />
      ))}
    </div>
  )
}

FeedbackList.propTypes = {
  feedback: PropTypes.array.isRequired,
}

export default FeedbackList
