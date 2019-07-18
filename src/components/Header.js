import React, { useContext } from 'react'
import { StoreContext } from '../App'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'

export default function Header({ className }) {
  const { state } = useContext(StoreContext)

  return (
    <div className={className}>
      <div className="container">
        <nav className="nav">
          <ul className="navList">
            <li className="navListItem">
              <Link className="navLink" to="/">
                <FontAwesomeIcon icon={faHome} alt="Home" />
              </Link>
            </li>
            {state.token == null && (
              <li className="navListItem">
                <Link className="navLink" to="/auth">
                  <FontAwesomeIcon icon={faSignInAlt} alt="Login/Register" />
                </Link>
              </li>
            )}
            {state.token != null && (
              <li className="navListItem">
                <Link className="navLink" to="/settings">
                  <FontAwesomeIcon icon={faCog} alt="User Settings" />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}
