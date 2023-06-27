import Block from '../../utils/Block'
import { template } from './input.templ'
import * as stylesDefs from './styles.module.scss'
import { setStyles, validateInput } from '../../utils/Helpers'
const styles = stylesDefs.default

const inputStyles = {
  pending: {
    border: '1px solid gray',
  },
  valid: {
    border: '1px solid green',
  },
  invalid: {
    border: '1px solid red',
  },
}

export interface InputProps {
  name: string
  value?: string | number
  type: string
  regex?: RegExp
  placeholder?: string
  required?: boolean
  autofocus?: boolean
  classes?: string[]
  events?: {
    [key: string]: () => void
  }
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({ events: {}, regex: /\S+/, ...props })
  }

  init() {
    if (this.props.classes) this.props.class = this.props.classes.map((c: string) => styles[c])
    this.props.events.blur = () => this.validate()
  }

  validate() {
    const warning = this.props.warning
    const inputElement = this.getContent() as HTMLElement
    const valid = validateInput(this).valid
    if (inputElement) {
      if (valid) {
        setStyles(inputElement, inputStyles.pending)
        this.props.toggleWarning(true, '')
      } else {
        setStyles(inputElement, inputStyles.invalid)
        this.props.toggleWarning(false, warning)
      }
    }
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value)
  }

  public getName() {
    return (this.element as HTMLInputElement).name
  }

  public getValue() {
    return (this.element as HTMLInputElement).value
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}