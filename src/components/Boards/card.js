import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import { ModalCard } from './modal'

const Del = styled.div`
  float: right;
  width: 10px;
  hight: 10px;
  margin-right: 20px;
`
const CardApply = styled(Card)`
  .card-body {
    flex: 1 1 auto;
    padding: 0.1rem;
    width: 215px;
    white-space: normal;
    word-wrap: break-word;
  }
  &:hover {
    background-color: #cfd3eb;
    .btn-secondary {
      color: #cfd3eb;
      background-color: #cfd3eb;
      border-color: #cfd3eb;
    }
  }
`
const ButtonApply = styled(Button)`
  color: #fff;
  background-color: #fff;
  border-color: #fff;
  &:hover {
    color: #fff !important;
    border-color: #fff !important;
    background-color: #8c8e9a !important;
  }
`

class card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      descriptionedit: true,
      title: this.props.card.cardTitle,
      des: this.props.card.description,
      att: this.props.card.attachment,
      com: this.props.card.comment,
    }
    this.toggle = this.toggle.bind(this)
  }
  handleEditDes = () => {
    this.setState({ descriptionedit: !this.state.descriptionedit })
  }

  toggle = e => {
    this.setState({
      modal: !this.state.modal,
    })
  }
  handleSave = e => {
    this.props.handleEdit(
      e,
      this.props.card._id,
      this.state.title,
      this.state.des,
      this.state.att,
      this.state.com
    )
  }
  handleChange = (field, e) => {
    this.setState({ [field]: e.target.value })
  }
  twiceFunction = e => {
    this.handleSave(e)
    this.toggle(e)
  }
  render() {
    return (
      <div>
        <br />
        <CardApply onClick={this.toggle}>
          <CardBody>
            <CardTitle>
              {this.props.card.cardTitle}
              <Del>
                <ButtonApply
                  onClick={e =>
                    this.props.handleDelete(
                      e,
                      this.props.board._id,
                      this.props.card._id
                    )
                  }
                >
                  X
                </ButtonApply>
              </Del>
            </CardTitle>
          </CardBody>
        </CardApply>

        <ModalCard
          card={this.props.card}
          board={this.props.board}
          handleChange={this.handleChange}
          toggle={this.toggle}
          twiceFunction={this.twiceFunction}
          modalopen={this.state.modal}
          des={this.state.des}
          att={this.state.att}
          com={this.state.com}
          descriptionedit={this.state.descriptionedit}
          handleEditDes={this.handleEditDes}
        />
      </div>
    )
  }
}

export default card
