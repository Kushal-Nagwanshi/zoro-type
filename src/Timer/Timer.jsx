import {useEffect , useState} from 'react' ; 
import './Timer.css'

function useTimer(props) {
    const [seconds, setSeconds] = useState(Number(props.seconds)) ; 
    const [isActive , setIsActive] = useState(true) ; 

    useEffect(() => {
      let interval = setInterval(() => 
      { 
        if(isActive) setSeconds((prevSeconds) => {
          prevSeconds = prevSeconds - 1 ;
          if(prevSeconds == 0) setIsActive(false) ; 
          return prevSeconds ;
      })
      } , 1000) ; 
      return () => {
        clearInterval(interval)  ;
      }
    }, [seconds , isActive])
    

    return ( 
    {isActive , 
     setIsActive : setIsActive ,
     Timer_rendor : 
      (
       <div className="timer">
            <div className="time">
                {seconds > 0 ? seconds : ""} 
            </div>
       </div>
      )
    }
    );
}

export default useTimer;