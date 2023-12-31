import './ThemeSelector.css'
import { Themes } from './Themes';
import { useEffect, useState } from 'react';

function ThemeSelector(props){
    let storedTheme = localStorage.getItem("Theme");
    if( storedTheme === 'null' || storedTheme === null) storedTheme = "Zoro" ;
    if( Themes[storedTheme] === undefined ) storedTheme = "Zoro" ;
    const [ selectedTheme , setSelectedTheme ] = useState(storedTheme) ;
    //console.log("Stored THeme = ");
    //console.log(selectedTheme) ;
    useEffect(() => {
        localStorage.setItem("Theme" , selectedTheme)
    },[selectedTheme]);

    useEffect(() => {
        document.documentElement.style.setProperty("--zoro-primary", Themes[selectedTheme].primary_color);
        document.documentElement.style.setProperty("--zoro-correct", Themes[selectedTheme].correct_color);
        document.documentElement.style.setProperty("--zoro-wrong", Themes[selectedTheme].wrong_color);
        document.documentElement.style.setProperty("--zoro-untyped", Themes[selectedTheme].untyped_color);
    } , []) ;

    function handleClick(e){
        document.documentElement.style.setProperty("--zoro-primary", Themes[e.target.value].primary_color);
        document.documentElement.style.setProperty("--zoro-correct", Themes[e.target.value].correct_color);
        document.documentElement.style.setProperty("--zoro-wrong", Themes[e.target.value].wrong_color);
        document.documentElement.style.setProperty("--zoro-untyped", Themes[e.target.value].untyped_color);
        setSelectedTheme(e.target.value) ;
    }

    let ThemeButtons = [] ;
    for(let Theme  in Themes){
        ThemeButtons.push(
            <button className = {"ThemeSelectorButton " + (selectedTheme === Theme ? "selectedTheme" : " ")}
             value = {Theme}
             onClick = {(e) => handleClick(e)}
             style = { {
                color : Themes[Theme].primary_color,
                opacity : selectedTheme === Theme ? 1 : 0.7
            } }
             >
             {Theme}</button>
        )
    }
    return (
        <div id = "ThemeSelector" className = {props.isInvisible ? "invisible" : ""}  >
            {ThemeButtons}
        </div>
    )
}

export default ThemeSelector ;
