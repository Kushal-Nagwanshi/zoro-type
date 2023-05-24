import React, { useEffect, useState, useRef } from 'react'
import './TypingArea.css'
import {getLineNumber , typingContentZoro , getWidth , isValidKey , isSpecialKey , getRandomWords} from '../../util' 
import Timer from '../Timer/Timer';

function TypingArea(props) {
  let [currentIndex, setCurrentIndex] = useState([0,0]) 
  let [typingContent, setTypingContent] = useState(["R"]) 
  let [cellState , setCellState] = useState(["letter untyped"])
  let [restartTest , setRestartTest] = [props.restartTest , props.setRestartTest] 
  const [isActive , setIsActive] = useState(false) ; 
  const [isEnded , setIsEnded] = useState(false) ; 
  const refs = useRef([]) ;
  const typingAreaRef = useRef();

  let Type = typingContent.map((word, idx) => {
    let wordcontainer = [] ; 
    for(let i = 0 ; i < word.length ; i ++){
      wordcontainer.push( <div className = {i == currentIndex[1] && idx == currentIndex[0] ? cellState[idx][i] + " cursor" : cellState[idx][i] } key = {i}><pre>{word[i]}</pre></div>)
    }
    return (<div className = "word" key = {`key${idx}`} ref={el => refs.current[idx] = el} id = {`${idx}`} >{wordcontainer}</div>) 
  });
  
  function setContent(){
    if( props.testType == "Random"){
      let wordList = getRandomWords(60) ;
      // console.log(wordList) ; 
  
      let initialTypingContent = wordList ; 
      let initialcellStates = initialTypingContent.map((word) => {
        let InitialWordState = [] ; 
        for(let i = 0 ; i < word.length ; i ++){
          InitialWordState.push("letter untyped") ; 
        }  
        return InitialWordState ;
      }) ;
  
      setTypingContent(initialTypingContent) ; 
      setCellState(initialcellStates) ;
      setCurrentIndex([0,0]) 
    }
    else if(props.testType === "Zoro"){
      let initialTypingContent = typingContentZoro;
      let initialcellStates = initialTypingContent.map((word) => {
        let InitialWordState = [] ; 
        for(let i = 0 ; i < word.length ; i ++){
          InitialWordState.push("letter untyped") ; 
        }  
        return InitialWordState ;
      }) ;
      // console.log(initialTypingContent);
      // console.log(initialcellStates);
      setTypingContent(initialTypingContent) 
      setCellState(initialcellStates)
      setCurrentIndex([0,0]) 
    }
  }

  function addWord(){
    let word = getRandomWords(1)[0] ;
    setTypingContent( (prevContent) => {
      let newContent = [...prevContent];
      newContent.push(word) ; 
      // console.log(`pushed ${word}`) ;
      return newContent;
    })
    setCellState( (prevCellState) => {
      let newCellState = [...prevCellState];
      let newWordState = [] ;
      // console.log(word, "is " , word.length,"long");
      for(let i = 0 ; i < word.length ; i++){
        newWordState.push("letter untyped") ; 
      }
      newCellState.push(newWordState);
      // console.log(newCellState);
      return newCellState ;
    })

  }

  useEffect( () => {
      typingAreaRef.current.focus() ; 
  }) ;

  useEffect( () => {
    setContent() ; 
  } , [props.testType])

  useEffect( () => {
    if(restartTest){   
      if (document.activeElement) {
        document.activeElement.blur();
        document.body.focus() ; 
    }
      // console.log("restarting test...") ;
      setContent() 
      setIsActive(false)
      setIsEnded(false)
      setRestartTest(false)
    }
    

  } ,[ restartTest , typingContent , cellState , currentIndex]) ; 

 useEffect( () => {
  if(isEnded) props.setTestEnded(true); 
 } , [isEnded]) ;
  
 useEffect( () => {
  // console.log(props.time) ; 
 }, [props.time]) ; 

 useEffect(() => {

    function handleKeyDown(event) {
      let i = currentIndex[0] , j = currentIndex[1] ;
      let new_i = i , new_j = j ; 

      if( i === 0 && j === 0 ) { 
        if(isSpecialKey(event.key)) return ; 
          setIsActive(true) ;
          props.setTestStarted(true) ; 
      }
      // Here run a function which changes page to tell the stats of current typing test..
      if( i === typingContent.length - 1 && j === typingContent[i].length ) {
        console.log("Test Ended : setting testEnded to true");
        props.setTestEnded(true); 
      }

      // console.log( i , j , event.key) ;
      // console.log( refs.current[i] ) ; 
      let divId = refs.current[i].id  ;
      console.log( getWidth(divId)) ; 

      //correctly typed
      if (event.key === typingContent[currentIndex[0]][currentIndex[1]]) {
        // console.log( i , j ) ; 
        // console.log(typingcontent[i].length) ; 
        
        let newcellState = [...cellState];
        newcellState[i][j] = "letter correct" ; 
        
        if( typingContent[i].length === j + 1 ){ new_i = i + 1 ; new_j = 0 ;}
        else new_j++ ;  
        setCurrentIndex([new_i,new_j]) ;
        setCellState(newcellState) ; 
        props.setCorrect(prev => { console.log(prev) ; return prev+1 ; }) ; 
        
        // console.log("typed correctly") ; 
      }
      else if( !(i == 0 && j == 0 ) && event.key === 'Backspace'){
        
        if( j > 0 ) new_j = j - 1; 
        else if ( j == 0 && i != 0 ) {new_i = i - 1 ;  new_j = typingContent[new_i].length - 1 ;}

        if(cellState[new_i][new_j] == "letter incorrect") props.setIncorrect(prev => {return prev-1; }) ;
        else props.setCorrect(prev => {return prev-1;}) ; 

        let newcellState = [...cellState];
        newcellState[new_i][new_j] = "letter untyped" ;
        
        setCurrentIndex([new_i,new_j]) ;
        setCellState(cellState) ; 
        return ; 
      }
      else if( isValidKey(event.key) ){
        let newcellState = [...cellState];
        newcellState[i][j] = "letter wrong" ;
        
        if( typingContent[i].length === j + 1 ){ new_i = i + 1 ; new_j = 0 ;}
        else new_j++ ; 
         
        setCurrentIndex([new_i,new_j]) ;
        setCellState(cellState)  ;
        props.setIncorrect(prev => {return prev+1 ;}) ; 
      }

      if(j == typingContent[i].length - 1 && i !== typingContent.length -1 ) {
        // check the current line number.
        // if line number >= 3 , cut the first line.
        // console.log("TA" , getWidth("TA")) ;
        // console.log("TAC" ,getWidth("TAC"));
        // THIS 2.4 COMES FROM 0.15 * 16 ( ROOT FONT SIZE )
        // THIS HAS TO BE DONE  DUE TO THE 0.15 REM PADDING THAT WAS ADDED.
        let lineNumber = getLineNumber( i + 1 , getWidth("TA") - 2.4); 
        // console.log(lineNumber) ; 

        if( lineNumber >= 3 ){
            let x = 1 , ni = 0 , widthSum = 0 , widthTA = getWidth("TA") - 2.4;  
            while( x < 2 && ni < i ){
                widthSum += getWidth(`${ni}`) ; 
                ni++ ; 
                if( widthSum > widthTA) {x++ ; ni--;  widthSum = 0 ; }
            }

            setCellState( (prevState) => { return [...prevState].slice(ni) ;}) ; 
            setTypingContent( (prevState) => { return [...prevState].slice(ni) ;}) ; 
            setCurrentIndex([i - ni + 1,0]) ; 
        }
      }
      if( props.testType === "Random" && j === typingContent[i].length - 1 && event.key != "Backspace"){ addWord() ; }

    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex , cellState , typingContent]);
  
 
  return (
  <div className = "TypingAreaContainer" id = "TAC">
    { isActive && <Timer seconds = {props.time} setIsEnded = {setIsEnded} isActive = {isActive} setIsActive = {setIsActive}/> }
    <div className="TypingArea"  tabIndex={-1}  ref ={typingAreaRef} id = "TA">
      {Type}  
    </div>
  </div>
   
  )
}

export default TypingArea
