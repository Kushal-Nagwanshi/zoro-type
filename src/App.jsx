import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import TypingArea from './TypingArea/TypingArea'
import Stats from './Stats/Stats.jsx' 
import { TimeSelector } from './TimeSelector/TimeSelector'

function App() {
  const [page , setPage] = useState("Test") ;
  const [correct , setCorrect] = useState(0) ; 
  const [incorrect, setIncorrect] = useState(0) ; 
  const [time , setTime] = useState(15) ; 
  const [TestEnded , setTestEnded] = useState(false) ;
  const [TestStarted , setTestStarted] = useState(false) ; 


  useEffect(() => {
    console.log(time) ; 
  }, [time])

  useEffect( () => {
    if(TestEnded){
      console.log("Test Ended") ; 
      setPage("Stats") ;
    }
  } , [TestEnded]) ; 
  
useEffect( () => {} , [page]) ; 

  function handleNextTestButton(e){
    e.preventDefault() ; 
    console.log("next Test !")  ;

  }
  return (
  <div className='body'>
    <div className="topbar">
      <h1 className = "text">
      <div className="logo">
        <h1 className="text">
          <div className="top">Zoro cuts</div>
          ZoroType
        </h1>
      </div>
      </h1>
    </div>
    
    {page === "Test" && !TestStarted && <TimeSelector time = {time} setTime = {setTime} />}
    {
    page === "Test" && 
    <TypingArea 
      setTestStarted = {setTestStarted}
      setTestEnded = {setTestEnded} 
      setCorrect = {setCorrect} 
      setIncorrect = {setIncorrect}
      time = {time}
      setPage = {setPage} 
    />
    }
    {page === "Stats" && <Stats correct = {correct} incorrect = {incorrect} time = {time} />}
    <div id = "buttons">
      <div id='next-test-button-container' > 
          <button id = 'next-test-button' className = "plain-button" onClick = {handleNextTestButton}aria-label="start new test" data-balloon-pos="down">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
      </div>
    </div>
  </div>
  
  )
}

export default App
