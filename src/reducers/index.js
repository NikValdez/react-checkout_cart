import { combineReducers } from 'redux'
import promoCodeReducer from './reducers_promo_code'

export default combineReducers({
  promoCode: promoCodeReducer
})
