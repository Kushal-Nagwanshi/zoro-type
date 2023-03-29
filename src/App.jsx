import { useEffect, useState } from 'react'
import './App.css'

let initialTypingContent = ["Typing " , "is " , "fun " , "!! " , "What " , "do " , "You " ,"Guys " , "think?"] ;

let initialCellStates = initialTypingContent.map((word) => {
  let InitialWordState = [] ; 
  for(let i = 0 ; i < word.length ; i ++){
    InitialWordState.push("letter untyped") ; 
  }  
  return InitialWordState ;
}) ;

function isValidKey(key){
  if(key.length > 1 ) return false ;
  // console.log(key) ; 
  // console.log("inside isValidkey") ;
  const valid_characters = ['!', '\'', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
  
  if(key.match(/[a-zA-Z]/)) return true ;
  else if (key.match(/[0-9]/)) return true; 

  for(let i = 0 ; i < valid_characters.length ; i++ ){
      if(key === valid_characters[i] )return true;
  }
  return false;
}

// to test the CellState behaviour when it will change
/*
initialCellStates[0][3] = "letter wrong" ;
initialCellStates[0][1] = "letter typed" ; 
*/
function App() {
  const [currentIndex, setCurrentIndex] = useState([0,0]) 
  const [typingcontent, setTypingContent] = useState(initialTypingContent) 
  const [CellState , setCellState] = useState(initialCellStates)
  
  let Type = typingcontent.map((word, idx) => {
    let wordcontainer = [] ; 
    for(let i = 0 ; i < word.length ; i ++){
      wordcontainer.push( <div className = {i == currentIndex[1] && idx == currentIndex[0] ? CellState[idx][i] + " cursor" : CellState[idx][i] } key = {i}><pre>{word[i]}</pre></div>)
    }
    return (<div className = "word" key = {idx}>{wordcontainer}</div>) 
  })

  useEffect(() => {

    function handleKeyDown(event) {
      let i = currentIndex[0] , j = currentIndex[1] ;
      // if( i === typingcontent.length - 1 && j === typingcontent[i].length - 1 ) return ; 
      // console.log( i , j , event.key) ; 
      if (event.key === typingcontent[currentIndex[0]][currentIndex[1]]) {
        // console.log( i , j ) ; 
        // console.log(typingcontent[i].length) ; 

        let newCellState = [...CellState];
        newCellState[i][j] = "letter correct" ; 
        
        if( typingcontent[i].length === j + 1 ){ i = i + 1 ; j = 0 ; }
        else j++ ;  
        setCurrentIndex([i,j]) ;
        setCellState(newCellState) ; 
        // console.log("typed correctly") ; 
      }
      else if( event.key === 'Backspace'){
        
        if( j > 0 ) j -=1; 
        else if ( j == 0 && i != 0 ) {i -= 1 ;  j = typingcontent[i].length - 1 ;}
     
        let newCellState = [...CellState];
        newCellState[i][j] = "letter untyped" ;

        setCurrentIndex([i,j]) ;
        setCellState(CellState) ; 
      }
      else if( isValidKey(event.key) ){
        let newCellState = [...CellState];
        newCellState[i][j] = "letter wrong" ;

        if( typingcontent[i].length === j + 1 ){ i = i + 1 ; j = 0 ; }
        else j++ ; 
         
        setCurrentIndex([i,j]) ;
        setCellState(CellState)  ;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex , CellState]);

  return (
  <div className = "TypingAreaContainer">
    <h1>ZoroType</h1>
    <div className="TypingArea">
      {Type}  
    </div>
    <button className = "startButton"> Start </button>
  </div>
   
  )
}

export default App
