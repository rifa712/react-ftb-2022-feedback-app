import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// util
import { v4 as uuidv4 } from 'uuid'
// static data
import FeedbackData from './data/FeedbackData'
// context
import { FeedbackProvider } from './context/FeedbackContext'
// components
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
// pages
import About from './pages/About'

const App = () => {
  const [feedback, setFeedback] = useState(FeedbackData)

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Deleting feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure want to delete this feedback ?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    handleDelete={deleteFeedback}
                  />
                </>
              }
            ></Route>

            <Route path='/about' element={<About />} />
          </Routes>

          <AboutIconLink />
        </div>
      </BrowserRouter>
    </FeedbackProvider>
  )
}

export default App
