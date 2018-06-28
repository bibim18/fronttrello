import Lane from './lane'

import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { moveBoard, attachToBoard } from '../../../actions/homeAction'

const boardSource = {
  beginDrag(props, component) {
    const item = {
      id: props.board._id,
      title: props.board.title,
      index: props.index,
      boardId: props.boardId,
    }
    return item
  },

  isDragging(props, monitor) {
    return props._id === monitor.getItem()._id
  },
}

const boardTarget = {
  drop(targetProps, monitor, component) {
    const targetId = targetProps.board._id
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

    if (targetId !== sourceId && sourceType === 'BOARD') {
      targetProps.onMoveBoard(item, targetProps.allBoard)
    } else if (!targetProps.board.card_info.length && sourceType === 'CARD') {
      targetProps.attachToBoard(item, targetProps.allBoard)
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
  onMoveBoard(item, allBoard) {
    dispatch(moveBoard(item, allBoard))
  },
  attachToBoard(item, allBoard) {
    dispatch(attachToBoard(item, allBoard))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource('BOARD', boardSource, collectDragSource)(
    DropTarget(['CARD', 'BOARD'], boardTarget, collectDropTarget)(Lane)
  )
)
