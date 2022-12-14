import React from 'react'
import { useContext } from 'react'
// context
import FeedbackContext from '../context/FeedbackContext'
// framer-motion
import { motion, AnimatePresence } from 'framer-motion'
// components
import Spinner from './shared/Spinner'
import FeedbackItem from './FeedbackItem'

const FeedbackList = () => {
  // getting somethhing from context
  const { feedback, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedback || feedback.length) === 0) {
    return <p>No feedback yet</p>
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={f.id} item={f} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList
