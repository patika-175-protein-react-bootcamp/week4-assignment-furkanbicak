import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardIcon from '../constans/icons/boardIcon';
import CircleIcon from '../constans/icons/circleIcon';
import { useTour } from '../contexts/tour';
import '../css/Game.css';

function Game() {
  const [options, setOptions] = useState([]);
  const [board, setboard] = useState([]);                       // !Tahdaki rakamları randomNumber() dan alıp basar.
  const [score, setScore] = useState(0);                        // !Toplam skor puanını tutar.

  const [truAnswer, setTrueAnswer] = useState(0);               // !Dogru soru sayısını tutar.
  const [answer, setAnswer] = useState(0);                      // !Kacıncı sorudasın?


  const [questionList, setQuestionList] = useState([            // ?Finish sayfasına tasımak icin obje ile tuttum.
    
    {
      firstNumber:'', 
      secondNumber:'', 
      options:''
    }
  
  ]); 

  const {tour} = useTour();

  let navigate = useNavigate();
  const routeChange = () =>{ 
    navigate(`/finish`);
  };

  //? Dizi karıstırma. (Sıkları karıstırmak icin)
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
      return a;
  }  

  //? Random sayı üretme.
  function randomNumber(max) {
    return (Math.floor(Math.random() * max ) + 1 );
  }

  function generateProblem() {
    let one = randomNumber(11);
    let two = randomNumber(11);

    setboard({numberOne:one, numberTwo: two});

    return {numberOne:one, numberTwo: two};
  }


  //? Secenekleri Olusturma.
  function generateChoice(){

    let generateNumber = generateProblem();

    let firstNumber = generateNumber.numberOne;
    let secondNumber = generateNumber.numberTwo;

   
    let choice1 = (firstNumber-1) * secondNumber;
    let choice2 = firstNumber * (secondNumber+1);
    let choiceTrue = firstNumber * secondNumber;

    return {firstNumber, secondNumber, choice1, choice2, choiceTrue}
  
  }
  
  //? Oyunun Baslat ve local deki islemleri baslat.
  function gameStart() {

    let tmp = generateChoice();
  
    if(questionList.length > 0){
      setQuestionList(prevState => (
        [...prevState, {firstNumber: tmp.firstNumber, secondNumber: tmp.secondNumber, options: tmp.choiceTrue}]
      ));

        localStorage.setItem("answers", JSON.stringify(questionList) )
    }else{
        setQuestionList( {firstNumber: tmp.firstNumber, secondNumber: tmp.secondNumber, options: tmp.choiceTrue})
        localStorage.setItem(JSON.stringify(questionList))
    }
    
    setOptions(shuffle([tmp.choice1, tmp.choice2, tmp.choiceTrue]))
  }
   
  function nextQuestion (index, item){ 
    
    // !LocalStorage da toplam çözülen soru sayısı kaydedildi.
    let totalQuestions = localStorage.getItem('totalQuestions');
    if (totalQuestions === null) {
      totalQuestions = 1;
    } else {
      totalQuestions++;
    }
  
    localStorage.setItem("totalQuestions", totalQuestions);

    // ?Soru sayısı 10 olunca sayfa degis.
    if(answer === 9){
      routeChange();
    }
    setAnswer((prev) => prev + 1);

    if(item === questionList[answer+1].options) {
      questionList[answer+1].deneme = 'true';
      
      // !LocalStorage da toplam cozulen dogru soru sayısı kaydedildi.
      let correctAnswers = localStorage.getItem('correctAnswers');
      if (correctAnswers === null) {
        correctAnswers = 1;
      } else {
        correctAnswers++;
      }
      localStorage.setItem("correctAnswers", correctAnswers);

      setTrueAnswer((prev) => prev + 1);
     
      // !Dogru sorudan alınan puanı hesaplama ve score a kaydetme.
      let newScore = Math.round(Math.sqrt(questionList[answer+1].options));       
    
      setScore( (prev) => prev + newScore);


      var totalPoint = localStorage.getItem('totalPoint');
      if (totalPoint === null) {
        totalPoint = score;
      } else {
        totalPoint =+ score;
      }
      localStorage.setItem("totalPoint", totalPoint);


      document.body.style = 'background-color: #00BF63;'
      

    }else{
      questionList[answer + 1].deneme = 'false';
      document.body.style = 'background-color: #FA0000;'
     
    }
  }
  
  useEffect(() => {
    gameStart()
  },[])

  useEffect(() => {
    if(answer > 0 ){
      setTimeout(() => {
        document.body.style = 'background-color: dark;'
        gameStart()
      }, 3000);
    }
    
  },[answer]);

  return (
    <>  
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
                          onClick     =     {() => nextQuestion(index, item)}
                          className   =     'routerButton' 
                          key         =     {index} 
                          id          =     'votebutton'
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

