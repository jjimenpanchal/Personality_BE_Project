import React from "react";
// import {Date} from Date

const Footer = () => {
	const date = new Date();
	return (
		<>
			<footer className="w-100 bg-light text-center footer">
				<p>
					© {date.getFullYear()} My Personality. All Rights Reserved | Terms and
					Conditions
				</p>
			</footer>
		</>
	);
};

export default Footer;
