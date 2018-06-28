import Card from './card.js'

import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

import { moveCard } from '../../../actions/homeAction'

const cardSource = {
  beginDrag(props, component) {
    console.log('cardSource =', props)
    // const item = {
    //   id: props.card.id,
    //   title: props.card.title,
    //   index: props.index,
    // }
    // return item
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  },
}

const cardTarget = {
  drop(targetProps, monitor, component) {
    // const targetId = targetProps.card.id
    // const targetIdx = targetProps.index
    // const sourceProps = monitor.getItem()
    // const sourceId = sourceProps.id
    // const sourceType = monitor.getItemType()
    // const sourceIdx = sourceProps.index
    // const item = {
    //   source: {
    //     sourceId,
    //     sourceIdx,
    //   },
    //   target: {
    //     targetId,
    //     targetIdx,
    //   },
    // }
    // if (targetId !== sourceId && sourceType === 'CARD') {
    //   console.log('item =', item)
    //   targetProps.onMoveCard(item, targetProps.allBoard)
    // }
  },
}

const collectDragSource = (DnDconnect, monitor) => ({
  connectDragSource: DnDconnect.dragSource(),
  connectDragPreview: DnDconnect.dragPreview(),
  isDragging: monitor.isDragging(),
})

const collectDropTarget = (DnDconnect, monitor) => ({
  connectDropTarget: DnDconnect.dropTarget(),
  isOver: monitor.isOver(),
})

const mapStateToProps = state => ({
  // allBoard: state.boards.board,
})

const mapDispatchToProps = dispatch => ({
  // onMoveCard(item, allBoard) {
  //   dispatch(moveCard(item, allBoard))
  // },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource('CARD', cardSource, collectDragSource)(
    DropTarget('CARD', cardTarget, collectDropTarget)(Card)
  )
)
