import React, { Component } from 'react'
import Lane from './lane'
import styled from 'styled-components'

const Square = styled.div`
  width: 270px;
  display: inline-block;
  height: 800px;
  overflow: hidden;
  min-height: 50px;
  background-color: #e2e4e6;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  padding-bottom: 20px;
  margin-right: 20px;
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
const LaneList = props => {
  const lanes = props.boards.map(board => (
    <Lane
      key={board._id}
      board={board}
      handleDeleteBoard={props.handleDeleteBoard}
    />
  )) //ไม่ต้องใส่ index เพราะมันวนจาก index ให้อยู่แล้ว
  return <CardWrapper>{lanes}</CardWrapper>
}
export { LaneList }
