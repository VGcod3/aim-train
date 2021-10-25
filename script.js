'use strict'

const start = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEL = document.querySelector('#time')
const board = document.querySelector('#board')
let hack;

const colours = ['#e71c3c', '#8e42ad', '#3498dd', '#e67e21', '#2ecc70', '#c600eb'];

let time = 0;
let score = 0;

start.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {

	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'))
		screens[1].classList.add('up');
		startGame()
	}
})

board.addEventListener('click', e => {
	if (e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decreaseTime, 1000);
	setTime(time)
	createRandomCircle()
}

function decreaseTime() {
	if (time == 0) {
		finishGame()
	} else {
		let curr = --time;
		if (curr < 10) {
			curr = `0${curr}`;
		}
		setTime(curr)
	}
}

function setTime(val) {
	timeEL.innerHTML = `00:${val}`

}

function finishGame() {
	board.innerHTML = `<h1>Score <span class='primary'>${score}</span><h1>`

	timeEL.parentNode.classList.add('hide')

	clearInterval(hack)
}

function createRandomCircle() {
	let colour = getRandomColour()

	const circle = document.createElement('div')

	circle.classList.add('circle');
	const size = getRandomNumber(10, 60)
	
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.style.background = colour;
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.boxShadow = `0 0 50px ${colour}, 0 0 10px ${colour}`
	board.append(circle);


}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}
 
function getRandomColour() {
	const index = Math.floor(Math.random() * colours.length);
	return colours[index];
}

function winGame() {
	

	function kill() {
		let circle = document.querySelector('.circle');

		circle.click()

	}

	hack = setInterval(kill,5);


}