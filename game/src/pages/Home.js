import ButtonStartIcon from '../constans/icons/buttonStartIcon';
import LineIcon from '../constans/icons/lineIcon';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import '../css/Home.css';


function Home() {

  let navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `game`; 
    navigate(path);
  };

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
        
            <div className='total-questions title2'>
                <p>Total Questions: 40</p>
            </div>
        
            <div className='correct-answers title2'>
                <p>Correct Answers: 32</p>
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
