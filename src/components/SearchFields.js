import React, { useContext } from 'react'
import { StoreContext } from '../App'
import Actions from '../state/actions'
import Criteria from './Criteria'
import ExpenseRating from './ExpenseRating'

export default function SearchFields() {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <>
      <div className="search__field query">
        <input
          type="text"
          required
          className="form-control"
          placeholder="What are you craving?"
          value={state.search}
          onChange={event => dispatch({ type: Actions.SET_SEARCH, payload: event.target.value })}
        />
      </div>

      <div className="search__field zip-code">
        <input
          type="number"
          required
          className="form-control"
          placeholder="Zip Code"
          value={state.location}
          onChange={event => dispatch({ type: Actions.SET_LOCATION, payload: event.target.value })}
        />
      </div>

      <div className="search__field expense-rating">
        <ExpenseRating />
      </div>

      <div className="search__field criteria">
        <Criteria />
      </div>
    </>
  )
}
