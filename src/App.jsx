import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

let initialTypingContent = ["Typing " , "is " , "fun " , "!! " , "What " , "do " , "You " ,"Guys " , "think?"] ;

function App() {
  const [currentIndex, setCurrentIndex] = useState(0) 
  const [typingcontent, setTypingContent] = useState(initialTypingContent) 
  
  let Type = typingcontent.map((word, idx) => {
    let wordcontainer = [] ; 
    let initial_state_class = "letter untyped" ; 
    for(let i = 0 ; i < word.length ; i ++){
      wordcontainer.push( <div className = {i == 0 && idx == 0 ? initial_state_class + " cursor" : initial_state_class } key = {i}><pre>{word[i]}</pre></div>)
    }
    return (<div className = "word" key = {idx}>{wordcontainer}</div>) 
  })

  return (
  <div className = "TypingAreaContainer">
    <h1>ZoroType</h1>
    <div className="TypingArea">
      {Type}  
    </div>
    <button className = "startButton"> Start </button>
  </div>
   
  )
}

export default App
