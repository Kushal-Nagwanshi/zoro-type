import {useEffect , useState} from 'react' ; 
import './Timer.css'

function Timer(props) {
    const [seconds, setSeconds] = useState(props.seconds) ; 

    useEffect(() => {
      let interval = setInterval(() => 
      { 
        if(props.isActive) setSeconds((prevSeconds) => {
          prevSeconds = prevSeconds - 1 ;
          if(prevSeconds == 0) {props.setIsActive(false) ;  props.setIsEnded(true) ;}
          return prevSeconds ;
      })
      } , 1000) ; 
      return () => {
        clearInterval(interval)  ;
      }
    }, [seconds])
    

    return (
       <div className="timer">
            <div className="time">
                {seconds > 0 ? seconds : ""} 
            </div>
       </div>
      )
}

export default Timer;