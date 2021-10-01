/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			showTime: true,
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
		this.setState({
			date: new Date(),
		});
	}

	render() {
		const { showTime, date } = this.state;
		return (
			<div>
				<h1>Hello React Students!</h1>
				<h2>
					{
						showTime && `It is ${date.toLocaleTimeString()}.`
					}
				</h2>
				<button type="button" onClick={() => this.setState({ showTime: !showTime })}>
					{
						showTime ? 'Hide Time' : 'Show Time'
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
