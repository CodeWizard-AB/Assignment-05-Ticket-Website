/** @type {import('tailwindcss').Config} */
export const content = ["./*.{html,js}"];
export const theme = {
	extend: {
		colors: {
			primary: "#1DD100",
			secondary: "#1DD1001A",
		},

		fontFamily: {
			inter: ['"Inter", sans-serif'],
			rale: ['"Raleway", sans-serif;'],
		},

		backgroundImage: {
			"hero-banner":
				"linear-gradient(180.00deg, rgba(3, 7, 18, 0.5),rgba(3, 7, 18, 0) 100%), url(../images/banner.png);",
		},
	},
};
export const plugins = [require("daisyui")];
