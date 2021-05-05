import { combineReducers } from 'redux'
import note from './note'
import question from './question'
import post from './post'
import media from './media'

export default combineReducers({
  note,
  question,
  post,
  media
})