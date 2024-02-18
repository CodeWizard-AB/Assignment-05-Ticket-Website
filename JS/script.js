"use strict";

const seatContainer = document.querySelector("#seats");
const seatRemain = document.querySelectorAll("#seats p");
const seatBooked = [];
let totalSeat = 40;

// * FUNCTION

seatContainer.addEventListener("click", function (e) {
	const clicked = e.target;
	const greenColor = "!bg-primary";
  const seatDetail = `
  
  

  `
	clicked.classList.add(greenColor);
});
