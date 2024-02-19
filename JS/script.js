"use strict";

// * SELECTED ELEMENTS -

const seatContainer = document.querySelector("#seats");
const bookContainer = document.getElementById("booking");
const totalPriceEl = document.getElementById("total-price");
const grandPriceEl = document.getElementById("grand-price");
const discountBtn = document.getElementById("discount-btn");
const seatCounting = document.getElementById("seat-count");
const totalSeats = document.getElementById("total-seats");
const discountCoupons = [...document.querySelectorAll(".coupon")].map(
	(elment) => elment.textContent
);

let totalSeat = 40;
let seatCount = 0;

// * FUNCTION

const calcPrice = function (seats) {
	const totalPrice = seats * 550;
	const discountPrice = 0;
	const grandPrice = totalPrice - discountPrice;
	totalPriceEl.textContent = totalPrice;
	grandPriceEl.textContent = grandPrice;
	totalSeats.textContent = totalSeat;
	seatCounting.textContent = seats;
};

// * EVENT HANDLERS -

seatContainer.addEventListener("click", function (e) {
	const clicked = e.target;
	const greenColor = "!bg-primary";
	const seatHtml = `
	<div>
		<p>${clicked.textContent}</p>
		<p>Economoy</p>
		<p>550</p>
	</div>
	`;

	if (
		!clicked.classList.contains(greenColor) &&
		seatCount < 4 &&
		clicked.tagName === "P"
	) {
		clicked.classList.add(greenColor);
		bookContainer.insertAdjacentHTML("afterbegin", seatHtml);
		seatCount++;
		totalSeat--;
		calcPrice(seatCount);
	}
});


