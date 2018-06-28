import Card from './card.js'

import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

import { moveCard } from '../../../actions/homeAction'

const cardSource = {
  beginDrag(props, component) {
    console.log('cardSource =', props)
    const item = {
      id: props.card._id,
      title: props.card.cardTitle,
      index: props.index,
      boardId: props.board._id,
    }
    return item
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  },
}

const cardTarget = {
  drop(targetProps, monitor, component) {
    const targetId = targetProps.card._id
    const targetIdx = targetProps.index
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id
    const sourceType = monitor.getItemType()
    const sourceIdx = sourceProps.index
    const sourceBoard = sourceProps.boardId
    const targetBoard = targetProps.board._id

    const item = {
      source: {
        sourceId,
        sourceIdx,
        sourceBoard,
      },
      target: {
        targetId,
        targetIdx,
        targetBoard,
      },
    }
    if (targetId !== sourceId && sourceType === 'CARD') {
      targetProps.onMoveCard(item, targetProps.allBoard)
    }
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
  allBoard: state.homes.boards,
})

const mapDispatchToProps = dispatch => ({
  onMoveCard(item, allBoard) {
    dispatch(moveCard(item, allBoard))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource('CARD', cardSource, collectDragSource)(
    DropTarget('CARD', cardTarget, collectDropTarget)(Card)
  )
)
