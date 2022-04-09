import ButtonStartIcon from '../constans/icons/buttonStartIcon';
import LineIcon from '../constans/icons/lineIcon';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import '../css/Home.css';
import { useTour } from '../contexts/tour';
import { useEffect } from 'react';


function Home() {

  const {setTour} = useTour();

  let navigate = useNavigate();
  const routeChange = () =>{ 
    setTour(prev => prev+1)                                       //! Tur sayısını arttırdık.
    navigate(`game`);
  };

  let totalQuestions = localStorage.getItem('totalQuestions');
  let correctAnswers = localStorage.getItem('correctAnswers');
  let totalPoint = localStorage.getItem('totalPoint');

  
  useEffect(() => {
    if(totalQuestions === null && correctAnswers === null){
      localStorage.setItem("correctAnswers", 0);
      localStorage.setItem("totalQuestions", 0);
      localStorage.setItem("totalPoint", 0);
    }
  },[]);
  return (
    <>
        <div className='container'>

        <div className='container-main'>

            <div className='header title'>
                <p>Mathematics Game</p>
            </div>
            
            <div className="header-line">
              <LineIcon />
            </div>
    
            
            <div className='total-point title2'>
                <p>{`Total Point: ${totalPoint || 0}`}</p>
            </div>
        
            <div className="total-questions title">
                <p>
                    {`Total Questions: ${totalQuestions || 0}`}
                </p>
            </div>
    
            <div className="correct-answers title">
                <p>
                    {`Correct Answers: ${correctAnswers || 0}`}
                </p>
            </div>

            <div className='button'>
              <button onClick={routeChange} className='routerButton'>
                <ButtonStartIcon />
              </button>
            </div>

        </div>
   
    </div>
    </>
  );
}

export default Home;
