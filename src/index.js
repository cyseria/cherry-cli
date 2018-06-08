import './access/style.css';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header/index';
import List from './components/List/index';
import Detail from './components/Detail';

const App = () => {
    return (
        <div>
            <Header />
            <List />
        </div>);
};

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App}></Route>
            <Route path="/detail/:id" component={Detail}></Route>
        </div>
    </BrowserRouter>
), document.getElementById("app"));