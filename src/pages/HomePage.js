import React, { Component } from 'react'
import HeaderBar from '../components/HeaderBar'
import { addBoard, showBoard, deleteBoard } from '../actions/homeAction'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { LaneList } from '../components/Boards/Lane/laneList'
import logo from '../images/logo.png'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import swal from 'sweetalert2'

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
  componentDidMount() {
    this.props.getShowBoard()
  }

  handleDeleteBoard = (e, id) => {
    swal({
      title: 'Are you sure?',
      text: 'ต้องการจะลบใช่หรือไม่!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        e.stopPropagation()
        this.props.handleDelete(id)
        swal('Deleted!', 'Your lane has been deleted.', 'success')
      }
    })
  }

  render() {
    return (
      <Root>
        <Header>
          <Logo src={logo} alt="Logo" />
        </Header>
        <LaneList
          boards={this.props.boards}
          handleDeleteBoard={this.handleDeleteBoard}
          handleAddBoard={this.props.handleAddBoard}
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

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
)
