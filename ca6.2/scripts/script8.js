function Clock(props) {
    return (
      <div>
        <h1>Hello React Students!</h1>
        <h2>It is now {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
}

function updateTime() {
    ReactDOM.render(
      <Clock date={new Date()} />,
      document.getElementById('root')
    );
  }

  setInterval(updateTime, 1000);