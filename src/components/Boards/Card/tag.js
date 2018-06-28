import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import styled from 'styled-components'
import { Tag, Icon } from 'antd'

const CheckableTag = Tag.CheckableTag
const tagsFromServer = [
  '#61bd4f',
  '#f2d600',
  '#ff9f1a',
  '#eb5a46',
  '#c377e0',
  '#0079bf',
]

const ButtonApply = styled(Button)`
  margin-left: 310px;
`
const StyledTag = styled(Tag)`
  && {
    width: 150px;
  }
`
// && สร้างคลาสและให้ไปอยู่บนสุด
export class Tags extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      popoverOpen: false,
      selectedTags: props.card.tag || [],
    }
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag)
    //save tag into back here
    this.setState({ selectedTags: nextSelectedTags })
    this.props.getTag(this.props.card._id, nextSelectedTags)
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    })
  }

  render() {
    const { selectedTags } = this.state
    return (
      <div>
        <ButtonApply id="Popover1" onClick={this.toggle}>
          Choose Tag
        </ButtonApply>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverHeader>Tags</PopoverHeader>
          <PopoverBody>
            <div>
              {tagsFromServer.map(tag => (
                <CheckableTag
                  style={{ background: tag, width: '100px', display: 'block' }}
                  color={tag}
                  key={tag}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChange(tag, checked)}
                >
                  {this.state.selectedTags.includes(tag) ? (
                    <Icon type="check" />
                  ) : null}
                </CheckableTag>
              ))}
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
