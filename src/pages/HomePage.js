import React, { Component } from 'react'
import HeaderBar from '../components/HeaderBar'
import { addBoard, showBoard, deleteBoard } from '../actions/homeAction'
import { addCard } from '../actions/cardAction'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FreeScrollBar from 'react-free-scrollbar'
import { LaneList } from '../components/Boards/laneList'
import logo from '../images/logo.png'

const Root = styled.div`
  height: 100vh;
  background-color: #4c63f7;
`
const Logo = styled.img`
  width: 110px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  padding-top: 27px;
  display: block;
`
const Header = styled.header`
  background-color: black;
  height: 90px;
`
class HomePage extends Component {
  state = {
    boardName: '',
  }

  componentDidMount() {
    this.props.getShowBoard()
  }

  handleDeleteBoard = (e, id) => {
    e.stopPropagation()
    this.props.handleDelete(id)
  }

  handleChange = e => {
    this.setState({ boardName: e.target.value })
  }

  handleClick = () => {
    this.props.handleAddBoard(this.state.boardName)
    this.setState({ boardName: '' })
  }

  render() {
    return (
      <Root>
        <Header>
          <Logo src={logo} alt="Logo" />
        </Header>
        <br />
        <input
          value={this.state.boardName}
          onChange={this.handleChange}
          placeholder="Add your title"
        />
        <button onClick={this.handleClick}>Add</button>
        <LaneList
          boards={this.props.boards}
          handleDeleteBoard={this.handleDeleteBoard}
        />
      </Root>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleAddBoard: text => {
      dispatch(addBoard(text))
    },
    getShowBoard: text => {
      dispatch(showBoard())
    },
    handleDelete: id => {
      dispatch(deleteBoard(id))
    },
  }
}
const mapStateToProps = state => {
  return { boards: state.homes.boards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
