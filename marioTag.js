const square = document.querySelectorAll(".square");
var imageTag = document.querySelectorAll(".character");
console.log(square[0]);
const mole = document.querySelectorAll(".mole");
var timeLeft = document.querySelector("#time-left");
const grid = document.querySelector(".grid");
let score = document.querySelector("#score");

let result = 0;
var hitPosition;
let currentTime = timeLeft.textContent;

//array of images 
var characters = [
	"boo.png", "bowser.png", "daisy.png", "goomba.png", "luigi.png",
	"mario.png", "peach.png", "toad.png", "toadette.png", "yoshi.png"
];

//causes character movement when they appear--this didn't look great, so I'm not using it for now.
/*function bounce(character){
	character.style.left = 0;
	character.style.right = 0;
	character.style.top = 0;
	character.style.bottom = 0;

	function moveLeft(){
	   var left = parseInt(character.style.left);
	   var bottom = parseInt(character.style.bottom);
	   var top = parseInt(character.style.top);
	   var right = parseInt(character.style.right);

	   if (top + character.width > character.width+50) {
	     clearInterval(timerId);
	   } 
	   else {
	     character.style.top = top + Math.random()*7 + "px";
	     character.style.left = left + Math.random()*4 + "px";
	     character.style.bottom = bottom + Math.random()*3 + "px";
	   }  

		}

	let timerId = setInterval(moveLeft, 20);
}*/

let randomPosition = Math.floor(Math.random() * square.length);

function randomSquare(){
//remove the character from wherever he is at
	imageTag.forEach(image => {
		image.setAttribute("src", "transparent.png");
	})
	//remove previously given coin cursor to the old spot
	imageTag[randomPosition].style.cursor = "auto";

	//get a new random position to place the character in
	randomPosition = Math.floor(Math.random() * square.length);
	//get the src of a random character
	let randomCharacter = characters[Math.floor(Math.random() * characters.length)];
	let randomHeight =parseInt(imageTag[randomPosition].offsetHeight)*Math.random()+80;

	//check the height a few times to make sure it's within a good range
	for (i=0; i<3; i++){
		if (randomHeight < 120 || randomHeight>200){
			randomHeight =parseInt(imageTag[randomPosition].offsetHeight)*Math.random()+70;
			console.log("recalculated to : " + randomHeight);
		}
	}
	//gives the image a random size by adjusting the heigh
	imageTag[randomPosition].setAttribute("height", randomHeight);
	//set cursor to be a coin when on the character
	imageTag[randomPosition].style.cursor = "url('coin32.png'), pointer";
	console.log("new height is " +imageTag[randomPosition].height)
	// set the attribute of the image at the random position to the random character selected
	imageTag[randomPosition].setAttribute("src", randomCharacter);
	//move the character over
	//bounce(imageTag[randomPosition]);

	//assign the id of the random character placement for us to use later
	hitPosition = imageTag[randomPosition].id;
}

//"this" refers to the element attached to the event listener
function addPoint(){
	if(this.id === hitPosition){
		if(this.src.indexOf("boo.png") != -1){
       		result-=10;
    	}
    	else if (this.src.indexOf("bowser.png") != -1){
       		result-=50;
    	}
    	else if (this.src.indexOf("daisy.png") != -1){
       		result+=10;
       	}
       	else if (this.src.indexOf("goomba.png") != -1){
       		result-=10;
       	}
       	else if (this.src.indexOf("luigi.png") != -1){
       		result+=10;
       	}
       	else if (this.src.indexOf("mario.png") != -1){
       		result+=50;
       	}
       	else if (this.src.indexOf("peach.png") != -1){
       		result+=10;
       	}
       	else if (this.src.indexOf("toad.png") != -1){
       		result+=10;
       	}
       	else if (this.src.indexOf("toadette.png") != -1){
       		result+=10;
       	}
       	else if (this.src.indexOf("yoshi.png") != -1){
       		result+=10;
       	}
		
		score.textContent = result;
	}
}

