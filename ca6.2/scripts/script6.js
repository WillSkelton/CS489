const Page = () => {
    return <div>
        <Header />
        <Button />
    </div>
}

const Header = () => {
    return <h1>Hello World in React.js</h1>
}

const Button = () => {
    return <button className="btn btn-primary">
      <span className="fa fa-minus"></span>&nbsp;React Button</button>

}

ReactDOM.render(<Page />, document.getElementById('root'));
