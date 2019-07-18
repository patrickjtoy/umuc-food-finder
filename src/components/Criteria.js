import React, { useContext } from 'react'
import { StoreContext } from '../App'
import Actions from '../state/actions'
import { prop } from 'ramda'
import MultiDropdown from './MultiDropdown'

/* Expense ratings with dollar signs and string number values */
export default function Criteria() {
  const { state, dispatch } = useContext(StoreContext)
  const options = [
    { key: 'vegetarian', label: 'Vegetarian' },
    { key: 'vegan', label: 'Vegan' },
    { key: 'gluten-free', label: 'Gluten-Free' },
    { key: 'paleo', label: 'Paleo' },
    { key: 'keto', label: 'Keto' },
  ]

  return (
    <MultiDropdown
      options={options}
      values={state.criteria && state.criteria.map(label => ({ key: label.toLowerCase(), label }))}
      onChange={criteria => {
        dispatch({ type: Actions.SET_CRITERIA, payload: criteria.map(prop('label')) })
      }}
      placeholder="Criteria"
    />
  )
}
