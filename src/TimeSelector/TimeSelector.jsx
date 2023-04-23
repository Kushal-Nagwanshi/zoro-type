import {useEffect , useState , useRef} from 'react'
import './TimeSelector.css' 

export function TimeSelector(props){
    const [buttonClass , setButtonClass] = useState(["timeSelectorButton" , "timeSelectorButton" , "timeSelectorButton selectedTime"]) ; 
    const [selectedTime , setSelectedTime] = useState(60) ; 
    const refs = useRef([]) ;

    useEffect(() => {
        console.log(selectedTime) ; 
    }, [buttonClass])

    function handleClick(e){
        setButtonClass(() => {
            if(e.target.value === "15"){
                return ["timeSelectorButton selectedTime" , "timeSelectorButton" , "timeSelectorButton"] ;
            }
            else if(e.target.value === "30"){
                return ["timeSelectorButton" , "timeSelectorButton selectedTime" , "timeSelectorButton"] ;
            }
            else if(e.target.value === "60"){
                return ["timeSelectorButton" , "timeSelectorButton" , "timeSelectorButton selectedTime"] ;
            }
        });
        setSelectedTime(Number(e.target.value))
    }
    
    return (
        <div className="timeSelector">
            <button className= {buttonClass[0]} ref = {refs.current[0]} value = "15" onClick = { (e) => handleClick(e) }>15</button>
            <button className= {buttonClass[1]} ref = {refs.current[1]} value = "30" onClick = { (e) => handleClick(e) }>30</button>
            <button className= {buttonClass[2]} ref = {refs.current[2]} value = "60" onClick = { (e) => handleClick(e) }>60</button>
        </div>
    ) ; 
}

export default TimeSelector ; 