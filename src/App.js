import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Auth, Results, Settings } from './pages'
import { initialState, reducer } from './state/reducer'

export const StoreContext = React.createContext(null)

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Router>
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/auth" component={Auth} />
              <Route path="/results" component={Results} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </div>
        </Router>
      </div>
    </StoreContext.Provider>
  )
}
