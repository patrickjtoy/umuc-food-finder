import React, { useEffect, useRef, useState } from 'react'
import 'react-dropdown/style.css'
import './MultiDropdown.scss'

const Dropdown = ({ onChange = () => {}, options = [], placeholder = 'Select...', values = [] }) => {
  const [state, setState] = useState({
    el: useRef(null),
    isOpen: false,
  })

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, false)
    document.addEventListener('touchend', handleDocumentClick, false)

    return () => {
      document.removeEventListener('click', handleDocumentClick, false)
      document.removeEventListener('touchend', handleDocumentClick, false)
    }
  })

  const handleDocumentClick = event => {
    if (!state.el.current.contains(event.target)) {
      if (state.isOpen) {
        setState({ ...state, isOpen: false })
      }
    }
  }

  const handleMouseDown = event => {
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    setState({ ...state, isOpen: !state.isOpen })
  }

  const renderOption = ({ key, label }) => {
    const isSelected = values.map(value => value.key).includes(key)
    const handleChange = () =>
      onChange(
        isSelected
          ? values.filter(value => {
              return value.key !== key
            })
          : [...values, { key, label }]
      )

    return (
      <div
        key={key}
        className={`Dropdown-option ${isSelected && 'is-selected'}`}
        onClick={handleChange}
        role="option"
        aria-selected={isSelected ? 'true' : 'false'}
      >
        {label}
      </div>
    )
  }

  return (
    <div ref={state.el} className={`Dropdown-root dropdown ${state.isOpen && 'is-open'}`}>
      <div
        className="Dropdown-control"
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        aria-haspopup="listbox"
      >
        <div className="Dropdown-placeholder">
          {values.length === 0 ? placeholder : values.map(value => value.label).join(', ')}
        </div>
        <div className="Dropdown-arrow-wrapper">
          <span className="Dropdown-arrow" />
        </div>
      </div>
      {state.isOpen ? (
        <div className="Dropdown-menu" aria-expanded="true">
          {options.length === 0 ? (
            <div className="Dropdown-noresults">No options found</div>
          ) : (
            options.map(renderOption)
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown
