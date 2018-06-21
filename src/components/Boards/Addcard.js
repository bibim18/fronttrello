import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCard } from '../../actions/homeAction'
import { Button } from 'reactstrap'

//const AddCard = (props) => {
class AddCard extends Component {
  state = {
    cardName: '',
  }

  handleChangeCard = e => {
    this.setState({ cardName: e.target.value })
  }
  handleClickSaveCard = () => {
    this.props.handleSave(this.props._laneid, this.state.cardName)
    this.setState({ cardName: '' })
    this.setState({ isHaveCard: false })
  }
  render() {
    console.log('props in addcard ', this.props)
    return (
      <div align="center">
        <input
          value={this.state.cardName}
          onChange={this.handleChangeCard}
          placeholder="Add Card Title"
        />
        <br />
        <Button color="info" onClick={this.handleClickSaveCard}>
          save
        </Button>
        <Button color="danger" onClick={this.props.handdleCancleAdd}>
          cancle
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSave: (id, text) => {
      dispatch(addCard(id, text))
    },
  }
}

const mapStateToProps = state => {
  return { cards: state.card.cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)
