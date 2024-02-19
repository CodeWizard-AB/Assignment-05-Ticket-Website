"use strict";

// * SELECTED ELEMENTS -

const bookContainer = document.getElementById("booking");
const totalPriceEl = document.getElementById("total-price");
const grandPriceEl = document.getElementById("grand-price");
const seatCounting = document.getElementById("seat-count");
const totalSeats = document.getElementById("total-seats");
const seatContainer = document.getElementById("seats");
const discountCoupons = [...document.querySelectorAll(".coupon")].map(
	(elment) => elment.textContent
);

// * INPUTS -

const couponInput = document.getElementById("coupon-input");
const passengerNameInput = document.getElementById("name");
const phoneNumberInput = document.getElementById("phone");

// * BUTTONS -

const discountBtn = document.getElementById("discount-btn");
const nextBtn = document.getElementById("next-btn");

let totalSeat = 40;
let seatCount = 0;
let totalPrice, discountPrice, grandPrice;

// * FUNCTIONS -

const calcPrice = function (seats, coupon) {
	totalPrice = (seats * 550).toFixed(2);
	if (coupon && discountCoupons.includes(coupon)) {
		discountPrice = coupon === discountCoupons[0] ? 0.15 : 0.2 * totalPrice;
	} else {
		discountPrice = 0;
	}
	grandPrice = (totalPrice - discountPrice).toFixed(2);
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

// * BUTTONS EVENTS -

discountBtn.addEventListener("click", function (e) {
	console.log(e);
});

nextBtn.addEventListener("click", function () {});
