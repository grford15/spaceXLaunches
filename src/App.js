import React, { Component } from "react";
import axios from "axios";
import logo from "./assets/spacex-logo.png";
import launchHome from "./assets/img/launch-home.png";
import refreshIcon from "./assets/icon/refresh.png";
import LaunchDetail from "./component/LaunchDetail";
import "./stylesheet.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			launches: [],
		};
		this.getData = this.getData.bind(this);
		this.reloadData = this.reloadData.bind(this);
	}

	componentDidMount() {
		this.getData("https://api.spacexdata.com/v4/launches/");
	}

	getData(url) {
		axios(url)
			.then((res) =>
				this.setState({
					launches: res.data,
				})
			)
			.catch((err) => console.error(err));
	}

	reloadData() {
		this.getData("https://api.spacexdata.com/v4/launches/");
		console.log("Clicked");
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
					<div className="refresh" onClick={this.reloadData}>
						<p>Reload Data</p>
						<img src={refreshIcon} alt="reload data button" />
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
									<LaunchDetail
										key={index}
										name={launch.name}
										flight_number={launch.flight_number}
										date={date}
									/>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
