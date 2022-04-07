import { useNavigate } from 'react-router-dom';
import ButtonRestartIcon from '../constans/icons/buttonRestartIcon';
import LineIcon from '../constans/icons/lineIcon';
import TrueIcon from '../constans/icons/trueIcon';
import FalseIcon from '../constans/icons/falseIcon';
import '../css/Finish.css';

function Finish() {

  let navigate = useNavigate();
  const routeChange = () =>{ 
    navigate(`/`);
  };

  return (
    <>
        <div>Finish</div> 
        <a href='/'>Home</a>

        <div class="container">
        <div class="content-final"> 

            <div class="header title">
                <p>Final</p>
                <LineIcon />
            </div>

            <div class="total-point title">
                <p>Total Point: 129</p>
            </div>
    
            <div class="total-questions title">
                <p>Total Questions: 10</p>
            </div>
    
            <div class="correct-answers title">
                <p>Correct Answers: 8</p>
            </div>

            <div className='button'>
              <button onClick={routeChange} className='routerButton'>
                <ButtonRestartIcon />
              </button>
            </div>

        </div>

        <div class="content-question">
           <div class="header title">
                <p>All Question</p>
                <LineIcon />
            </div>

            <div class="point">
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />    
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <FalseIcon />    
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <FalseIcon />  
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <FalseIcon />  
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />  
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />   
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />  
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />   
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />      
                </div>
                <div class="title_question">
                    3 x 4 = 12
                    <TrueIcon />    
                </div>
                
            </div>
        </div>
    </div>
    </>
  );
}

export default Finish;
