import React from 'react';

const Hello = () => React.createElement('h1', null, 'Hello World');

ReactDOM.render(
	React.createElement(Hello),
	document.getElementById('root'),
);
