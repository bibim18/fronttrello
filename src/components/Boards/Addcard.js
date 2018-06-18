import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCard } from '../../actions/homeAction'

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
    return (
      <div align="center">
        <input
          value={this.state.cardName}
          onChange={this.handleChangeCard}
          placeholder="Add Card Title"
        />
        <br />
        <button onClick={this.handleClickSaveCard}>SAVE</button>
        <button onClick={this.props.handdleCancleAdd}>CANCLE</button>
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