imageTag.forEach(element =>
	element.addEventListener("mouseup", addPoint)
);

let scoreText = document.getElementById("scoreText");

function countDown(){
	currentTime--;
	timeLeft.textContent = currentTime;
	if (currentTime === 0){
		grid.style.backgroundSize = "625px 500px";

		if(result < 700){
			scoreText.textContent = "Your score is " + result + " You got a bronze trophy!"
			grid.style.backgroundImage = "url(bronze1.png)";
		}
		else if(result>700 && result<1500){
			scoreText.textContent = "Your score is " + result + " You got a Silver trophy!"
			grid.style.backgroundImage = "url(silver1.png)";
		}
		else{
			scoreText.textContent = "Your score is " + result + " Whoa! You got a Gold trophy!"
			grid.style.backgroundImage = "url(gold1.png)";

		}
	imageTag.forEach(image => {
		image.setAttribute("src", "transparent.png");
	})
	clearInterval(countTimer);
	clearInterval(characterTimer);
	}
}
//start the time counting down from 60 one second at a time
const startButtonEasy = document.getElementById("startEasy");
startButtonEasy.addEventListener("click", startEasy);

const startButtonMed = document.getElementById("startMed");
startButtonMed.addEventListener("click", startMed);

const startButtonHard = document.getElementById("startHard");
startButtonHard.addEventListener("click", startHard);

let countTimer = null;
let characterTimer = null;

function startEasy(){
	countTimer = setInterval(countDown, 1000);
	characterTimer = setInterval(randomSquare, 1500);

	//remove the other listeners, so they can't start two game modes
	startButtonEasy.removeEventListener("click", startEasy);
	startButtonMed.removeEventListener("click", startMed);
	startButtonHard.removeEventListener("click", startHard);


	//black out the other mode buttons
	startButtonMed.style.visibility = "hidden";
	startButtonHard.style.visibility = "hidden";
}

function startMed(){
	countTimer = setInterval(countDown, 1000);
	characterTimer = setInterval(randomSquare, 1300);
	
	//remove the other listeners, so they can't start two game modes
	startButtonEasy.removeEventListener("click", startEasy);
	startButtonMed.removeEventListener("click", startMed);
	startButtonHard.removeEventListener("click", startHard);


	//black out the other mode buttons
	startButtonEasy.style.visibility = "hidden";
	startButtonHard.style.visibility = "hidden";
}

function startHard(){
	countTimer = setInterval(countDown, 1000);
	characterTimer = setInterval(randomSquare, 1000);
	
	//remove the other listeners, so they can't start two game modes
	startButtonEasy.removeEventListener("click", startEasy);
	startButtonMed.removeEventListener("click", startMed);
	startButtonHard.removeEventListener("click", startHard);

	//black out the other mode buttons
	startButtonMed.style.visibility = "hidden";
	startButtonEasy.style.visibility = "hidden";
}

//reset the game
const reset = document.getElementById("reset");

function startOver(){
	clearInterval(countTimer);
	clearInterval(characterTimer);
	//remove the character from wherever he is at
	imageTag.forEach(image => {
		image.setAttribute("src", "transparent.png");
	})

	//reset background
	grid.style.backgroundImage = "url(mariobackground.png)";

	//reset timer
	currentTime = 60;
	timeLeft.textContent = currentTime;
	scoreText.textContent = "";

	//reset score
	result = 0;
	score.textContent = result;

	//bring buttons back
	startButtonEasy.style.visibility = "visible";
	startButtonMed.style.visibility = "visible";
	startButtonHard.style.visibility = "visible";

	//add listeners back to game modes
	startButtonEasy.addEventListener("click", startEasy);
	startButtonMed.addEventListener("click", startMed);
	startButtonHard.addEventListener("click", startHard);

}

reset.addEventListener("click", startOver);
