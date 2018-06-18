const INITIAL_STATE = {
  //cards: []
}
const card = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_CARD':
      return { ...state, cards: action.payload }
    default:
      return state //Return Initial State ลกับไปที่หน้าบ้าน ซึ่งเป็นตัวเดิมที่ส่งมา
  }
}
export default card
