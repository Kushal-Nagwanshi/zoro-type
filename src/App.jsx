import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import TypingArea from './TypingArea/TypingArea'
import Stats from './Stats/Stats.jsx' 
import { TimeSelector } from './TimeSelector/TimeSelector'

function App() {
  const [page , setPage] = useState("Test") ;
  const [correct , setCorrect] = useState(0) ; 
  const [incorrect, setIncorrect] = useState(0) ; 
  const [time , setTime] = useState(20) ; 
  const [TestEnded , setTestEnded] = useState(false) ;


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
    
    {<TimeSelector time = {time} setTime = {setTime} />}
    {
    page === "Test" && 
    <TypingArea 
      setTestEnded = {setTestEnded} 
      setCorrect = {setCorrect} 
      setIncorrect = {setIncorrect}
      time = {time}
      setPage = {setPage} 
    />
    }
    {page === "Stats" && <Stats correct = {correct} incorrect = {incorrect} time = {time} />}
  </div>
  )
}

export default App
