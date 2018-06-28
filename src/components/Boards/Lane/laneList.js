import React, { Component } from 'react'
import Board from './laneContainer'
import styled from 'styled-components'

const Square = styled.div`
  width: 270px;
  display: inline-block;
  height: 50px;
  overflow: hidden;
  min-height: 50px;
  background-color: #e2e4e6;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  margin-top: 20px;
  vertical-align: top;
`
const Header = styled.div`
  width: 270px;
  height: 800px;
  text-align: center;
  margin-top: 15px;
`
const CardWrapper = styled.div`
  white-space: nowrap;
`
class LaneList extends Component {
  state = {
    boardName: '',
  }
  handleChange = e => {
    this.setState({ boardName: e.target.value })
  }
  handleClick = (e, text) => {
    e.stopPropagation()
    this.props.handleAddBoard(text)
    this.setState({ boardName: '' })
  }
  render() {
    const lanes = this.props.boards.map((board, idx) => (
      <Board
        key={board._id}
        board={board}
        index={idx}
        handleDeleteBoard={this.props.handleDeleteBoard}
      />
    )) //ไม่ต้องใส่ index เพราะมันวนจาก index ให้อยู่แล้ว
    return (
      <CardWrapper>
        {lanes}
        <Square>
          <input
            value={this.state.boardName}
            onChange={this.handleChange}
            placeholder="Add your title"
          />
          <button onClick={e => this.handleClick(e, this.state.boardName)}>
            Add
          </button>
        </Square>
      </CardWrapper>
    )
  }
}
export { LaneList }
