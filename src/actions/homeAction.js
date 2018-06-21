import axios from 'axios'
//ต้องกำหนด export ให้ทุก action
//this is action creator
const apiURL = `http://localhost:2000/`

const addBoard = text => {
  return function(dispatch) {
    const data = { title: text }
    axios.post(`${apiURL}lane`, data).then(response => {
      dispatch({ type: 'ADD_BOARD', payload: response.data })
    })
  }
}

const showBoard = () => {
  return function(dispatch) {
    axios.get(`${apiURL}lane`).then(response => {
      dispatch({ type: 'SHOW_BOARD', payload: response.data })
    })
  }
}

const deleteBoard = id => {
  return function(dispatch) {
    axios.delete(`${apiURL}lane/${id}`).then(response => {
      dispatch({ type: 'DELETE_BOARD', payload: response.data })
    })
  }
}

const addCard = (id, text) => {
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

const delCard = (laneid, cardid) => {
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

const editCard = (id, cardTitle, description, attachment, comment) => {
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

const addname = text => {
  return
}

export { addBoard, deleteBoard, showBoard, addCard, delCard, editCard }
