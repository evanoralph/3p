import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { injectDeps, useDeps } from 'react-simple-di-extra';
import { compose, merge } from 'react-komposer';
import 'sweetalert2/dist/sweetalert2.min.css';

import store from '../../startup/configs/store';
import context from '../../startup/configs/context';
import actions from '../../startup/configs/actions';

import getTrackerLoader from '../../lib/getTrackerLoader';

import PublicRoute from './routes/Public';

// Components
import Homepage from '../components/Home';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route
            render={({ location }) => (
              <div id="app-container">
                <Switch location={location}>
                  <PublicRoute exact name="home" path="/" component={Homepage} {...this.props} />
                </Switch>
              </div>
            )}
          />
        </Router>
      </Provider>
    );
  }
}

function composer(props, onData) {
  const loggingIn = Meteor.loggingIn();
  console.log(props);
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
}

export default merge(compose(getTrackerLoader(composer)))(injectDeps(context, actions)(App));
