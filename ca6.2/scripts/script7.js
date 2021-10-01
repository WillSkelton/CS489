const Button = (props) => {
    return <button className="btn btn-primary">
      <span className={props.icon}></span> {props.name}</button>
}

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const App = () => {
    return <div>
        <Header name="Hello Pullman"/>
        <Button name="Pullman Button" icon="fa fa-plus"/>
        <Header name="Hello Moscow"/>
        <Button name="Moscow Button" icon="fa fa-minus"/>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));
