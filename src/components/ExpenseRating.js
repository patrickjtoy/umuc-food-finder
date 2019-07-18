import React, { useContext } from 'react'
import { StoreContext } from '../App'
import Actions from '../state/actions'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

/* Expense ratings with dollar signs and string number values */
export default function ExpenseRating() {
  const { state, dispatch } = useContext(StoreContext)
  const options = [{ value: 0, label: '$' }, { value: 1, label: '$$' }, { value: 2, label: '$$$' }]

  return (
    <Dropdown
      className="dropdown"
      options={options}
      value={options[state.price]}
      onChange={price => dispatch({ type: Actions.SET_EXPENSE_RATING, payload: price.value })}
      placeholder="Cost"
    />
  )
}
