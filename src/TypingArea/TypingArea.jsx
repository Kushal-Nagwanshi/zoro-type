import React, { useEffect, useState, useRef } from 'react'
import './TypingArea.css'
import {getLineNumber , typingContentZoro , typingContentTypingIsFun, getWidth , isValidKey} from '../util' 

let initialTypingContent = typingContentTypingIsFun ; 
initialTypingContent = typingContentZoro;
let initialcellStates = initialTypingContent.map((word) => {
  let InitialWordState = [] ; 
  for(let i = 0 ; i < word.length ; i ++){
    InitialWordState.push("letter untyped") ; 
  }  
  return InitialWordState ;
}) ;


// to test the cellState behaviour when it will change
/*
initialcellStates[0][3] = "letter wrong" ;
initialcellStates[0][1] = "letter typed" ; 
*/
function TypingArea() {
  let [currentIndex, setCurrentIndex] = useState([0,0]) 
  let [typingContent, setTypingContent] = useState(initialTypingContent) 
  let [cellState , setCellState] = useState(initialcellStates)
  const refs = useRef(typingContent.map(() => React.createRef())) 

  let Type = typingContent.map((word, idx) => {
    let wordcontainer = [] ; 
    for(let i = 0 ; i < word.length ; i ++){
      wordcontainer.push( <div className = {i == currentIndex[1] && idx == currentIndex[0] ? cellState[idx][i] + " cursor" : cellState[idx][i] } key = {i}><pre>{word[i]}</pre></div>)
    }
    return (<div className = "word" key = {`key${idx}`} ref = {refs.current[idx]} id = {`${idx}`} >{wordcontainer}</div>) 
  })

  useEffect(() => {

    function handleKeyDown(event) {
      let i = currentIndex[0] , j = currentIndex[1] ;
      // if( i === typingContent.length - 1 && j === typingContent[i].length ) return ; 
      // Here run a function which changes page to tell the stats of current typing test..

      // console.log( i , j , event.key) ;
      // console.log( refs.current[i] ) ; 
      let divId = refs.current[i].current.id  ;
      console.log( getWidth(divId)) ; 
      
      if (event.key === typingContent[currentIndex[0]][currentIndex[1]]) {
        // console.log( i , j ) ; 
        // console.log(typingcontent[i].length) ; 

        let newcellState = [...cellState];
        newcellState[i][j] = "letter correct" ; 
        
        if( typingContent[i].length === j + 1 ){ i = i + 1 ; j = 0 ; }
        else j++ ;  
        setCurrentIndex([i,j]) ;
        setCellState(newcellState) ; 
        // console.log("typed correctly") ; 
      }
      else if( event.key === 'Backspace'){
        
        if( j > 0 ) j -=1; 
        else if ( j == 0 && i != 0 ) {i -= 1 ;  j = typingContent[i].length - 1 ;}
     
        let newcellState = [...cellState];
        newcellState[i][j] = "letter untyped" ;

        setCurrentIndex([i,j]) ;
        setCellState(cellState) ; 
      }
      else if( isValidKey(event.key) ){
        let newcellState = [...cellState];
        newcellState[i][j] = "letter wrong" ;

        if( typingContent[i].length === j + 1 ){ i = i + 1 ; j = 0 ; }
        else j++ ; 
         
        setCurrentIndex([i,j]) ;
        setCellState(cellState)  ;
      }

      if(j == 0) {
        // check the current line number.
        // if line number >= 3 , cut the first line.
        let lineNumber = getLineNumber( i , getWidth("TA")); 
        console.log(lineNumber) ; 

        if( lineNumber >= 3 ){
            let x = 1 , ni = 0 , widthSum = 0 , widthTA = getWidth("TA") ;  
            while( x < 2 && ni < i ){
                widthSum += getWidth(`${ni}`) ; 
                ni++ ; 
                if( widthSum > widthTA) {x++ ; widthSum = 0 ; }
            }
            console.log( `updating content x = ${x} ni = ${ni}`);
            setCellState( (prevState) => { console.log(prevState) ; return [...prevState].slice(ni) ;}) ; 
            setTypingContent( (prevState) => {  console.log(prevState) ; return [...prevState].slice(ni) ;}) ; 
            setCurrentIndex([i - ni,0]) ; 
        }
      }

    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex , cellState , typingContent]);

  return (
  <div className = "TypingAreaContainer">
    <div className="TypingArea" id = "TA">
      {Type}  
    </div>
    <button className = "startButton"> Start </button>
  </div>
   
  )
}

export default TypingArea
