/*************************************************************************
 * File: roundForm.js
 * This file defines a React controlled component for a logging a round.
 ************************************************************************/

class RoundForm extends React.Component {
	constructor(props) {
		super(props);
		const today = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);
		this.state = {
			date: today.toISOString().substr(0, 10),
			course: '',
			holes: 18,
			strokes: 0,
			minutes: 0,
			seconds: 0,
			sgs: '0:00',
			type: "practice",
			submitIcon: "fa fa-save",
			submitLabel: "Log Round"
		};
	}

	computeSGS(strokes, minutes, seconds) {
		const newScore = `${strokes + minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
		this.setState({ ['sgs']: newScore })
	}

	handleChange = (event) => {
		const { name, type } = event.target

		const value = type === "number" ? parseInt(event.target.value) : event.target.value

		this.setState({ [name]: value });

		const strokes = name === "strokes" ? value : this.state.strokes;
		const minutes = name === "minutes" ? value : this.state.minutes;
		const seconds = name === "seconds" ? value : this.state.seconds;

		this.computeSGS(strokes, minutes, seconds)
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ submitIcon: "fa fa-spin fa-spinner", submitLabel: "Saving..." });
		setTimeout(this.handleSubmitCallback, 1000);
	}

	handleSubmitCallback = () => {
		this.setState({ submitIcon: "fa fa-save", submitLabel: "Log Round" });
		let userRounds = localStorage.getItem("userData");
		if (userRounds == null) {
			userRounds = [];
		} else {
			userRounds = JSON.parse(userRounds);
		}
		let round = this.state;
		delete round.submitIcon;
		delete round.submitLabel;
		userRounds.push(round);
		localStorage.setItem("userData", JSON.stringify(userRounds));
		alert("localStorage: " + localStorage.getItem("userData"));
	}


	textFields = [{
		displayName: 'Course',
		name: 'course',
		type: 'text',
		label: 'Enter a course name of at most 50 characters'
	}, {
		displayName: 'Holes',
		name: 'holes',
		type: 'number',
		label: 'Enter the number of holes on this course',

	}, {
		displayName: 'Strokes',
		name: 'strokes',
		type: 'number',
		label: 'Enter the number of strokes on this course',
	}, {
		displayName: 'Minutes',
		name: 'minutes',
		type: 'number',
		label: 'Enter the number of minutes on this course',
	}, {
		displayName: 'Seconds',
		name: 'seconds',
		type: 'number',
		label: 'Enter the number of seconds for this course',
	}, {
		displayName: 'SGS',
		name: 'sgs',
		type: 'text',
		label: 'Enter the SpeedGolf Score for this course',
	}, {
		displayName: 'Notes',
		name: 'notes',
		type: 'text',
		label: 'Enter any notes for this course',
	}];

	render() {
		return (
			<form id="logRoundForm"
				onSubmit={this.handleSubmit} noValidate>
				{/* --------- Date --------- */}
				<div className="mb-3 centered">
					<label htmlFor="roundDate" className="form-label">Date:
						<input name="date" id="roundDate"
							className="form-control centered" type="date"
							aria-describedby="roundDateDescr" value={this.state.date}
							onChange={this.handleChange} required />
					</label>
					<div id="roundDateDescr" className="form-text">
						Enter a valid date
					</div>
				</div>

				{/* --------- Course Type --------- */}
				<div className="mb-3 centered">
					<label htmlFor="roundType">Type:
						<select name="type" id="roundType" className="form-control centered"
							value={this.state.type} onChange={this.handleChange}>
							<option value="practice" selected>Practice</option>
							<option value="tournament">Tournament</option>
						</select>
					</label>
				</div>

				{
					this.textFields.map(field => {
						const { name, displayName, type, label } = field
						return (
							<div className="mb-3 centered">
								<label
									htmlFor={`round${displayName}`}
									className="form-label">{`${displayName}:`}
									<input
										name={name}
										id={`round${displayName}`}
										className="form-control centered"
										type={type}
										aria-describedby={`round${displayName}Descr`}
										size="50"
										maxLength="50"
										value={this.state[name]}
										onChange={this.handleChange}
										required
										disabled={name === "sgs"} />
								</label>
								<div
									id={`round${displayName}Descr`}
									className="form-text">
									{label}
								</div>
							</div>
						)
					})
				}

				{/* --------- Submit Button --------- */}
				<div className="centered">
					<button type="submit" className="btn-submit btn btn-primary">
						<span className={this.state.submitIcon}></span>
						&nbsp;{this.state.submitLabel}
					</button>
				</div>
			</form>
		);
	}
}

ReactDOM.render(
	<RoundForm />,
	document.getElementById('root')
);