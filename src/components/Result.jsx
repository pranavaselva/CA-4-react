import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";


function Result(){

    const [dark, setTheme] = useState(true)
    const [themeColor, setThemeColor] = useState('dark')
    const location = useLocation();

    // for changing the bgcolor and the innertext of the button
    useEffect(() => {
        if(dark){
            setThemeColor('light')
            document.body.style.backgroundColor = '#5e5b5c';
        } else{
            setThemeColor('dark')
            document.body.style.backgroundColor = 'white';
        }
    },[dark])

    const handleClick = () =>{
        setTheme(!dark);
    }

    const theme = useMemo(() =>{
        return{
           backgroundColor:dark?'#5e5b5c':'white'
        }
    }, [dark]) 

    //  for changing the color of the heading quiz
    const changeColor = useMemo( () => {
        return dark?'white':'black';
    }, [dark])


    // for restarting the game if the user want
    const restart = () => {
        window.location.href = '/'
    }

    // getting score as props from the Main page and setting default value for navigating straight to the result page
    const{ score = 0, correct = 0 } = location.state || {}

    return(
        <div>
            <div className="resultheading">
                <div>
                    <h2 style={{color:changeColor}}>Quiz</h2>
                </div>
                <div style={theme}>
                    <button className="themebtn" onClick={handleClick}>{themeColor}</button>
                </div>
            </div>
            <div className="container2">
                    <div className="result">Final Results</div>

                    <div className="score">
                        {correct} out of 5 correct - ({score}%)
                    </div>
                <div >
                    <button onClick={restart} className="restartbtn">Restart Game</button>
                </div>
            </div>        
        </div>
    )
}

export default Result;