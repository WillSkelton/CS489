/*************************************************************************
 * File: weatherstation.js
 * This file defines a React component that implements the Weather
 * Station app developed in Chapter 10.
 ************************************************************************/

/*************************************************************************
 * @class WeatherStation 
 * @Desc 
 * This React component uses the OpenWeatherMap API to render the weather
 * conditions at a given latitude and longitude.
 *************************************************************************/
class WeatherStation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			latitude: this.props.latitude,
			longitude: this.props.longitude
		};
	}

	componentDidMount = () => {
		this.getCurrentObservations();
	}

	toggleUnits = () => {
		if (this.state.tempUnit == "F") {
			this.setState({ tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5 / 9) });
		} else {
			this.setState({ tempUnit: "F", temp: Math.round((this.state.temp * 9 / 5) + 32) });
		}
	}

	getCurrentObservations = async () => {
		const dataResponse = await fetch(
			`https://api.weather.gov/points/${this.state.latitude},${this.state.longitude}/`
		)
		const data = await dataResponse.json()
		const { gridX, gridY, cwa } = data.properties
		const city = data.properties.relativeLocation.properties.city
		const weatherResponse = await fetch(
			`https://api.weather.gov/gridpoints/${cwa}/${gridX},${gridY}/forecast`
		);
		const currWeather = await weatherResponse.json();
		const now = currWeather.properties.periods[0]
		this.setState(
			{
				place: city,
				retrieved: (new Date()).toLocaleDateString() + " at " +
					(new Date()).toLocaleTimeString(),
				conditions: now.detailedForecast,
				visibility: now.shortForecast,
				visibilityUnit: "Meters",
				temp: now.temperature,
				tempUnit: now.temperatureUnit,
				humidity: "{currWeather.main.humidity}",
				wind: now.windspeed,
				windUnit: "Mph",
				windDirection: now.windDirection,
				windDirectionUnit: "of North"
			});
	}

	render() {
		return (
			<section className="jumbotron ws-centered ws-padding">
				<h1>Weather Conditions at {this.state.place}</h1>
				<p><i>Last updated: {this.state.retrieved}</i></p>
				<p>Conditions: {this.state.conditions}</p>
				<p>Visibility: {this.state.visibility + " " + this.state.visibilityUnit}</p>
				<p>Temp: {this.state.temp}&deg;&nbsp;{this.state.tempUnit}</p>
				<p>Humidity: {this.state.humidity}%</p>
				<p>Wind Speed: {this.state.wind + " " + this.state.windUnit}</p>
				<p>Wind Direction: {this.state.windDirection + " " +
					this.state.windDirectionUnit}</p>
				<div className="custom-control custom-switch">
					<input type="checkbox" className="custom-control-input"
						id={"switch-" + this.props.stationId} onClick={this.toggleUnits} />
					<label className="custom-control-label"
						htmlFor={"switch-" + this.props.stationId}>&nbsp;&deg;{this.state.tempUnit}</label>
				</div>
			</section>
		);
	}

}
