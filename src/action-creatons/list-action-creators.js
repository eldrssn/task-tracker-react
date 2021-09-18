export const addCard = (card) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_CARD',
      payload: card
    })
  }
}

export const doneCard = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'DONE_CARD',
      payload: id
    })
  }
}

export const deleteCard = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_CARD',
      payload: id
    })
  }
}

export const dropCard = (info) => {
  return (dispatch) => {
    dispatch({
      type: 'DROP_CARD',
      payload: info
    })
  }
}

