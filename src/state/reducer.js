import Actions from './actions'

export const initialState = {
  address: '',
  city: '',
  criteria: [],
  description: '',
  email: '',
  firstName: '',
  lastName: '',
  loading: false,
  location: '',
  password: '',
  price: 0,
  search: '',
  state: '',
  token: null,
  visible: 'register',
  zip: '',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_ADDRESS:
      return { ...state, address: action.payload }
    case Actions.SET_CITY:
      return { ...state, city: action.payload }
    case Actions.SET_CRITERIA:
      return { ...state, criteria: action.payload }
    case Actions.SET_DESCRIPTION:
      return { ...state, description: action.payload }
    case Actions.SET_EMAIL:
      return { ...state, email: action.payload }
    case Actions.SET_EXPENSE_RATING:
      return { ...state, price: action.payload }
    case Actions.SET_FIRST_NAME:
      return { ...state, firstName: action.payload }
    case Actions.SET_LAST_NAME:
      return { ...state, lastName: action.payload }
    case Actions.SET_LOADING:
      return { ...state, loading: action.payload }
    case Actions.SET_LOCATION:
      return { ...state, location: action.payload }
    case Actions.SET_PASSWORD:
      return { ...state, password: action.payload }
    case Actions.SET_SEARCH:
      return { ...state, search: action.payload }
    case Actions.SET_STATE:
      return { ...state, state: action.payload }
    case Actions.SET_TOKEN:
      return { ...state, token: action.payload }
    case Actions.SET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SET_VISIBLE:
      return { ...state, visible: action.payload }
    case Actions.SET_ZIP:
      return { ...state, zip: action.payload }
    default:
      return state
  }
}
