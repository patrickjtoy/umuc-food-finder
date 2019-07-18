import React, { useContext } from 'react'
import { StoreContext } from '../../App'
import Actions from '../../state/actions'
import Header from '../../components/Header'
import Jumbotron from '../../components/Jumbotron'
import SearchFields from '../../components/SearchFields'
import './index.scss'

export default function Home({ history }) {
  const { state, dispatch } = useContext(StoreContext)

  const onSubmit = event => {
    // Prevent standard HTML form submission
    event.preventDefault()

    dispatch({ type: Actions.SET_LOADING, payload: true })

    fetch('/api/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: state.search,
        location: state.location,
        price: state.price + 1, // price is zero-based, but the API expects a non-negative integer
        criteria: state.criteria,
      }),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: Actions.SET_LOADING, payload: false })
        history.push('/results', { results: data })
      })
      .catch(e => console.error(e))
  }

  return (
    <>
      <Header className="header header-home" />
      <div className="page-home">
        <div className="container">
          <Jumbotron />
          <form className="search" onSubmit={onSubmit}>
            <SearchFields />

            <div className="search__field search__field--offset">
              {state.loading ? (
                <button type="submit" className="btn btn-primary btn-disabled" disabled>
                  Loading...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
