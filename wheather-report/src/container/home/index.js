import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from '../routes';

class home extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/" component={Routes} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default home;