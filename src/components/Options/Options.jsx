import React, { useEffect } from 'react'
import TimeSelector from '../TimeSelector/TimeSelector'
import './Options.css'
export default function Options(props) { 

    function handleClick(e){
        props.setTestType(e.target.value)
    }
    
    return (
        <div id = "Options">
            <div id = "TestTypeSelector">
                <button className = {props.testType === "Random" ? "typeSelectorButton selectedType" : "typeSelectorButton"} value = 'Random' onClick = {(e) => handleClick(e)} >Random</button>
                <button className = {props.testType === "Zoro" ? "typeSelectorButton selectedType" : "typeSelectorButton"} value = 'Zoro' onClick = {(e) => handleClick(e)} >Zoro</button>
            </div>
            {/*props.testType === "Random" &&*/ <TimeSelector time = {props.time} setTime = {props.setTime}></TimeSelector>}
        </div>
    )
}