import React, { Component } from "react";
import axios from "axios";
import logo from "./assets/spacex-logo.png";
import launchHome from "./assets/img/launch-home.png";
import refreshIcon from "./assets/icon/refresh.png";
import LaunchDetail from "./component/LaunchDetail";
import uniq from "lodash.uniq";
import "./stylesheet.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			launches: [],
			filteredLaunches: [],
			filtered: false,
			sort: "",
		};
		this.getData = this.getData.bind(this);
		this.reloadData = this.reloadData.bind(this);
		this.filterByYear = this.filterByYear.bind(this);
		this.sortLaunches = this.sortLaunches.bind(this);
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
		this.setState({
			filtered: false,
		});
	}

	filterByYear(e) {
		const year = e.target.value;
		const filteredByYearArray = this.state.launches.filter((launch) =>
			launch.date_utc.includes(year)
		);
		this.setState({
			filteredLaunches: filteredByYearArray,
			filtered: true,
		});
	}

	sortLaunches() {
		const button = document.getElementById("sort-button");
		if (this.state.sort.length < 1 || this.state.sort === "Ascending") {
			const sortedLaunches = this.state.launches.sort((first, second) => {
				let secondDate = new Date(second.date_utc);
				let firstDate = new Date(first.date_utc);
				return secondDate - firstDate;
			});
			this.setState({
				launches: sortedLaunches,
				sort: "Descending",
			});
			button.innerHTML = "Sort Ascending";
		} else {
			const sortedLaunches = this.state.launches.sort((first, second) => {
				let secondDate = new Date(second.date_utc);
				let firstDate = new Date(first.date_utc);
				return firstDate - secondDate;
			});
			this.setState({
				launches: sortedLaunches,
				sort: "Ascending",
			});
			button.innerHTML = "Sort Descending";
		}
	}

	render() {
		const { launches, filtered, filteredLaunches } = this.state;
		const launchYears = this.state.launches.map((launch) =>
			new Date(launch.date_utc).getFullYear()
		);
		const uniqLaunchYears = uniq(launchYears);

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
							<select onChange={this.filterByYear}>
								{uniqLaunchYears.map((launchYear, index) => {
									return (
										<option value={launchYear} key={index}>
											{launchYear}
										</option>
									);
								})}
							</select>
							<button id="sort-button" onClick={this.sortLaunches}>
								Sort Descending
							</button>
						</div>
						{launches.length > 0 && filtered
							? filteredLaunches.map((launch, index) => {
									const date = new Date(launch.date_utc);
									return (
										<LaunchDetail
											key={index}
											name={launch.name}
											flight_number={launch.flight_number}
											date={date}
										/>
									);
							  })
							: launches.map((launch, index) => {
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
