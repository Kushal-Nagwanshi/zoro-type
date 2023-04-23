import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import TypingArea from './TypingArea/TypingArea'
import TimeSelector from './TimeSelector/TimeSelector.jsx'

function App() {
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
    
    <TimeSelector/>
    <TypingArea/>
  </div>
  )
}

export default App
