import React, { useContext } from 'react'
import { StoreContext } from '../App'
import Actions from '../state/actions'
import './Register.scss'

/* Class composed of modularized classes FoodPreferences, ExpenseRating and Diet Preferneces. Uses Bootstrap grid to follow mock up model */
export default function LoginPage() {
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
      <div className="register__field">
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={state.firstName}
          onChange={event => dispatch({ type: Actions.SET_FIRST_NAME, payload: event.target.value })}
          required
        />
      </div>
      <div className="register__field">
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={state.lastName}
          onChange={event => dispatch({ type: Actions.SET_LAST_NAME, payload: event.target.value })}
          required
        />
      </div>
    </>
  )
}
