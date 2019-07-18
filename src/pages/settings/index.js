import React, { useContext } from 'react'
import { StoreContext } from '../../App'
import Actions from '../../state/actions'
import Header from '../../components/Header'
import UserSettings from '../../components/UserSettings'
import './settings.scss'

export default function Settings({ history }) {
  const { state, dispatch } = useContext(StoreContext)

  if (state.token == null) {
    history.push('/auth')
  }

  const onSubmit = formData => {
    fetch('/api/preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token,
      },
      body: JSON.stringify({
        location: formData.location,
        price: formData.price,
        criteria: formData.criteria,
      }),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: Actions.SET_LOCATION, payload: data.location })
        dispatch({ type: Actions.SET_CRITERIA, payload: data.criteria })
        dispatch({ type: Actions.SET_EXPENSE_RATING, payload: data.price })
        history.push('/')
      })
      .catch(e => console.error(e))
  }

  return (
    <>
      <Header className="header header-settings" />
      <div className="container">
        <UserSettings onSubmit={onSubmit} />
      </div>
    </>
  )
}
