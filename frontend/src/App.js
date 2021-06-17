import Navbar from "./Components/Navbar";
import Menu from "./Components/Menu";
import Footer from "./Components/Footer";
const App = () => {
	return (
		<>
			{/* <Gaurav></Gaurav> */}
			<div className="root">
				<Navbar />
				<Menu />
				<div className="footer">
					<Footer />
				</div>

			</div>
		</>
	);
};

export default App;
