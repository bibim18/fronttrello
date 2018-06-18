import React from 'react'
import del from '../../images/delcard.png'
import styled from 'styled-components'

const Del = styled.img`
  float: right;
  width: 20px;
  hight: 20px;
  margin-right: 20px;
`

const Card = props => {
  return (
    <div>
      {props.card.cardTitle}{' '}
      <a onClick={e => props.handleDelete(e, props.board._id, props.card._id)}>
        <Del src={del} alt="ddd" />
      </a>
    </div>
  )
}

export default Card
