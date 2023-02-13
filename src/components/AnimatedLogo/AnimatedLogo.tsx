import React, { FC } from "react";
import { motion } from "framer-motion";

const shieldVariant = {
	hidden: {
		pathLength: 0,
		strokeWidth: 1,
		fill: "#ffffff36",
		fillOpacity: 0,
	},
	visible: {
		pathLength: 1,
		strokeWidth: 3,
		transition: {
			duration: 3,
			ease: "easeInOut",
		},
	},
	after: {
		fillOpacity: 1,
		transition: {
			duration: 1.5,
			delay: 2,
			ease: "easeIn",
		},
	},
};

const letterVariant = {
	hidden: {
		pathLength: 0,
		strokeWidth: 1,
		fill: "#ffffff36",
		fillOpacity: 0,
	},
	visible: {
		pathLength: 1,
		strokeWidth: 3,
		transition: {
			duration: 2,
			ease: "easeInOut",
		},
	},
	after: {
		fillOpacity: 1,
		transition: {
			duration: 1.5,
			delay: 2,
			ease: "easeIn",
		},
	},
};

interface AnimatedLogoProps {}

const AnimatedLogo: FC<AnimatedLogoProps> = () => {
	return (
		<svg viewBox="0 0 775 775" fill="none" xmlns="http://www.w3.org/2000/svg">
			<motion.path
				// initial={{ pathLength: 0, strokeWidth: 1, fill: "white", fillOpacity: 0 }}
				// animate={{
				// 	pathLength: 1,
				// 	strokeWidth: 8,
				// 	transitionEnd: {
				// 		fillOpacity: 1,
				// 	},
				// }}
				initial="hidden"
				animate={["visible", "after"]}
				variants={shieldVariant}
				// transition={{
				// 	duration: 3,
				// 	ease: "easeInOut",

				// 	repeat: Infinity,
				// 	repeatType: "reverse",
				// 	repeatDelay: 3,
				// }}
				strokeLinecap="round"
				strokeDasharray="0 1"
				stroke="white"
				d="M386.924 767.899C380.803 767.899 374.682 766.036 369.479 762.466C144.066 608.622 13.8382 378.709 12.0018 131.565C11.8488 117.128 21.4896 104.398 35.2623 100.672L378.967 8.14868C384.17 6.75151 389.679 6.75151 395.035 8.14868L738.739 100.672C752.512 104.398 762 117.128 762 131.565C760.317 378.554 629.935 608.622 404.523 762.466C399.167 766.036 393.046 767.899 386.924 767.899ZM75.203 155.628C84.6909 365.824 197.015 561.273 386.924 697.73C576.834 561.273 689.158 365.824 698.646 155.628L386.924 71.6423L75.203 155.628Z"
			/>
			<motion.path
				// initial={{ pathLength: 0, strokeWidth: 1 }}
				// animate={{ pathLength: 1, strokeWidth: 5 }}
				// transition={{
				// 	duration: 2,
				// 	ease: "easeInOut",
				// 	delay: 1.2,
				// 	repeat: Infinity,
				// 	repeatType: "reverse",
				// 	repeatDelay: 4,
				// }}
				initial="hidden"
				animate={["visible", "after"]}
				variants={letterVariant}
				strokeDasharray="0 1"
				stroke="white"
				d="M442.547 262.295C428.868 265.356 420.217 272.86 415.707 285.893C414.08 290.435 413.785 293.002 413.711 299.42C413.711 306.431 414.007 308.109 416.151 313.935C420.883 326.869 430.717 334.275 452.306 341.285C461.105 344.148 465.541 347.012 467.316 350.764C469.534 355.503 469.238 360.341 466.576 364.488C463.693 368.833 460.292 370.314 454.525 369.82C446.17 369.03 441.881 364.389 439.515 353.331L438.332 348.098L432.639 348.69C429.534 348.986 423.249 349.579 418.665 349.875C414.08 350.27 410.236 350.862 410.088 351.159C409.496 352.64 412.01 365.081 414.08 370.61C418.813 383.545 426.798 391.246 438.702 394.208C446.243 396.084 463.101 396.084 469.904 394.208C481.66 390.95 490.902 381.57 495.634 368.339C497.778 362.217 498 360.835 498 351.751C498 343.161 497.704 341.186 496.078 336.447C491.05 322.13 483.434 316.107 460.144 308.208C453.12 305.838 446.317 303.172 445.134 302.382C440.476 299.223 440.55 292.509 445.134 288.263C448.462 285.301 455.19 285.202 459.7 288.164C462.362 289.843 463.249 291.225 465.172 296.557C466.872 301.395 467.759 302.876 468.647 302.481C469.312 302.284 475.079 301.79 481.364 301.395C487.649 301.099 493.342 300.605 494.007 300.309C496.891 299.223 491.863 281.351 486.614 274.341C483.138 269.7 478.259 266.146 472.048 263.875C467.094 261.999 448.462 261.011 442.547 262.295Z"
			/>
			<motion.path
				// initial={{ pathLength: 0, strokeWidth: 1 }}
				// animate={{ pathLength: 1, strokeWidth: 5 }}
				// transition={{
				// 	duration: 2,
				// 	ease: "easeInOut",
				// 	delay: 1.2,
				// 	repeat: Infinity,
				// 	repeatType: "reverse",
				// 	repeatDelay: 4,
				// }}
				initial="hidden"
				animate={["visible", "after"]}
				variants={letterVariant}
				strokeDasharray="0 1"
				stroke="white"
				d="M324.849 262.086C306.03 264.868 293.225 280.866 288.504 307.496C286.499 318.824 286.499 339.989 288.504 350.82C291.737 368.408 299.045 383.213 307.582 389.573C314.89 395.038 320.193 396.528 331.963 396.628C348.972 396.727 356.215 393.249 372.577 377.251L374 375.86L373.871 348.038L373.677 320.215L353.499 319.917L333.257 319.718V333.63V347.541H341.987H350.783L350.589 353.701L350.395 359.962L346.191 363.141C335.714 370.991 324.332 369.302 318.641 359.067C312.691 348.336 311.527 320.613 316.507 305.112C319.546 295.374 324.655 290.902 332.545 290.902C338.689 290.902 342.893 294.082 345.286 300.541C346.256 303.124 347.096 305.41 347.161 305.608C347.29 305.906 372.189 298.951 372.513 298.454C372.965 297.758 369.667 286.133 367.662 281.761C363.329 272.023 357.315 266.16 348.972 263.676C343.41 261.987 331.187 261.192 324.849 262.086Z"
			/>
		</svg>
	);
};

export default AnimatedLogo;
