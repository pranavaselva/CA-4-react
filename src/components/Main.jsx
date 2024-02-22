import './Main.css';
import questions from "../questions";
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Main(){

    const [dark, setTheme] = useState(true)
    const [themeColor, setThemeColor] = useState('dark')
    const [highlighted, setHighLight] = useState(false)
    const [removehigh, setRemovehigh] = useState(false)
    const [curQuestion, setCurQuestion] = useState(0)
    const [curOption, setCurOption] = useState(0)
    const [scoreBoard, setScoreBoard] = useState({
        score:0,
        correct:0,
    })
    const goToResult = useNavigate();
    

    useEffect(() => {
        if(dark){
            // for changing the text and bgcolor according to the text
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


    //for  changing the color of the quiz heading
    const changeColor = useMemo( () => {
        return dark?'white':'black';
    }, [dark])

    // for highlighting the question
    const highlight = () =>{
        setHighLight(true)
        setRemovehigh(false)
    }

    // for removing the highlight
    const removehighlight = () => {
        setHighLight(false)
        setRemovehigh(true)
    }    
    
    // click event function
    const handleChange = (event) => {
        // getting the user's answer when clicked
        const optionClicked = event.target.innerHTML
        // console.log(optionClicked)


        // finding the correct option from the given options
        const correctOption = questions[curQuestion].options.find(option => option.isCorrect)

        // increasing the score and no of correct questions
        setScoreBoard(prevScoreBoard => {
            const newScore = optionClicked === correctOption.text ? prevScoreBoard.score + 20 : prevScoreBoard.score;
            const newCorrect = optionClicked === correctOption.text ? prevScoreBoard.correct + 1 : prevScoreBoard.correct;
            return { score: newScore, correct: newCorrect };
        });
        
        // changing to next question after clicking
        if(curQuestion < questions.length-1){
            setCurQuestion(curQuestion+1)
            setCurOption(curOption+1)
        } else{
            // if every question are over moving to the result page

            goToResult('/Result', {state: {score: scoreBoard.score+20, correct : scoreBoard.correct+1}})
            
        }
      
        
        // console.log(scoreBoard.score)
        // console.log(scoreBoard.correct)
    }
    
    // console.log(questions)
    return(
        <div>
            <div className="headings">
                <div className="left">
                    < h2 style={{color:changeColor}}>Quiz</h2>               
                </div>
                <div className="theme">
                    <button className='colorbutton' onClick={handleClick}>{themeColor}</button>
                </div>
            </div>
            <div className='container'>
                <div className='container2'>
            <div className="ques-num">
                <p>Question {curQuestion+1} out of {questions.length} </p>
            </div>
            <div className="question" style={{color:highlighted ? "red" : removehigh ? "blue": "blue"}}>
                <p>{questions[curQuestion].text}</p>
            </div>
            <div className="options">
                <div className="option">
                    <p onClick={(e)=> handleChange(e)}>{questions[curOption].options[0].text}</p>
                </div>
                <div className="option ">
                    <p  onClick={(e)=> handleChange(e)}>{questions[curOption].options[1].text}</p>
                </div>
                <div className="option">
                    <p  onClick={(e)=> handleChange(e)}>{questions[curOption].options[2].text}</p>
                </div>
                <div className="option">
                    <p  onClick={(e)=> handleChange(e)}>{questions[curOption].options[3].text}</p>
                </div>
            </div>

            <div className="buttons">
                <div>
                    <button onClick={highlight}  className="button">Highlight</button>
                </div>
                <div >
                    <button onClick={removehighlight}  className="button" >Remove Highlight</button>
                </div>
              </div>
            </div>
        </div>
    </div>
    )
    
}


export default Main;