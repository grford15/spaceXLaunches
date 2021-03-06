import "./LaunchDetail.scss";

const LaunchDetail = (props) => {
	const { flight_number, name, date } = props;
	return (
		<div className="launch-data">
			<h2>#{flight_number}</h2>
			<h2>{name}</h2>
			<div className="launch-details">
				<p>{date.toDateString()}</p>
				<p></p>
			</div>
		</div>
	);
};

export default LaunchDetail;
