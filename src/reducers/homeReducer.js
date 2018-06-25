const INITIAL_STATE = {
  boards: [],
  boardName: '',
}
//reducer เป็นฟังก์ชั่นที่รับพารามิเตอร์สองตัว คือ stateก่อนหน้า (previous state) และ action
const homes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BOARD':
      return { ...state, boards: action.payload } //แทนที่ state เก่าด้วย state ใหม่ที่ get มาทั้งหมด
    //เพิ่ม state เก่าด้วย state ใหม่ด้วยการเพิ่มเข้าไป
    //return {...state,boards: [...state.boards,action.payload]}
    case 'SHOW_BOARD':
      return { ...state, boards: action.payload }
    case 'DELETE_BOARD':
      return { ...state, boards: action.payload }
    case 'ADD_CARD':
      return { ...state, boards: action.payload }
    case 'DELETE_CARD':
      return { ...state, boards: action.payload }
    case 'EDIT_CARD':
      return { ...state, boards: action.payload }
    case 'MOVE_BOARD':
      return { ...state, boards: action.payload }
    default:
      return state //return state ตัวเดิมที่ส่งเข้ามา
  }
}

export default homes
