import React, { useContext } from 'react'
import { StoreContext } from '../App'
import Actions from '../state/actions'
import './Login.scss'

/* Class composed of modularized classes FoodPreferences, ExpenseRating and Diet Preferneces. Uses Bootstrap grid to follow mock up model */
export default function Login() {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <>
      <div className="register__field">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={state.email}
          onChange={event => dispatch({ type: Actions.SET_EMAIL, payload: event.target.value })}
          required
        />
      </div>
      <div className="register__field">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={state.password}
          onChange={event => dispatch({ type: Actions.SET_PASSWORD, payload: event.target.value })}
          required
        />
      </div>
    </>
  )
}
