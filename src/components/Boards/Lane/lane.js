import React, { Component } from 'react'
import styled from 'styled-components'
import del from '../../../images/del.png'
import AddCard from '../Card/Addcard'
import Cards from '../Card/cards'
import {
  deleteBoard,
  delCard,
  editCard,
  addTag,
  upload,
} from '../../../actions/homeAction'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Icon } from 'antd'

const Square = styled.div`
  width: 270px;
  overflow: hidden;
  display: inline-block;
  min-height: 50px;
  background-color: #e2e4e6;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
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
  handleEdit = (e, id, title, des, com) => {
    e.stopPropagation()
    this.props.getEdit(id, title, des, com)
  }

  render() {
    const {
      connectDragPreview,
      connectDropTarget,
      connectDragSource,
      isOver,
      isDragging,
    } = this.props

    // const cardinfo = this.props.board.card_info.map(card => (
    //   <Cards
    //     key={card._id}
    //     cards={this.props.board.card}
    //     board={this.props.board}
    //     handleDelete={this.handleDelete}
    //     handleEdit={this.handleEdit}
    //     getTag={this.props.getTag}
    //     uploadFile={this.props.uploadFile}
    //   />
    // ))

    return connectDragPreview(
      connectDragSource(
        connectDropTarget(
          <div
            style={{
              display: 'inline-block',
              opacity: isOver ? '0' : '1',
              margin: '20px',
              cursor: 'pointer',
            }}
          >
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
                    <Icon type="delete" />
                  </Button>
                </Del>
              </Header>
              <Body>
                <Cards
                  cards={this.props.board.card_info}
                  board={this.props.board}
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}
                  getTag={this.props.getTag}
                  uploadFile={this.props.uploadFile}
                />
              </Body>
              <Footer>
                {this.state.isHaveCard ? (
                  <AddCard
                    handdleCancleAdd={this.handdleCancleAdd}
                    _laneid={this.props.board._id}
                  />
                ) : (
                  <Button color="success" onClick={this.handdleClickAdd}>
                    + ADD A CARD
                  </Button>
                )}
              </Footer>
            </Square>
          </div>
        )
      )
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
    getEdit: (id, title, des, com) => {
      dispatch(editCard(id, title, des, com))
    },
    getTag: (id, tag) => {
      dispatch(addTag(id, tag))
    },
    uploadFile: (id, att) => {
      dispatch(upload(id, att))
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
