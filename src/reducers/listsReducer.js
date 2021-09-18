import { data } from "../data";

const initialState = data;

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return state.map(list => {
        if (list.id === action.payload.id) {
        list.cards = [action.payload.card, ...list.cards ];
        }
        return list;
      })

    case 'DONE_CARD':
      return state.map(list => {
        let cardDone;
        
        list.cards = list.cards.map(card => {
          if (card.id === action.payload) {
            cardDone = card;
            cardDone.done = true;
          }
          return card;
        })

        if (cardDone) {
          list.cards = list.cards.filter(card => card !== cardDone);
          list.cards = [...list.cards, cardDone];
        }
        return list;
      })

    case 'DELETE_CARD':
      return state.map(list => {
        list.cards = list.cards.filter(card => card.id !== action.payload);
        return list;
        });
    
    case 'DROP_CARD':
        let { id, listId, dragItem } = action.payload;
        
        let dragCard, dropCard, dropIndex;

        const dragListIndex = state.indexOf(state.find(list => {
          dragCard = list.cards.find(card => card.id === dragItem.id)
          return list.id === dragItem.listId
        }));
        const dragList = state[dragListIndex].cards.filter(card => card.id !== dragItem.id);

        
        const dropListIndex = state.indexOf(state.find(list => {
          dropCard = list.cards.find(card => card.id === id);
          dropIndex = list.cards.indexOf(dropCard);
          return list.id === listId
        }));
        const dropList = state[dropListIndex].cards;
        dropList.splice(dropIndex, 0, dragCard);
        
        if (dragItem.listId === listId) {
          dragList.splice(dropIndex, 0, dragCard);
        }

        return state.map(list => {
          if (list.id === listId) {
            list.cards = dropList;
          }
          if (list.id === dragItem.listId) {
            list.cards = dragList;
          }
          return list;
        })

    default: 
      return state;
  }
}

export default listsReducer;