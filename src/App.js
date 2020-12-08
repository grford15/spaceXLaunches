import React, { Component } from "react";
import axios from "axios";
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
				<h2>Space-X Launches</h2>
			</div>
		);
	}
}

export default App;
