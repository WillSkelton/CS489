const Header = () => {
    return <h1>Hello World in React.js</h1>
}

const Button = () => {
    return <button>I'm a React Button!</button>
}

ReactDOM.render(<Header />, document.getElementById('root'));
ReactDOM.render(<Button />, document.getElementById('root2'));