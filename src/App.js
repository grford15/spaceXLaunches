import React, { Component } from "react";
import axios from "axios";
import logo from "./assets/spacex-logo.png";
import launchHome from "./assets/img/launch-home.png";
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
		const { launches } = this.state;
		return (
			<div className="app-container">
				<header>
					<div className="logo">
						<img src={logo} alt="Logo" />
						<p>Launches</p>
					</div>
				</header>
				<div className="main-content">
					<img src={launchHome} alt="spaceship launching" />
					<div className="launch-data-container">
						<div className="filter-boxes">
							<button>Filter by Year</button>
							<button>Sort Descending</button>
						</div>
						{launches.length > 0 &&
							launches.map((launch, index) => {
								const date = new Date(launch.date_utc);
								return (
									<div key={index} className="launch-data">
										<h1>#{launch.flight_number}</h1>
										<h2>{launch.name}</h2>
										<div className="launch-details">
											<p>{date.toDateString()}</p>
											<p></p>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
