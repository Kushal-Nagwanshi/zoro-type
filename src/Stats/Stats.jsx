
import './Stats.css' ; 
import '../css/balloon.min.css'

function Stats(props){

    return (
        <div id="stats">
            <div id="primary-stats">
                <div id='wpm'>
                    <div id="wpm-top">
                        wpm
                    </div>
                    <div id= "wpm-bot">
                        {props.wpm} 
                    </div>
                </div>
                <div id="accuracy">
                    <div id="accuracy-top">
                        acc
                    </div>
                    <div id = "accuracy-bot">
                        {props.accuracy} 
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
            <div id = "buttons">
                <div id='next-test-button-container' aria-label="start new test" data-balloon-pos="up"> 
                    <button id = 'next-test-button' className = "plain-button">
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Stats ; 