buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;

$(".btn").click(function () {
    var name = this.id;
    flash(name);
    var useChosenColor = this.id;
    userClickedPattern.push(useChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern =[];
  level++;
  $("h1").text(`Level ${level}`);
  var randNum = Math.floor(Math.random() * 4);
  var randChosenColor = buttonColors[randNum];
  gamePattern.push(randChosenColor);
  console.log(randChosenColor);
  $("#" + randChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}


$(document).keypress(function () {
  if (level === 0) {
    nextSequence();
  }
});

function sound(name) {
  var aud = new Audio(`sounds/${name}.mp3`);
  aud.play();
}

function flash(id) {
  
  sound(id);
  $("#" + id).addClass("pressed");
  setTimeout(function () {
    $("#" + id).removeClass("pressed");
  }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern=[];
    $('h1').text("Press A key to start");
}





function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();

      $('body').addClass('game-over');
      setTimeout(function(){
          $('body').removeClass('game-over')
      },200);

      startOver();

    }

    

}