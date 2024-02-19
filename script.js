"use strict";

// * SELECTED ELEMENTS -

const bookContainer = document.getElementById("booking");
const totalPriceEl = document.getElementById("total-price");
const grandPriceEl = document.getElementById("grand-price");
const seatCounting = document.getElementById("seat-count");
const totalSeats = document.getElementById("total-seats");
const seatContainer = document.getElementById("seats");
const discountContainer = document.getElementById("discount-container");
const discountInput = document.getElementById("discount-input");
const discountPriceContent = document.getElementById("discount-price");
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

let [totalSeat, seatCount] = [40, 0];
let totalPrice, discountPrice, grandPrice;

// * FUNCTIONS -

const calcPrice = function (seats, coupon) {
	totalPrice = (seats * 550).toFixed(2);
	discountPrice = coupon
		? (coupon === discountCoupons[0] ? 0.15 : 0.2) * totalPrice
		: 0;
	grandPrice = (totalPrice - discountPrice).toFixed(2);
	totalPriceEl.textContent = totalPrice;
	grandPriceEl.textContent = grandPrice;
	totalSeats.textContent = totalSeat;
	seatCounting.textContent = seats;
	discountPriceContent.textContent = discountPrice.toFixed(2);
};

const btnActivate = function (value1, value2) {
	if (value1 && value2 && seatCount > 0) {
		nextBtn.removeAttribute("disabled");
	} else {
		nextBtn.setAttribute("disabled", true);
	}
};

// * EVENT HANDLERS -

seatContainer.addEventListener("click", function (e) {
	const clicked = e.target;
	const greenColor = "!bg-primary";
	const seatHtml = `
	<div class='my-3'>
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
		totalPriceEl.closest("div").classList.add("border-t-2");
	}
});

// * BUTTONS EVENTS -

couponInput.addEventListener("input", function () {
	if (discountCoupons.includes(this.value) && seatCount > 0) {
		discountBtn.removeAttribute("disabled");
	} else {
		discountBtn.setAttribute("disabled", true);
	}
});

discountBtn.addEventListener("click", function () {
	discountContainer.classList.remove("!hidden");
	discountInput.classList.add("!hidden");
	calcPrice(seatCount, couponInput.value);
});

nextBtn.addEventListener("click", function (e) {
	e.preventDefault();
});
