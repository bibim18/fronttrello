import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'
import 'antd/lib/upload/style/css'
const Dragger = Upload.Dragger

export class UploadFile extends Component {
  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: `http://localhost:2000/card/upload/${this.props.id}`,
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
    }
    return (
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>
    )
  }
}
