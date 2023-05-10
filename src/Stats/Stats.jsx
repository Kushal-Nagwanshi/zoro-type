
import './Stats.css' ; 
import '../css/balloon.min.css'

function Stats(props){
    const totalCorrectWords = props.correct / 5 ; 
    const totalLetters = props.correct + props.incorrect ; 

    const wpm = props.time === 0 ? 0 : Math.floor( totalCorrectWords / props.time * 60 );
    const accuracy = totalLetters === 0 ? 0 : Math.floor(props.correct / totalLetters * 100 ) ; 
    
    return (
        <div id="stats">
            <div id="primary-stats">
                <div id='wpm'>
                    <div id="wpm-top">
                        wpm
                    </div>
                    <div id= "wpm-bot">
                        {wpm} 
                    </div>
                </div>
                <div id="accuracy">
                    <div id="accuracy-top">
                        acc
                    </div>
                    <div id = "accuracy-bot">
                        {accuracy} 
                    </div>
                </div>
            </div>
            <div id="secondary-stats">
                <div id = 'characters'>
                    <div id = 'characters-top' >
                        characters
                    </div>
                    <div id="characters-bot" aria-label="correct, incorrect" data-balloon-pos="up">
                        <div id="correct">{props.correct}</div>
                        <div id="incorrect">{props.incorrect}</div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Stats ; 