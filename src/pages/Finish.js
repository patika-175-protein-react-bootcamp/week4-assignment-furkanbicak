import { useNavigate } from 'react-router-dom';
import ButtonRestartIcon from '../constans/icons/buttonRestartIcon';
import LineIcon from '../constans/icons/lineIcon';
import TrueIcon from '../constans/icons/trueIcon';
import FalseIcon from '../constans/icons/falseIcon';
import '../css/Finish.css';
import { useState } from 'react';

function Finish() {

  let navigate = useNavigate();
  const routeChange = () =>{ 
    navigate(`/`);
  };

  let totalQuestions = localStorage.getItem('totalQuestions');
  let correctAnswers = localStorage.getItem('correctAnswers');
  let totalPoint = localStorage.getItem('totalPoint');
  

  let answers = JSON.parse(localStorage.getItem('answers'));
  
  useState(() => {
    document.body.style = 'background-color: dark;'
  },[])
  


  return (
    <>
        <div className="container">
        <div className="content-final"> 

            <div className="header title">
                <p>Final</p>
                <LineIcon width="228"/>
            </div>

            <div className="total-point title">
                <p>
                    {
                        `Total Point: ${totalPoint}`
                    }
                </p>
            </div>
    
            <div className="total-questions title">
                <p>
                    {`Total Questions: ${totalQuestions}`}
                </p>
            </div>
    
            <div className="correct-answers title">
                <p>
                    {`Correct Answers: ${correctAnswers}`}
                </p>
            </div>

            <div className='button'>
              <button onClick={routeChange} className='routerButton'>
                <ButtonRestartIcon />
              </button>
            </div>

        </div>

        <div className="content-question">
           <div className="header title">
                <p>All Question</p>
                <LineIcon width="350" />
            </div>

            <div className="point">
                {
                    answers?.map((item, index) => (
                        index === 0 ? null : 
                        (
                            <div key={index} className="title_question">

                                {answers[index].firstNumber} X {answers[index].secondNumber} = {answers[index].options}

                                &nbsp; &nbsp; 

                                {
                                    answers[index].deneme === "true" 
                                        ?   <TrueIcon /> 
                                        :   <FalseIcon /> 
                                } 


                            </div>
                        )
                       
                        
                    ))
                }
                
            </div>
        </div>
    </div>
    </>
  );
}

export default Finish;
