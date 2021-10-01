const Page = () => {
    return <React.Fragment>
        <Header />
        <Button/>
    </React.Fragment>
}

const Header = () => {
    return <h1>Hello World in React.js</h1>
}

const Button = () => {
    return <button className="btn btn-primary">
   <span className="fa fa-plus"></span>&nbsp;I'm a React Button!</button>
}

ReactDOM.render(<Page />, document.getElementById('root'));