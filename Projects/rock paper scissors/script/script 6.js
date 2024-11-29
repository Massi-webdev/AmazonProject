
let score = JSON.parse(localStorage.getItem('score')) || {  //same outcome
  wins: 0,
  losses: 0,
  ties: 0
}

showResult()

let results = ''

//generate bot move
function computerMove(){
  let botPlay = Math.random()
  if (botPlay>=0 && botPlay<0.25){
    botPlay='scissors'
  } else if (botPlay>0.25 && botPlay<0.5){
    botPlay='paper'
  } else if (botPlay>0.5 && botPlay<0.75){
    botPlay='rock'
  } else {
    botPlay='fire'
  }
  return botPlay
}



function playGame(userMove) {

  const botPlay = computerMove()

  document.querySelector('.js-show-plays').innerHTML= `<img src="images/${userMove}.png"> vs <img src="images/${botPlay}.png">.`
  
  //compare user and bot results
  if (userMove === botPlay){
    result = 'Draw'
  } 
  
    else if (userMove === 'scissors'){
          if (botPlay=== 'rock') {
          result = 'You lost'
        } 
          else if (botPlay=== 'paper') {
          result = 'You win'
        } 
          else if (botPlay=== 'fire') {
          result = 'You loose'
        } 
    }


    else if (userMove === 'rock'){
          if (botPlay=== 'paper') {
          result = 'You lost'
        } 
          else if (botPlay=== 'scissors') {
          result = 'You win'
        } 
          else if (botPlay=== 'fire') {
          result = 'You win'
        } 
  } 

    else if (userMove === 'paper'){
          if (botPlay=== 'scissors') {
          result = 'You lost'
        } 
          else if (botPlay=== 'rock') {
          result = 'You win'
        } 
          else if (botPlay=== 'fire') {
          result = 'You lost'
        } 
  }

    else if (userMove === 'fire'){
          if (botPlay=== 'paper') {
          result = 'You win'
        } 
          else if (botPlay=== 'rock') {
          result = 'You lost'
        } 
          else if (botPlay=== 'scissors'){
          result = 'You win'
        }
  }     



  // count wins, losses , ties
  if (result === 'You win'){
    score.wins++
  } else if (result === 'You lost'){
    score.losses++
  } else if (result === 'Draw'){
    score.ties++
  }
  
  document.querySelector('.js-show-your-result').innerText=result

  showResult()
  localStorage.setItem('score', JSON.stringify(score));    
}


function showResult(){
  document.querySelector('.js-results').innerHTML= `Wins ; ${score.wins}, Losses ; ${score.losses}, Tries ; ${score.ties}, `

}


    function computerMove(){
  let botPlay = Math.random()
  if (botPlay>=0 && botPlay<0.25){
    botPlay='scissors'
  } else if (botPlay>0.25 && botPlay<0.5){
    botPlay='paper'
  } else if (botPlay>0.5 && botPlay<0.75){
    botPlay='rock'
  } else {
    botPlay='fire'
  }
  return botPlay
}



 //////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Auto play function /////////////////

    let autoPlayIntervalID;
    

//const autoPlay = () => { //this the regular way but lets use the other(easy to read + hoisting)
    function autoPlay(){
      const playerMove = computerMove();
      autoPlayIntervalID = setInterval(() => {
        playGame(playerMove);
        console.log('AutoPlay ON')
      }, 1500);
    }


  // create function for autoPlay html change
    function autoPlayHTML(){
      if (document.querySelector('.js-auto-play').innerHTML==='Start Auto Play'){
        document.querySelector('.js-auto-play').innerHTML='Stop Auto Play';
        document.querySelector('.js-auto-play').classList.add('js-stop-auto-play');
        autoPlay();
      } 
  
      else{
        document.querySelector('.js-auto-play').innerHTML='Start Auto Play';
        document.querySelector('.js-auto-play').classList.remove('js-stop-auto-play');
        
        clearInterval(autoPlayIntervalID);
        console.log('AutoPlay OFF')
      }  
    }


   // add event listener to auto play + setintervals
    document.querySelector('.js-auto-play').addEventListener('click', ()=>{
      autoPlayHTML()  
    })
  
 //////////////////////////////////////////////////////////////////////////////////////////////////

    //Addeventlinsters to buttons ////////////
    document.querySelector('.js-button-rock').addEventListener('click', ()=>{
      playGame('rock');
    });
    
    document.querySelector('.js-button-paper').addEventListener('click', ()=>{
      playGame('paper');
    });
    
    document.querySelector('.js-button-scissors').addEventListener('click', ()=>{
      playGame('scissors');
    });
    
    document.querySelector('.js-button-fire').addEventListener('click', ()=>{
      playGame('fire');
    });
    
    ///////////////////////////////////////////////////RESET BUTTON ////////////////////////////////////////////////
    // add event listener to reset ////////////////////////////////////////////////////////////////////////////////
    const resetElement = document.querySelector('.js-reset-score')
    resetElement.addEventListener('click', ()=>{

    });

    ///////////////// RESET DIV JS and event listeners ///////////////////////////////////////////////////////////
    const yesNoDivElement = document.querySelector('.js-yes-no-reset-off');

    resetElement.addEventListener('click', ()=>{
      if (!yesNoDivElement.classList.contains('js-yes-no-reset-on')){
        yesNoDivElement.classList.add('js-yes-no-reset-on');
      } else{
        yesNoDivElement.classList.remove('js-yes-no-reset-on');
      }
    });


    /// YES and NO event listeners //////
    document.querySelector('.js-yes-button').addEventListener('click', ()=>{
      score = {  
        wins: 0,
        losses: 0,
        ties: 0
      };
      localStorage.removeItem('score')
      showResult();
      yesNoDivElement.classList.remove('js-yes-no-reset-on');
    })

    document.querySelector('.js-no-button').addEventListener('click', ()=>{
      yesNoDivElement.classList.remove('js-yes-no-reset-on');
    })


    // add event listener on body to auto play and reset;
    document.body.addEventListener('keydown', (event)=>{
      if (event.key==='Backspace'){
        if (!yesNoDivElement.classList.contains('js-yes-no-reset-on')){
          yesNoDivElement.classList.add('js-yes-no-reset-on');
        } else{
          yesNoDivElement.classList.remove('js-yes-no-reset-on');
        }
      }
      else if (event.key==='a' || event.key==='Enter' || event.key==='s'){
        autoPlayHTML();
      }
      else if (event.key==='r'){
        playGame('rock');
      }
      else if (event.key==='s'){
        playGame('scissors');
      }
      else if (event.key==='p'){
        playGame('paper');
      }
      else if (event.key==='f'){
        playGame('fire');
      }
    })
  




