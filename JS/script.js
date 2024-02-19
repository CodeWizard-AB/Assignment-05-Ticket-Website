"use strict";

// * SELECTED ELEMENTS -

const seatContainer = document.querySelector("#seats");
const bookContainer = document.getElementById("booking");
const totalPrice = document.getElementById("total-price");
const grandPrice = document.getElementById("grand-price");
const discountBtn = document.getElementById("discount-btn");
const discountCoupons = [...document.querySelectorAll(".coupon")].map(
	(elment) => elment.textContent
);

let totalSeat = 40;
let seatCount = 0;

// * FUNCTION

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



	if (!clicked.classList.contains(greenColor) && seatCount < 4) {
		clicked.classList.add(greenColor);
		bookContainer.insertAdjacentHTML("afterbegin", seatHtml);
		seatCount++;
		totalPrice.textContent = seatCount * 550;
		grandPrice.textContent = totalPrice.textContent;
	}
});
