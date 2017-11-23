import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import reducers from '../reducers'
import * as actions from '../actions'

import Login from '../containers/Login'
import Reg from '../containers/Reg'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const history = createHistory()
const middleware = routerMiddleware(history)

history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

const mapStateToProps = function(state){
	return state
}

import App from '../components/App'


render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
			<App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
)