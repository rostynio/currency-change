/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const AppExample = (props) => {
//     return (
//     <div className="blue">
//     <a href="#">Hello {props.name}!, how are you my {props.addName}?</a>
// </div>
// );
// }
// TAGS === element
// OWN TAGS === components

/* <div className="blue">
    <a href="#">Hello</a>
</div> */
// React.createElement("div", {
//     className: "blue"
// }, "Hello World");
ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
