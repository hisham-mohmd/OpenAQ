import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Preferences from '../../components/preferences/preferences';
class routes extends Component {
    render() {
        return (
            <div>
                <main>
                    <Switch>
                        <Route path="/preferences" component={Preferences} />
                        <Redirect to="/preferences" from="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}
export default routes;