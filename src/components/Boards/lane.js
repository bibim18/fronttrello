import React, { Component } from 'react'
import styled from 'styled-components'
import del from '../../images/del.png'
import AddCard from './Addcard'
import Card from './card'
import { deleteBoard, delCard, editCard } from '../../actions/homeAction'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

const Square = styled.div`
  width: 270px;
  display: inline-block;
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
  width: 245px;
  background-color: #e2e4e6;
  top: 110px;
  max-height: 700px;
  margin-left: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Header = styled.header`
  width: 270px;
  height: 35px;
  text-align: center;
  margin-top: 10px;
`
const Footer = styled.footer`
  margin-top: 10px
  width: 270px;
  height: 60px;
  text-align: center;
  margin-bottom: 10px;
`

const Del = styled.div`
  float: right;
  margin-right: 20px;
  margin-top: 0px;
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
  handleEdit = (e, id, title, des, att, com) => {
    e.stopPropagation()
    this.props.getEdit(id, title, des, att, com)
  }

  render() {
    const cardinfo = this.props.board.card_info.map(card => (
      <Card
        key={card._id}
        card={card}
        board={this.props.board}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEdit}
      />
    ))

    return (
      <Square>
        <Header>
          {this.props.board.title}
          <Del>
            <Button
              color="danger"
              onClick={e =>
                this.props.handleDeleteBoard(e, this.props.board._id)
              }
            >
              Del
            </Button>
          </Del>
        </Header>
        <Body>{cardinfo}</Body>
        <Footer>
          {this.state.isHaveCard ? (
            <AddCard
              handdleCancleAdd={this.handdleCancleAdd}
              _laneid={this.props.board._id}
            />
          ) : (
            <Button color="success" onClick={this.handdleClickAdd}>
              {' '}
              + ADD A CARD{' '}
            </Button>
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
    getEdit: (id, title, des, att, com) => {
      dispatch(editCard(id, title, des, att, com))
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
