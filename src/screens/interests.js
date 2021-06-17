import React, { forwardRef, useImperativeHandle } from "react"
import { useForm, ErrorMessage } from "react-hook-form"
import FullScreen from "../molecules/full-screen"
import { Tag, TagGroup, Button, IconButton, Icon, Input } from "rsuite"

const validations = {
  required: {
    value: true,
    message: "this is required",
  },
  minLength: {
    value: 5,
    message: "must be atleast 5 chars",
  },
}

const Interests = ({ onChange }, ref) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  })

  useImperativeHandle(ref, () => ({
    isValid: () => {
      return formState.isValid
    },
    onSubmit: cb => handleSubmit(cb)(),
  }))

  const renderForm = () => {
    return (
      <>
        <input
          type="input"
          name="interest"
          ref={register(validations)}
          onChange={onChange}
        />
        <ErrorMessage errors={errors} name="interest" />
        <br />
      </>
    )
  }

  return (
    <FullScreen>
      <h2 style={{ paddingBottom: "16px", textAlign: "center" }}>
        What are your interests?
      </h2>
      {renderForm()}
      <DynamicTag />
      <br />
      <Button>Confirm</Button>
    </FullScreen>
  )
}

export default forwardRef(Interests)

class DynamicTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typing: false,
      inputValue: "",
      tags: ["javascript", "css", "react"],
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputConfirm = this.handleInputConfirm.bind(this)
  }
  handleButtonClick() {
    this.setState(
      {
        typing: true,
      },
      () => {
        this.input.focus()
      }
    )
  }
  handleInputChange(inputValue) {
    this.setState({ inputValue })
  }
  handleInputConfirm() {
    const { inputValue, tags } = this.state
    const nextTags = inputValue ? [...tags, inputValue] : tags
    this.setState({
      tags: nextTags,
      typing: false,
      inputValue: "",
    })
  }
  handleTagRemove(tag) {
    const { tags } = this.state
    const nextTags = tags.filter(item => item !== tag)
    this.setState({
      tags: nextTags,
    })
  }
  renderInput() {
    const { typing, inputValue } = this.state

    if (typing) {
      return (
        <Input
          className="tag-input"
          inputRef={ref => {
            this.input = ref
          }}
          size="xs"
          style={{ width: 70 }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      )
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={this.handleButtonClick}
        icon={<Icon icon="plus" />}
        appearance="ghost"
        size="xs"
      />
    )
  }
  render() {
    const { tags } = this.state
    return (
      <TagGroup>
        {tags.map((item, index) => (
          <Tag
            key={index}
            closable
            onClose={() => {
              this.handleTagRemove(item)
            }}
          >
            {item}
          </Tag>
        ))}
        {this.renderInput()}
      </TagGroup>
    )
  }
}
