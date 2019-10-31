/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore,activePlayer,gamePlaying,scoreset;
// if(document.getElementById('score').value !== null){
// scoreset = document.getElementById('score').value;

//console.log(setscore);

init();

document.querySelector('.btn-roll').addEventListener('click', function btn(){
if(gamePlaying){
        //1- Random Number
    
    var dice = Math.floor(Math.random() *6)+1;

    var dice_02 = Math.floor(Math.random() *6)+1;
       // var  dice = 6;
        //Displat the result
        
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display='block';
        diceDOM.src = 'dice-'+dice+'.png';

        var diceDOM_02 = document.querySelector('.dice_02');
        diceDOM_02.style.display='block';
        diceDOM_02.src = 'dice-'+dice_02+'.png';
    
        //Update the round score IF the rolled number was NOt a 1
        if(dice!==1 || dice_02!==1){ //!== does not do type coersion
           
            // //add Score
            roundScore+=dice+dice_02;
            document.querySelector('#current-'+activePlayer).textContent=roundScore;
        }else {
                    //Next Player
                    nextPlayer(); 
        }      
           
    }
        
    });

    document.querySelector('.btn-hold').addEventListener('click',function(){
        if(gamePlaying){
            // Add Current score to global scores
            scores[activePlayer] += roundScore;

        //Updat the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input =document.querySelector('.final-score').value;

        //unddefined,0,null or "
        if(input){
            var winningscore = input;
        }else{
            winningscore=100;
        }
        console.log(input);
         //Check if player won the game
         if(scores[activePlayer]>=winningscore){
             document.querySelector('#name-'+activePlayer).textContent='Winner!!';
             document.querySelector('.dice').style.display='none';
             document.querySelector('.dice_02').style.display='none';

             document.querySelector('.player-' + activePlayer+'-panel').classList.add('winner');
             document.querySelector('.player-' + activePlayer+'-panel').classList.remove('active');
            gamePlaying=false;
            // document.querySelector('.dice').src='nanc.png';
            // document.querySelector('.dice').style.display='block';
         
       }else{
        //Next Player
        nextPlayer();
       }
        }
    });

    function nextPlayer(){
        //Next Player
        activePlayer === 0 ? activePlayer =1 : activePlayer =0 ;
        roundScore=0;
        //Set the current score text to  0
        document.getElementById('current-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        //Change the active players

       document.querySelector('.player-1-panel').classList.toggle('active');
       document.querySelector('.player-0-panel').classList.toggle('active');
            
       // Set the dice none again
       document.querySelector('.dice').style.display='none';
       document.querySelector('.dice_02').style.display='none';

    }

    document.querySelector('.btn-new').addEventListener('click',init);

    function init(){
        gamePlaying=true;
        scores=[0,0];
        activePlayer=0;
        roundScore=0;
        document.querySelector('.dice').style.display = 'none'; //Dice is gone 
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('name-0').textContent='Player 1';
        document.getElementById('name-1').textContent='Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');



    }
//dice = Math.floor(Math.random() * 6) +1;

//document.querySelector('#current-'+activePlayer).textContent = dice;// we have selected the id  of score 0 from html

//document.querySelector('#current-'+ activePlayer).innerHTML = '<em>' + dice + '</em>'; //we cant use html in textContent