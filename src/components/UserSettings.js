import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../App'
import './UserSettings.scss'
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormCheckbox,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
} from 'shards-react'
/* Using "Shards Dashboard Lite, Free-License" */

export default function UserSettings({ onSubmit }) {
  const { state } = useContext(StoreContext)
  const [formState, setFormState] = useState(state)

  useEffect(() => {
    fetch('/api/preference', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token,
      },
    })
      .then(response => response.json())
      .then(data => {
        setFormState({ ...formState, ...data })
      })
  }, [state.token])

  const handleCheckboxChange = value => {
    if (formState.criteria.includes(value)) {
      setFormState({ ...formState, criteria: formState.criteria.filter(item => item !== value) })
    } else {
      setFormState({ ...formState, criteria: [...formState.criteria, value] })
    }
  }

  return (
    <>
      <Form
        onSubmit={event => {
          // Prevent standard HTML form submission
          event.preventDefault()

          onSubmit(formState)
        }}
      >
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Profile</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">First Name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="First Name"
                        value={formState.firstName}
                        onChange={event => setFormState({ ...formState, firstName: event.target.value })}
                        readOnly
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">Last Name</label>
                      <FormInput
                        id="feLastName"
                        placeholder="Last Name"
                        value={formState.lastName}
                        onChange={event => setFormState({ ...formState, lastName: event.target.value })}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        autoComplete="email"
                        value={formState.email}
                        onChange={event => setFormState({ ...formState, email: event.target.value })}
                        readOnly
                      />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group readonly">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput
                        type="password"
                        id="fePassword"
                        placeholder="Password"
                        autoComplete="current-password"
                        readOnly
                      />
                    </Col>
                  </Row>
                  <FormGroup>
                    <label htmlFor="feAddress">Address</label>
                    <FormInput
                      id="feAddress"
                      placeholder="Address"
                      value={formState.address}
                      onChange={event => setFormState({ ...formState, address: event.target.value })}
                      readOnly
                    />
                  </FormGroup>
                  <Row form>
                    {/* City */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feCity">City</label>
                      <FormInput
                        id="feCity"
                        placeholder="City"
                        value={formState.city}
                        onChange={event => setFormState({ ...formState, city: event.target.value })}
                        readOnly
                      />
                    </Col>
                    {/* State */}
                    <Col md="4" className="form-group">
                      <label htmlFor="feInputState">State</label>
                      <FormSelect
                        id="feInputState"
                        value={formState.state}
                        onChange={event => setFormState({ ...formState, state: event.target.value })}
                        readOnly
                      >
                        <option value="">Select</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </FormSelect>
                    </Col>
                    {/* Zip Code */}
                    <Col md="2" className="form-group">
                      <label htmlFor="feZipCode">Zip</label>
                      <FormInput
                        id="feZipCode"
                        placeholder="Zip Code"
                        value={formState.location}
                        onChange={event => setFormState({ ...formState, location: event.target.value })}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Description */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feDescription">Description</label>
                      <FormTextarea
                        id="feDescription"
                        rows="5"
                        value={formState.description}
                        onChange={event => setFormState({ ...formState, description: event.target.value })}
                        readOnly
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
        <Card>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Preferences</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row form>
                {/* Preferences */}
                <Col md="3" className="form-group">
                  <label htmlFor="feExpense">Expense Rating</label>
                  <FormSelect
                    id="feExpense"
                    value={formState.price}
                    onChange={event =>
                      setFormState({
                        ...formState,
                        price: event.target.value,
                      })
                    }
                  >
                    <option value={0}>$</option>
                    <option value={1}>$$</option>
                    <option value={2}>$$$</option>
                  </FormSelect>
                </Col>
                <Col md="3" />
                <Col md="3" className="form-group">
                  <label htmlFor="feCriteria">Criteria</label>
                  <FormCheckbox
                    checked={formState.criteria.includes('Vegetarian')}
                    onChange={() => handleCheckboxChange('Vegetarian')}
                  >
                    Vegetarian
                  </FormCheckbox>
                  <FormCheckbox
                    checked={formState.criteria.includes('Vegan')}
                    onChange={() => handleCheckboxChange('Vegan')}
                  >
                    Vegan
                  </FormCheckbox>
                  <FormCheckbox
                    checked={formState.criteria.includes('Gluten-Free')}
                    onChange={() => handleCheckboxChange('Gluten-Free')}
                  >
                    Gluten-Free
                  </FormCheckbox>
                  <FormCheckbox
                    checked={formState.criteria.includes('Paleo')}
                    onChange={() => handleCheckboxChange('Paleo')}
                  >
                    Paleo
                  </FormCheckbox>
                  <FormCheckbox
                    checked={formState.criteria.includes('Keto')}
                    onChange={() => handleCheckboxChange('Keto')}
                  >
                    Keto
                  </FormCheckbox>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
        <Button className="btn btn-primary float-right mt-4 mb-4">Update Account</Button>
      </Form>
    </>
  )
}
