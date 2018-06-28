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
    axios.get(`${apiURL}lane`).then(res => {
      console.log('res ', res)
      let da = res.data
      da.map(d => {
        return d.card_info.sort((a, b) => a.index - b.index)
      })

      dispatch({
        type: 'SHOW_BOARD',
        payload: da,
      })
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

export const editCard = (id, cardTitle, description, comment) => {
  return function(dispatch) {
    const data = { cardTitle, description, comment }
    axios.patch(`${apiURL}card/${id}`, data).then(response => {
      console.log(response)
      dispatch({
        type: 'EDIT_CARD',
        payload: response.data,
      })
    })
  }
}

export const upload = (id, attachment) => {
  return function(dispatch) {
    console.log('action ', id, attachment)
    dispatch({
      type: 'UPLOAD_FILE',
      payload: { id, attachment },
    })
  }
}

export const addTag = (id, tag) => {
  return function(dispatch) {
    const data = { tag }
    axios.patch(`${apiURL}card/tag/${id}`, tag).then(response => {
      dispatch({
        type: 'ADD_TAG',
        payload: response.data,
      })
    })
  }
}

export const moveBoard = (item, allBoard) => dispatch => {
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
  axios.patch(`${apiURL}lane`, boards).then(res => {
    dispatch({
      type: 'MOVE_BOARD',
      payload: res.data,
    })
  })
}

export const moveCard = (item, allBoard) => dispatch => {
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx
  console.log('cc ', boards)
  //move in same lane
  if (item.source.sourceBoard === item.target.targetBoard) {
    const bIndex = boards.findIndex(b => b._id === item.source.sourceBoard)
    const [removed] = boards[bIndex].card_info.splice(startIndex, 1)

    boards[bIndex].card_info.splice(endIndex, 0, removed)

    boards.map(b =>
      b.card_info.map((c, idx) => ((c._cardid = c._id), (c.index = idx)))
    )

    const cards = boards.map(b => b.card_info)

    let Arraycard = []

    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].length; j++) {
        Arraycard.push(cards[i][j])
      }
    }

    axios.patch(`${apiURL}lane/card`, Arraycard).then(res => {
      console.log('res ', res)
      let da = res.data
      da.map(d => {
        return d.card_info.sort((a, b) => a.index - b.index)
      })

      dispatch({
        type: 'MOVE_CARD',
        payload: da,
      })
    })
  } else {
    const sbIndex = boards.findIndex(b => b._id === item.source.sourceBoard)
    const tbIndex = boards.findIndex(b => b._id === item.target.targetBoard)
    const [removed] = boards[sbIndex].card_info.splice(startIndex, 1)

    boards[tbIndex].card_info.splice(endIndex, 0, removed)
    boards.map(b =>
      b.card_info.map((c, idx) => ((c._cardid = c._id), (c.index = idx)))
    )

    const cards = boards.map(b => b.card_info)

    let Arraycard = []

    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].length; j++) {
        Arraycard.push(cards[i][j])
      }
    }

    const data = {
      card: Arraycard,
      lane: boards,
    }

    console.log('New board anotherlane', data)

    axios.patch(`${apiURL}lane/cards`, data).then(res => {
      console.log('res ', res)
      let da = res.data
      da.map(d => {
        return d.card_info.sort((a, b) => a.index - b.index)
      })

      dispatch({
        type: 'MOVE_CARD',
        payload: da,
      })
    })
  }
}

export const attachToBoard = (item, allBoard) => dispatch => {
  console.log('attach Action !!')
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx
  const sbIndex = boards.findIndex(b => b.id === item.source.sourceBoard)
  const tbIndex = boards.findIndex(b => b.id === item.target.targetBoard)

  console.log(boards, startIndex, endIndex, sbIndex, tbIndex)

  const [removed] = boards[sbIndex].card_info.splice(startIndex, 1)
  boards[tbIndex].card_info.push(removed)

  boards.map(b => {
    b.card_info.map((c, idx) => {
      c.index = idx
    })
  })

  console.log('NewBoards =', boards)

  dispatch({
    type: 'MOVE_CARD',
    payload: boards,
  })
}
