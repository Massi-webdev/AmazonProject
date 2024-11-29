
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

   // add event listener to auto play + setintervals
    document.querySelector('.js-auto-play').addEventListener('click', ()=>{
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
    })
  

    
  