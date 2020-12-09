import React, { Component } from "react";
import axios from "axios";
import logo from "./assets/spacex-logo.png";
import "./stylesheet.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			launches: [],
		};
	}

	componentDidMount() {
		axios("https://api.spacexdata.com/v4/launches/")
			.then((res) =>
				this.setState({
					launches: res.data,
				})
			)
			.catch((err) => console.error(err));
	}

	render() {
		return (
			<div className="app-container">
				<header>
					<div className="logo">
						<img src={logo} alt="Logo" />
						<p>Launches</p>
					</div>
				</header>
			</div>
		);
	}
}

export default App;
