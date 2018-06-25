import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import styled from 'styled-components'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap'
import ImageUploader from 'react-images-upload'

const TT = styled.div`
  font-size: 14px;
`
const ButtonApply = styled(Button)`
  margin-left: 310px;
`

export const ModalCard = props => {
  return (
    <Modal
      isOpen={props.modalopen}
      toggle={props.toggle}
      className={props.className}
      size="lg"
    >
      <ModalHeader toggle={e => props.toggle(e)}>
        {props.card.cardTitle}
        <TT>in list {props.board.title}</TT>
      </ModalHeader>
      <ModalBody>
        <Table>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faList} /> Description
              </td>
              <td>
                <div onClick={props.handleEditDes}>
                  {props.des === '' ? (
                    <textarea onChange={e => props.handleChange('des', e)} />
                  ) : props.descriptionedit ? (
                    props.des
                  ) : (
                    <textarea
                      value={props.des}
                      onChange={e => props.handleChange('des', e)}
                    />
                  )}
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faPlusCircle} /> Attachmentsy{' '}
              </td>
              <td>
                <input
                  type="file"
                  //value={this.props.att}
                  onChange={e => props.handleChange('att', e)}
                />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faUser} /> Add Comment{' '}
              </td>
              <td>
                <input
                  type="text"
                  value={props.com}
                  onChange={e => props.handleChange('com', e)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <ButtonApply>choose tag</ButtonApply>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={e => props.twiceFunction(e)}>
          Edit
        </Button>{' '}
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}
