import axios from 'axios'
//ต้องกำหนด export ให้ทุก action
//this is action creator
const apiURL = `http://localhost:2000/`

const showCard = id => {
  return function(dispatch) {
    axios.get(`${apiURL}card/${id}`).then(response => {
      console.log(response)
      dispatch({ type: 'SHOW_CARD', payload: response.data })
    })
  }
}

export { addCard, showCard }
