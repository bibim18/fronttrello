import React from 'react'
import Card from './cardContainer'

const Cards = ({ cards, ...rest }) => {
  const cardItem = cards.map((c, idx) => (
    <Card key={c._id} card={c} index={idx} {...rest} />
  ))

  return <div>{cardItem}</div>
}

export default Cards
