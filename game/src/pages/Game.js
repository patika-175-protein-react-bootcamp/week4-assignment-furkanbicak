import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardIcon from '../constans/icons/boardIcon';
import CircleIcon from '../constans/icons/circleIcon';
import '../css/Game.css';

function Game() {
  const [options, setOptions] = useState([]);
  const [board, setboard] = useState([]);
  const [score, setScore] = useState(0);

  const [truAnswer, setTrueAnswer] = useState(0);       //Dogru soru sayısını tutar.
  const [answer, setAnswer] = useState(0);              //Kacıncı sorudasın?

  const [currentProblem, setCurrentProblem] = useState({});

  const [data, setData] = useState([{
    totalPoint:'',
    totalQuestions:'',
    correctAnswers:''
  }])

  const [questionList, setQuestionList] = useState([
    
    {
      firstNumber:'', 
      secondNumber:'', 
      options:''
    }
  
  ]);

  let key = [];
  let curent = {};
  let firstNumber;
  let secondNumber;
  let choie1;
  let choie2;
  let choieTrue;
  

  let navigate = useNavigate();
  const routeChange = () =>{ 
    document.body.style = 'background-color: dark;'
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
    let one = randomNumber(11);
    let two = randomNumber(11);

    setboard({numberOne:one, numberTwo: two});
    curent = {numberOne:one, numberTwo: two};

  }
  


  function gameStart() {
    generateProblem();

    firstNumber = curent.numberOne;
    secondNumber = curent.numberTwo;

   
    choie1 = (firstNumber-1) * secondNumber;
    choie2 = firstNumber * (secondNumber+1);
    choieTrue = firstNumber * secondNumber;
    
    key.push(choie1,choie2,choieTrue);

    setQuestionList(prevState => (
      [...prevState, {firstNumber: firstNumber, secondNumber: secondNumber, options: choieTrue}]
    ));

    console.log("List1",questionList[0].options)
    setOptions(shuffle(key))

  }
   
  function hübele (index, item){ 

    // LocalStorage da toplam çözülen soru sayısı kaydedildi.
    var totalQuestions = localStorage.getItem('totalQuestions');
    if (totalQuestions === null) {
      totalQuestions = 1;
    } else {
      totalQuestions++;
    }
    console.log(totalQuestions);
    localStorage.setItem("totalQuestions", totalQuestions);


    if(answer === 9){
      routeChange();
    }
    setAnswer((prev) => prev + 1);

    if(item === questionList[answer+1].options){

      // LocalStorage da toplam çözülen doğru soru sayısı kaydedildi.
      var correctAnswers = localStorage.getItem('correctAnswers');
      if (correctAnswers === null) {
        correctAnswers = 1;
      } else {
        correctAnswers++;
      }
      console.log(correctAnswers);
      localStorage.setItem("correctAnswers", correctAnswers);

      setTrueAnswer((prev) => prev + 1);
     
      let newScore = Math.round(Math.sqrt(questionList[answer+1].options));         //Dogru sorudan alınan puanı hesaplama.
      setScore( score + newScore);


      document.body.style = 'background-color: green;'
      gameStart();
    }else{
      document.body.style = 'background-color: red;'
      gameStart();
    }
  }

  useEffect(() => {
    gameStart()
  },[]);

  useEffect(() => {
    setTimeout(() => {
      document.body.style = 'background-color: dark;'
    }, 1000);
  },[answer]);

  return (
    <>
        <div>Game</div>
        <a href='/finish'>Finish</a>
        
    <div className="navbar">
        <div className="navbar_title">
            <div>{`Score: ${score}`}</div>
            <div>Tour: 2</div>
            <div>{`Questions: ${truAnswer}/${answer}`}</div>
        </div>
    </div>

    <div className='container'>
    
        <div className='container-board'>
            <BoardIcon />
            <div className='container-board-question title'>
              {`${board.numberOne} x ${board.numberTwo}`}
            </div>
        </div>

        <div className='container-selection'>
            {
              options?.map((item, index) => (
                <div className={`container-selection_${index + 1}`}>
                    <button 
                          onClick     =     {() => hübele(index, item)}
                          className   =     'routerButton' 
                          key         =     {index}  
                      >
                      <p className="container-selection-text title">{`${item}`}</p>
                      <CircleIcon />
                    </button>
                  </div> 
                ))
            }               
        </div> 
      </div> 
    </>
  );
}

export default Game;

/*
{
  {firstNumber: 6, secondNumber: 10, options: 60, answer: false}
  {firstNumber: 6, secondNumber: 10, options: 60, answer: false}
  {firstNumber: 6, secondNumber: 10, options: 60, answer: false}
}

*/