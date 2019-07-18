import React from 'react'
import BusinessItem from '../../components/BusinessItem'
import Header from '../../components/Header'
import './index.scss'

export default function Results({ history }) {
  const results = history.location.state.results.map(business => (
    <div className="col-lg-4">
      <BusinessItem key={business.id} business={business} />
    </div>
  ))
  return (
    <div>
      <Header className="header header-results" />
      <div className="container">
        <h3 className="result-heading">The Food Finder algorithm suggests these restaurants:</h3>
        <div className="row">{results}</div>
      </div>
    </div>
  )
}
