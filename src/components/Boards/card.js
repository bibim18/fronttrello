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
} from 'reactstrap'
const Del = styled.div`
  float: right;
  width: 10px;
  hight: 10px;
  margin-right: 20px;
`
const CardApply = styled(Card)`
  .card-body {
    flex: 1 1 auto;
    padding: 0.25rem;
    width: 215px;
  }
`

class card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
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
                <Button
                  onClick={e =>
                    this.props.handleDelete(
                      e,
                      this.props.board._id,
                      this.props.card._id
                    )
                  }
                >
                  X
                </Button>
              </Del>
            </CardTitle>
          </CardBody>
        </CardApply>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.card.cardTitle}
          </ModalHeader>
          <ModalBody>
            Description: {this.props.card.description}
            <br />
            Attachments: {this.props.card.attachment}
            <br />
            Add Comment: {this.props.card.comment}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default card
