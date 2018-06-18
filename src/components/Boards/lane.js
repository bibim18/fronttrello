import React, { Component } from 'react'
import styled from 'styled-components'
import del from '../../images/del.png'
import AddCard from './Addcard'
import Card from './card'
import { deleteBoard, delCard } from '../../actions/homeAction'

import { connect } from 'react-redux'

const Square = styled.div`
  width: 270px;
  display: inline-block;
  height: 810px;
  overflow: hidden;
  min-height: 50px;
  background-color: #e2e4e6;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  margin-right: 20px;
  margin-left: 5px;
  margin-top:10px
  vertical-align: top;
`
const Body = styled.article`
  width: 240px;
  height: 715px;
  background-color: #e2e4e6;
  top: 110px;
  margin-left: 15px;
`

const Header = styled.header`
  width: 270px;
  height: 35px;
  text-align: center;
  margin-top: 10px;
`
const Footer = styled.footer`
  width: 270px;
  height: 50px;
  text-align: center;
  margin-bottom: 10px;
`

const Del = styled.img`
  float: right;
  width: 20px;
  hight: 20px;
  margin-right: 20px;
`
class Lane extends Component {
  state = {
    isHaveCard: false,
  }

  handdleClickAdd = () => {
    this.setState({ isHaveCard: true })
  }
  handdleCancleAdd = () => {
    this.setState({ isHaveCard: false })
  }
  handleDelete = (e, laneid, cardid) => {
    e.stopPropagation()
    this.props.handleDeleteCard(laneid, cardid)
  }

  render() {
    const cardinfo = this.props.board.card_info.map(card => (
      <Card
        key={card._id}
        card={card}
        board={this.props.board}
        handleDelete={this.handleDelete}
      />
    ))

    return (
      <Square>
        <Header>
          {this.props.board.title}
          <a
            onClick={e => this.props.handleDeleteBoard(e, this.props.board._id)}
          >
            <Del src={del} alt="Delete Button" />
          </a>
        </Header>
        <Body>{cardinfo}</Body>
        <Footer>
          {this.state.isHaveCard ? (
            <AddCard
              handdleCancleAdd={this.handdleCancleAdd}
              _laneid={this.props.board._id}
            />
          ) : (
            <button onClick={this.handdleClickAdd}>ADD CARD</button>
          )}
        </Footer>
      </Square>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getShowCard: id => {
      dispatch(showCard(id))
    },
    handleDeleteCard: (laneid, cardid) => {
      dispatch(delCard(laneid, cardid))
    },
  }
}
const mapStateToProps = state => {
  return { boards: state.homes.boards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane)
