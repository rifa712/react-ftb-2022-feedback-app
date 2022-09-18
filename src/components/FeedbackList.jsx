import React from 'react'
import PropTypes from 'prop-types'
// framer-motion
import { motion, AnimatePresence, animate } from 'framer-motion'
// components
import FeedbackItem from './FeedbackItem'

const FeedbackList = ({ feedback, handleDelete }) => {
  if (!feedback || feedback.length === 0) {
    return <p>No feedback yet</p>
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={f.id} item={f} handleDelete={handleDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

FeedbackList.propTypes = {
  feedback: PropTypes.array.isRequired,
}

export default FeedbackList
