import React, { Component } from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap'
import { UploadFile } from './uploadFile'
import { Tags } from './tag'

const StyleTitle = styled.div`
  font-size: 14px;
`
const Tag = styled.div`
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  float: left;
  font-size: 12px;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
  margin: 0 4px 4px 0;
  min-width: 40px;
  padding: 0 8px;
  width: auto;
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
        <StyleTitle>in list {props.board.title}</StyleTitle>
      </ModalHeader>
      <ModalBody>
        <Table>
          <tbody>
            <tr>
              <td colspan="2">
                {props.card.tag === []
                  ? null
                  : props.card.tag.map(tag => (
                      <Tag style={{ background: tag }}> </Tag>
                    ))}
              </td>
            </tr>
            <tr>
              <td>
                <Icon type="profile" /> <strong>Description</strong>
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
                <Icon type="file-add" /> <strong>Attachmentsy</strong>{' '}
              </td>
              {props.att === '' ? (
                <td>
                  <UploadFile
                    id={props.card._id}
                    uploadFile={props.uploadFile}
                  />
                </td>
              ) : (
                <div>
                  <td>
                    <img
                      src={props.url}
                      alt="adb"
                      style={{ width: '200px', height: 'auto' }}
                    />
                  </td>
                  <td>
                    <UploadFile
                      id={props.card._id}
                      uploadFile={props.uploadFile}
                    />
                  </td>
                </div>
              )}
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <Icon type="message" /> <strong>Add Comment</strong>{' '}
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
        <Tags getTag={props.getTag} card={props.card} />
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
