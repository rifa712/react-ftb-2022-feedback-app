import { createContext, useEffect, useRef, useState } from 'react'
// util
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  // state
  const [isLoading, setIsLoading] = useState(true)

  // initial data
  const [feedback, setFeedback] = useState([])

  // set edit form data
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // render once without using clean up
  const run = useRef(true)
  useEffect(() => {
    if (run.current) {
      run.current = false
      fetchFeedback()
    }
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const res = await fetch(
      'http://localhost:5000/feedback?_sort=id&_order=desc'
    )
    const data = await res.json()
    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
    setFeedbackEdit({ item: {}, edit: false })
  }

  // Deleting feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure want to delete this feedback ?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        editFeedback,
        updateFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
