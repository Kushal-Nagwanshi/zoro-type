import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import TypingArea from './components/TypingArea/TypingArea'
import Stats from './components/Stats/Stats.jsx' 
import Options from './components/Options/Options'

function App() {
  let storedTime = localStorage.getItem("time");
  if( storedTime === '0') storedTime = 15 ; 
  let storedTestType = localStorage.getItem("testType") ; 
  if( storedTestType === 'null') storedTestType = "Random" ;
  
  const [page , setPage] = useState("Test") ;
  const [correct , setCorrect] = useState(0) ; 
  const [incorrect, setIncorrect] = useState(0) ; 
  const [time , setTime] = useState(Number(storedTime)) ; 
  const [TestEnded , setTestEnded] = useState(false) ;
  const [TestStarted , setTestStarted] = useState(false) ; 
  const [restartTest , setRestartTest] = useState(false) ;
  const [testType , setTestType] = useState(storedTestType) ; 

  useEffect(() =>{
    localStorage.setItem("time" , time) ; 
  },[time])

  useEffect(() =>{
    localStorage.setItem("testType" , testType) ; 
  },[testType])

  useEffect(() => {
    console.log(`time got changed to ${time}`) ; 
  }, [time])
  
  useEffect( () => {
    if(TestEnded){
      console.log("Test Ended") ; 
      setPage("Stats") ;
    }
  } , [TestEnded]) ; 
  
  useEffect( () => {} , [page]) ; 

  function handleNextTestButton(e){
    console.log("next Test !")  ;
    setPage("Test") ;
    setRestartTest(true) ; 
    setCorrect(0) ; 
    setIncorrect(0) ; 
    setTestEnded(false) ;
    setTestStarted(false) ; 
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
    
    {page === "Test" && !TestStarted && <Options time = {time} setTime = {setTime} testType = {testType} setTestType = {setTestType}/>}
    {
    page === "Test" && 
    <TypingArea 
      testType = {testType} setTestType = {setTestType}
      setTestStarted = {setTestStarted}
      setTestEnded = {setTestEnded} 
      setCorrect = {setCorrect} 
      setIncorrect = {setIncorrect}
      time = {time}
      setPage = {setPage} 
      restartTest = {restartTest}
      setRestartTest = {setRestartTest}
    />
    }
    {page === "Stats" && <Stats correct = {correct} incorrect = {incorrect} time = {time} />}
    <div id = "buttons" >
      <div id='next-test-button-container' > 
          <button type = "button" id = 'next-test-button' tabIndex = {0} className = "plain-button" onClick = {handleNextTestButton} aria-label="start new test" data-balloon-pos="down">
              <i className="fa fa-chevron-right"  aria-hidden="true"></i>
          </button>
      </div>
    </div>
  </div>
  
  )
}

export default App
