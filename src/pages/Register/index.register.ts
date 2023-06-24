import Block from '../../utils/Block'
import { template } from './register.tmpl'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Tag } from '../../components/Tags/tags'
// import styles from './styles.module.pcss'
import { Link } from '../../components/Link/link'
import { Form } from '../../components/Form/form'
// import { SignupData } from '../../api/AuthAPI'
import { redirect } from '../../commonActions/actions'
// import AuthController from '../../controllers/AuthController'
import * as stylesDefs from '../../scss/styles.module.scss'
const styles = stylesDefs.default
export class RegisterPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.props.wrapperClass = styles.wrapper
    // create Blocks for the Form
    const inputsData = [
      {
        type: 'text',
        name: 'first_name',
        class: '.input-square',
        placeholder: 'Enter your name',
        required: true,
        autofocus: true,
      },
      {
        type: 'text',
        name: 'second_name',
        class: '.input-square',
        placeholder: 'Enter your last name',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email',
        required: true,
      },
      {
        type: 'tel',
        name: 'phone',
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        type: 'number',
        name: 'age',
        placeholder: 'Enter your age',
      },
      {
        type: 'text',
        name: 'city',
        placeholder: 'Enter your city',
        required: false,
      },
      {
        type: 'text',
        name: 'login',
        placeholder: 'Create your login',
        required: true,
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Create new password',
        required: true,
      },
      {
        type: 'password',
        name: 'repeat_password',
        placeholder: 'Repeat password',
        required: true,
      },
    ]
    const inputs = inputsData.map((d) => new Input({ ...d, classes: ['input-square'] }))
    // store inputs for submittion
    this.props.inputs = inputs

    const button = new Button({
      label: 'Create account',
      events: {
        click: () => this.onSubmit(),
      },
    })

    const link = new Link({
      label: 'Login into existing account',
      to: '/',
    })

    // pass Form
    const title = new Tag({
      tag: 'h2',
      content: 'Register',
    })
    const form = new Form({
      inputs,
      button,
      link,
    })
    this.children.form = new Container({
      content: [title, form],
      classes: ['form-container'],
    })
  }

  onSubmit() {
    console.log('submit Register Form')
    const inputs = this.props.inputs
    const values = inputs.map((i: Input) => [i.getName(), i.getValue()])
    const data = Object.fromEntries(values)
    console.log(data)

    // AuthController.signin(data as SignupData)
    // redirect({ url: '/profile' })
  }

  render() {
    console.log('render reg')
    console.log(this.props)
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
