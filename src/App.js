import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
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
