/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
class Clock extends React.Component {
	static calculateTime(twentyFourHour) {
		const time = new Date();

		const hours = twentyFourHour ? time.getHours() : time.getHours() - 12;
		const minutes = time.getUTCMinutes();
		const seconds = time.getUTCSeconds();

		return `${hours}:${minutes}:${seconds}`;
	}

	constructor(props) {
		super(props);

		this.state = {
			time: Clock.calculateTime(false),
			showTime: true,
			twentyFourHour: false,
		};
	}

	// minimized because it didn't change
	componentDidMount() {
		this.timer = setInterval(
			() => this.updateTime(),
			1000,
		);
	}

	// minimized because it didn't change
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	updateTime() {
		const { twentyFourHour } = this.state;
		this.setState({
			time: Clock.calculateTime(twentyFourHour),
		});
	}

	render() {
		const { showTime, time, twentyFourHour } = this.state;
		return (
			<div>
				<h1>Hello React Students!</h1>
				<h2>
					{
						showTime && `It is ${time}.`
					}
				</h2>
				<button type="button" onClick={() => this.setState({ showTime: !showTime })}>
					{
						showTime ? 'Hide Time' : 'Show Time'
					}
				</button>
				<button type="button" onClick={() => this.setState({ twentyFourHour: !twentyFourHour })}>
					{
						twentyFourHour ? '12 Hour Format' : '24 Hour Format'
					}
				</button>
			</div>
		);
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById('root'),
);
