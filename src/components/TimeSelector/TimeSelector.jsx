import {useEffect , useState , useRef} from 'react'
import './TimeSelector.css' 

export function TimeSelector(props){

    function handleClick(e){
        props.setTime(Number(e.target.value))
    }
    
    return (<div className= "timeSelector" >
            <button className= {props.time === 15 ? "timeSelectorButton selectedTime" : "timeSelectorButton"} value = "15" onClick = { (e) => handleClick(e) }>15</button>
            <button className= {props.time === 30 ? "timeSelectorButton selectedTime" : "timeSelectorButton"} value = "30" onClick = { (e) => handleClick(e) }>30</button>
            <button className= {props.time === 60 ? "timeSelectorButton selectedTime" : "timeSelectorButton"} value = "60" onClick = { (e) => handleClick(e) }>60</button>
        </div>)
}

export default TimeSelector ; 