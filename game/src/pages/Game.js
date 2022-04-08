import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardIcon from '../constans/icons/boardIcon';
import CircleIcon from '../constans/icons/circleIcon';
import { useTour } from '../contexts/tour';
import '../css/Game.css';

function Game() {
  const [options, setOptions] = useState([]);
  const [board, setboard] = useState([]);                       // !Tahdaki rakamları randomNumber() dan alıp basar.
  const [score, setScore] = useState(0);                

  const [truAnswer, setTrueAnswer] = useState(0);               // !Dogru soru sayısını tutar.
  const [answer, setAnswer] = useState(0);                      // !Kacıncı sorudasın?

  const [currentProblem, setCurrentProblem] = useState({});

  const [questionList, setQuestionList] = useState([            // ?Finish sayfasına tasımak icin obje ile tuttum.
    
    {
      firstNumber:'', 
      secondNumber:'', 
      options:''
    }
  
  ]);

  const {tour, counterTour} = useTour();

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

    // setQuestionList(prevState => (
    //   [...prevState, {firstNumber: firstNumber, secondNumber: secondNumber, options: choieTrue}]
    // ));

    if(questionList.length > 0){
      setQuestionList(prevState => (
        [...prevState, {firstNumber: firstNumber, secondNumber: secondNumber, options: choieTrue}]
      ));

        localStorage.setItem("cevaplar", JSON.stringify(questionList) )
    }else{
        setQuestionList( {firstNumber: firstNumber, secondNumber: secondNumber, options: choieTrue})
        localStorage.setItem(JSON.stringify(questionList))
    }
    
  
    console.log("List1",questionList[0].options)
    setOptions(shuffle(key))
  }
   
  function hübele (index, item){ 
    
    // !LocalStorage da toplam çözülen soru sayısı kaydedildi.
    let totalQuestions = localStorage.getItem('totalQuestions');
    if (totalQuestions === null) {
      totalQuestions = 1;
    } else {
      totalQuestions++;
    }
    console.log(totalQuestions);
    localStorage.setItem("totalQuestions", totalQuestions);

    // ?Soru sayısı 10 olunca sayfa degis.
    if(answer === 9){
      routeChange();
    }
    setAnswer((prev) => prev + 1);

    if(item === questionList[answer+1].options){
      questionList[answer+1].deneme = 'true';
      
      // !LocalStorage da toplam cozulen dogru soru sayısı kaydedildi.
      let correctAnswers = localStorage.getItem('correctAnswers');
      if (correctAnswers === null) {
        correctAnswers = 1;
      } else {
        correctAnswers++;
      }
      console.log(correctAnswers);
      localStorage.setItem("correctAnswers", correctAnswers);

      setTrueAnswer((prev) => prev + 1);
     
      // !Dogru sorudan alınan puanı hesaplama ve score a kaydetme.
      let newScore = Math.round(Math.sqrt(questionList[answer+1].options));         
      setScore( score + newScore);

      console.log("Amaaa", score)

      var totalPoint = localStorage.getItem('totalPoint');
      if (totalPoint === null) {
        console.log("Yarraaaaaaa", score)
        totalPoint = score;
      } else {
        totalPoint =+ score;
      }
      console.log(totalPoint);
      localStorage.setItem("totalPoint", totalPoint);


      document.body.style = 'background-color: green;'
      gameStart();
    }else{
      questionList[answer+1].deneme = 'false';
      document.body.style = 'background-color: red;'
      gameStart();
    }
  }

  useEffect(() => {

  },[])

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
            <div>{`Tour: ${tour}`}</div>
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


/**
 * ! alşsdkalsdkasdmasd
 * ?aksdlşkadlkasd
 * TODO: asdlkadsklaksdl
 * * lasdklşaksdalksdlaksdl
 
 */

