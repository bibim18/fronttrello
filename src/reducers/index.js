import { combineReducers } from 'redux'
import homes from './homeReducer'
import card from './cardReducer'

export default combineReducers({
  //  เอา reducer ทุกตัวที่จะเอามาใช้มารวม
  homes,
  card,
})
