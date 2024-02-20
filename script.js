"use strict";

// * SELECTED ELEMENTS -

const bookContainer = document.getElementById("booking");
const bookedSeat = document.querySelectorAll(".seat");
const totalPriceEl = document.getElementById("total-price");
const grandPriceEl = document.getElementById("grand-price");
const seatCounting = document.getElementById("seat-count");
const totalSeats = document.getElementById("total-seats");
const seatContainer = document.getElementById("seats");
const discountContainer = document.getElementById("discount-container");
const discountInput = document.getElementById("discount-input");
const discountPriceContent = document.getElementById("discount-price");
const mainComponents = document.querySelectorAll(".component");
const modal = document.querySelectorAll(".modalWindow");
const discountCoupons = [...document.querySelectorAll(".coupon")].map(
	(elment) => elment.textContent
);

// * INPUT ELEMENTS -

const couponInput = document.getElementById("coupon-input");
const passengerNameInput = document.getElementById("name");
const phoneNumberInput = document.getElementById("phone");

// * BUTTONS ELEMENTS -

const discountBtn = document.getElementById("discount-btn");
const nextBtn = document.getElementById("next-btn");
const modalBtn = document.getElementById("modal-btn");

let totalPrice,
	discountPrice,
	grandPrice,
	totalSeat,
	seatCount,
	greenColor,
	hidden,
	coupon;

// * FUNCTIONS -

const initWeb = function () {
	[totalPrice, discountPrice, grandPrice] = [0, 0, 0];
	[totalSeat, seatCount] = [28, 0];
	greenColor = "!bg-primary";
	hidden = "!hidden";

	seatCounting.textContent = seatCount;
	totalSeats.textContent = totalSeat;
	discountContainer.classList.add(hidden);
	discountInput.classList.remove(hidden);
	totalPriceEl.textContent = grandPriceEl.textContent = totalPrice
		.toFixed(2)
		.padStart(5, 0);
	totalPriceEl.closest("div").classList.remove("border-t-2");

	document
		.querySelectorAll("#seats p")
		.forEach((element) => element.classList.remove(greenColor));
	document
		.querySelectorAll("#booking .seat")
		.forEach((element) => element.remove());
	document
		.querySelectorAll(".button")
		.forEach((button) => button.setAttribute("disabled", true));
	document.querySelectorAll("input").forEach((input) => (input.value = ""));
};

const calcPrice = function (seats) {
	totalPrice = (seats * 550).toFixed(2);
	coupon = couponInput.value;
	discountPrice = coupon
		? (coupon === discountCoupons[0] ? 0.15 : 0.2) * totalPrice
		: 0;
	discountPriceContent.textContent = discountPrice.toFixed(2);
	grandPrice = (totalPrice - discountPrice).toFixed(2);
	totalPriceEl.textContent = totalPrice;
	grandPriceEl.textContent = grandPrice;
	totalSeats.textContent = totalSeat;
	seatCounting.textContent = seats;
};

initWeb();

// * EVENT HANDLERS -

// * SEAT CLICKED EVENT - 

seatContainer.addEventListener("click", function (e) {
	const clicked = e.target;
	const seatHtml = `
	<div class='my-3 seat'>
		<p>${clicked.textContent}</p>
		<p>Economoy</p>
		<p>550</p>
		</div>
		`;

	if (clicked.tagName === "P") {
		if (!clicked.classList.contains(greenColor) && seatCount < 4) {
			seatCount++;
			totalSeat--;
			bookContainer.insertAdjacentHTML("afterbegin", seatHtml);
			clicked.classList.add(greenColor);
			totalPriceEl.closest("div").classList.add("border-t-2");

			if (passengerNameInput.value && phoneNumberInput.value) {
				nextBtn.removeAttribute("disabled");
			}

			if (discountCoupons.includes(coupon)) {
				discountBtn.removeAttribute("disabled");
			}
		} else if (clicked.classList.contains(greenColor)) {
			document.querySelectorAll(".seat").forEach((seat) => {
				if (seat.firstElementChild.textContent === clicked.textContent)
					seat.remove();
			});
			clicked.classList.remove(greenColor);
			seatCount--;
			totalSeat++;
			if (seatCount === 0)
				totalPriceEl.closest("div").classList.remove("border-t-2");
		} else {
			alert("You can book upto 4 seats!");
		}
		calcPrice(seatCount);
	}
});

// * BUTTONS CLICKED EVENTS -

couponInput.addEventListener("input", function () {
	discountCoupons.includes(this.value) && seatCount > 0
		? discountBtn.removeAttribute("disabled")
		: discountBtn.setAttribute("disabled", true);
});

document.querySelector("form").addEventListener("input", function (e) {
	const formEl = [passengerNameInput, phoneNumberInput];
	formEl.every((element) => element.value) && seatCount > 0
		? nextBtn.removeAttribute("disabled")
		: nextBtn.setAttribute("disabled", true);
});

discountBtn.addEventListener("click", function () {
	discountContainer.classList.remove(hidden);
	discountInput.classList.add(hidden);
	calcPrice(seatCount);
});

nextBtn.addEventListener("click", function (e) {
	e.preventDefault();
	modal.forEach((element) => element.classList.remove("hidden"));
	mainComponents.forEach((element) => element.classList.add("hidden"));
});

modalBtn.addEventListener("click", function () {
	initWeb();
	modal.forEach((element) => element.classList.add("hidden"));
	mainComponents.forEach((element) => element.classList.remove("hidden"));
});
