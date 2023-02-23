import React, {useState, useEffect} from 'react';

function Main() {
  const [userChoice, setUserChoice] = useState('rock');
  const [compChoice, setCompChoice] = useState('rock');
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [result, setResult] = useState('Lets see who wins the game!');
  const [turnResult, setTurnResult] = useState(null);
  const [gameover, setGameOver] = useState(false);

  const choices = ['rock', 'paper', 'scissors'];

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
  }

  const generateComputerChoice = () => {
    const random = choices[Math.floor(Math.random() * choices.length)];
    setCompChoice(random);
  }

  const reset = () => {
    window.location.reload();
  }

  useEffect(() => {
    const moves = userChoice + compChoice;
    if(userScore <= 9 || compScore <= 9) {
      if(moves === 'rockscissors' || moves ==='scissorspaper' || moves === 'paperrock') {
        const userUpdatedScore = userScore + 1;
        setUserScore(userUpdatedScore);
        setTurnResult(`You Won!!! as you chose ${userChoice} and computer chose ${compChoice}`);
        if(userScore === 9) {
          setResult('You won the game!!!');
          setGameOver(true);
        }
      }
      if(moves === 'paperscissors' || moves === 'rockpaper' || moves === 'scissorsrock') {
        const compUpdatedScore = compScore + 1;
        setCompScore(compUpdatedScore);
        setTurnResult(`You Lost!!! as you chose ${userChoice} and computer chose ${compChoice}`);
        if(compScore === 9) {
          setResult('Computer won the game!!!');
          setGameOver(true);
        }
      }
      if(moves === 'rockrock' || moves === 'paperpaper' || moves === 'scissorsscissors') {
        setTurnResult(`Nobody won as it was a draw!!! as you chose ${userChoice} and computer chose ${compChoice}`);
      }
    }
  }, [userChoice, compChoice]);

  return (
    <div className='main'>
        <div className='score'>
          <h1>User Score - {userScore}</h1>
          <h1>Computer Score - {compScore}</h1>
        </div>

        <div className='choice'>
          <div className='user-choice'>
            <img className='user-hand' src={`../images/${userChoice}.png`} width='200px' height='100px'></img>
          </div>
          <div className='comp-choice'>
            <img className='comp-hand' src={`../images/${compChoice}.png`} width='200px' height='100px'></img>
          </div>
        </div>

        <div className='button-div'>
          {choices.map((choice, index) => {
            return <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameover}>
              {choice}
            </button>
          })}
        </div>

        <div className='turn-result'>
          <h1>Turn Result - {turnResult}</h1>
        </div>

        <div className='final-result'>
          <h1>Final Result - {result}</h1>
        </div>

        <div className='restart-div'>
          {gameover && 
            <button className='reset' onClick={() => reset()}>Restart?</button>
          }
        </div>
    </div>
  );
}
export default Main;
