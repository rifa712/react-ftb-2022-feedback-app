import { createContext, useEffect, useRef, useState } from 'react'

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
  const addFeedback = async (newFeedback) => {
    const res = await fetch(`/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await res.json()

    setFeedback([data, ...feedback])
  }

  // Edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // Update feedback
  const updateFeedback = async (id, updItem) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updItem),
    })

    const data = await res.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
    setFeedbackEdit({ item: {}, edit: false })
  }

  // Deleting feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure want to delete this feedback ?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
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
