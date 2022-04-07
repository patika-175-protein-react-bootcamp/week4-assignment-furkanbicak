import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardIcon from '../constans/icons/boardIcon';
import CircleIcon from '../constans/icons/circleIcon';
import '../css/Game.css';

function Game() {
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(generateProblem());

  const [questionList, setQuestionList] = useState({
      firstNumber: 1, 
      secondNumber: 1, 
      options: 1,
      answer: false
  });

  let key = [];
  let choie1;
  let choie2;
  let choieTrue;

  let navigate = useNavigate();
  const routeChange = () =>{ 
    navigate(`/finish`);
  };

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
      return a;
  }  

  function randomNumber(max) {
    return (Math.floor(Math.random() * max ) + 1 );
  }

  function generateProblem() {
    return {
      numberOne: randomNumber(11),
      numberTwo: randomNumber(11),
    };
  }

  function gameStart() {
    let firstNumber = currentProblem.numberOne;
    let secondNumber = currentProblem.numberTwo;

    console.log(firstNumber)
    console.log(secondNumber)
   
    choie1 = (firstNumber-1) * secondNumber;
    choie2 = firstNumber * (secondNumber+1);
    choieTrue = firstNumber * secondNumber;

    console.log('choie1', choie1)
    console.log('choie2', choie2)
    console.log('choieTrue', choieTrue)
    
    key.push(choie1,choie2,choieTrue);
    console.log(key)

    setQuestionList({...questionList, firstNumber: firstNumber, secondNumber: secondNumber, options: choieTrue, answer: false})
    setOptions(shuffle(key))

  }

  console.log("Secenekler", options)
  console.log(questionList)
   
  function hübele (param, item){ 

    if(item == questionList.options){
      let newScore = Math.round(Math.sqrt(questionList.options));
      setScore( score + newScore);
      document.body.style = 'background-color: green;'
      gameStart();
    }else{
      document.body.style = 'background-color: red;'
      gameStart();
    }
    // setQuestionList({...questionList, answer:true})
    // console.log(questionList)
  }

  useEffect(() => {
    gameStart()

  },[]);


  return (
    <>
        <div>Game</div>
        <a href='/finish'>Finish</a>
        
        <div className="navbar">
        <div className="navbar_title">
            <div>{`${score}`}</div>
            <div>Tour: 2</div>
            <div>Questions: 6/7</div>
        </div>
    </div>

    <div className='container'>
    
        <div className='container-board'>
            <BoardIcon />
            <div className='container-board-question title'>
              {`${currentProblem.numberOne} x ${currentProblem.numberTwo}`}
            </div>
        </div>

        <div className='container-selection'>
            <div className='container-selection_1'>

              {
                options?.map((item, index) => (
                  <button 
                        onClick     =     {() => hübele(index, item)}
                        className   =     'routerButton' 
                        key         =     {index}  
                    >
                    <p className="container-selection-text title">{`${item}`}</p>
                    <CircleIcon />

                  </button>
                ))
              }
              

              {/* <button onClick={hübele(key[0])} >
                <p className="container-selection-text title">{`${key[0]}`}</p>
                  <CircleIcon />
              </button>
               
            </div>

            <div className="container-selection_2">
              <button onClick={hübele(key[1])}>
              <p className="container-selection-text title">{`${key[1]}`}</p>
                <CircleIcon />
              </button>
               
            </div>

            <div className="container-selection_3">
              <button onClick={hübele(key[2])}>
              <p className="container-selection-text title">{`${key[2]}`}</p>
                <CircleIcon />
              </button> */}
              
            </div>
                
        </div>
        
    </div> 
    </>
  );
}

export default Game;
