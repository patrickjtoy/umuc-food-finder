import React, { useContext } from 'react'
import { StoreContext } from '../../App'
import Actions from '../../state/actions'
import { compose, equals, ifElse, omit, pick, prop } from 'ramda'
import Login from '../../components/Login'
import Register from '../../components/Register'
import Header from '../../components/Header'
import './index.scss'

export default function RegisterUser({ history }) {
  const { state, dispatch } = useContext(StoreContext)

  const isRegister = equals('register')

  const payload = ifElse(
    compose(
      isRegister,
      prop('visible')
    ),
    pick(['email', 'password', 'firstName', 'lastName']),
    pick(['email', 'password'])
  )

  const onSubmit = event => {
    // Prevent standard HTML form submission
    event.preventDefault()

    fetch(`/api/${state.visible}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload(state)),
    })
      .then(response => response.json())
      .then(({ token, user }) => {
        dispatch({ type: Actions.SET_TOKEN, payload: token })
        dispatch({ type: Actions.SET_USER, payload: user })
        history.push('/')
      })
      .catch(e => console.error(e))
  }

  return (
    <>
      <Header className="header header-login" />
      <div className="container">
        {isRegister(state.visible) ? (
          <>
            <h2>
              Register /{' '}
              <a
                href="#"
                onClick={event => {
                  event.preventDefault()
                  dispatch({ type: Actions.SET_VISIBLE, payload: 'authenticate' })
                }}
                className="h2"
              >
                Login
              </a>
            </h2>
            <form className="register" onSubmit={onSubmit}>
              <Register />
              <button type="submit" className="float-right btn btn-primary">
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>
              Login /{' '}
              <a
                href="#"
                onClick={event => {
                  event.preventDefault()
                  dispatch({ type: Actions.SET_VISIBLE, payload: 'register' })
                }}
                className="h2"
              >
                Register
              </a>
            </h2>
            <form className="register" onSubmit={onSubmit}>
              <Login />
              <button type="submit" className="float-right btn btn-primary">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
