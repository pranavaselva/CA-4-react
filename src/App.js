import "./App.css";
import questions from "./questions";
import Result from "./components/Result.jsx";
import QuestionBox from "./components/QuestionBox";
import Main from './components/Main'
import { Routes, Route } from 'react-router-dom'



function App() {

  return (
    <div>
      <Routes> 
      
       <Route path='/' element={<Main/>}/>
      <Route path="/Result" element={<Result/>}/>
      </Routes>
      

    </div>
  );
}

export default App;