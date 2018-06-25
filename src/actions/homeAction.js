import axios from 'axios'
import _ from 'lodash'
//ต้องกำหนด export ให้ทุก action
//this is action creator
const apiURL = `http://localhost:2000/`

export const addBoard = text => {
  return function(dispatch) {
    const data = { title: text }
    axios.post(`${apiURL}lane`, data).then(response => {
      dispatch({ type: 'ADD_BOARD', payload: response.data })
    })
  }
}

export const showBoard = () => {
  return function(dispatch) {
    axios.get(`${apiURL}lane`).then(response => {
      dispatch({ type: 'SHOW_BOARD', payload: response.data })
    })
  }
}

export const deleteBoard = id => {
  return function(dispatch) {
    axios.delete(`${apiURL}lane/${id}`).then(response => {
      dispatch({ type: 'DELETE_BOARD', payload: response.data })
    })
  }
}

export const addCard = (id, text) => {
  return function(dispatch) {
    const data = {
      cardTitle: text,
    }
    axios.post(`${apiURL}card/${id}`, data).then(response => {
      dispatch({
        type: 'ADD_CARD',
        payload: response.data,
      })
    })
  }
}

export const delCard = (laneid, cardid) => {
  return function(dispatch) {
    const data = { laneid, cardid }
    axios.delete(`${apiURL}lane/${laneid}/${cardid}`).then(response => {
      dispatch({
        type: 'DELETE_CARD',
        payload: response.data,
      })
    })
  }
}

export const editCard = (id, cardTitle, description, attachment, comment) => {
  return function(dispatch) {
    const data = { cardTitle, description, attachment, comment }
    axios.patch(`${apiURL}card/${id}`, data).then(response => {
      console.log(response)
      dispatch({
        type: 'EDIT_CARD',
        payload: response.data,
      })
    })
  }
}

export const moveBoard = (item, allBoard) => dispatch => {
  console.log('moveBoard Action !!')
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx

  //Remove Source Board
  const [removed] = boards.splice(startIndex, 1)
  //Insert Source Board to targetIndex
  boards.splice(endIndex, 0, removed)

  //Now We have NewBoards
  console.log('Newboards =', boards)

  boards.map(board =>
    board.card_info.map(card => {
      return (card._cardid = card._id)
    })
  )

  //Update Backend here
  axios.patch(`${apiURL}lane`, boards).then(res => {
    console.log('res ', res)
    dispatch({
      type: 'MOVE_BOARD',
      payload: res.data,
    })
  })
}
