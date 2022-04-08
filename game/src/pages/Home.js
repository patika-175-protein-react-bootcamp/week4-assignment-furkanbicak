import ButtonStartIcon from '../constans/icons/buttonStartIcon';
import LineIcon from '../constans/icons/lineIcon';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import '../css/Home.css';
import { useTour } from '../contexts/tour';


function Home() {

  const {tour, counterTour, setTour} = useTour();

  let navigate = useNavigate();
  const routeChange = () =>{ 
    setTour(prev => prev+1)
    navigate(`game`);
  };

  let totalQuestions = localStorage.getItem('totalQuestions');
  let correctAnswers = localStorage.getItem('correctAnswers');

  return (
    <>
        <div>Home</div>
        <a href='/game'>Game</a>
        

        <div className='container'>

        <div className='container-main'>

            <div className='title'>
                <p>Mathematics Game</p>
            </div>
            
            <div class="header-line">
              <LineIcon />
            </div>
    
            
            <div className='total-point title2'>
                <p>Total Point: 129</p>
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
                <ButtonStartIcon />
              </button>
            </div>

        </div>
   
    </div>
    </>
  );
}

export default Home;
