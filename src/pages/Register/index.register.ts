import Block from '../../utils/Block';
import { template } from './register.tmpl';
import { Container } from '../../components/Containers/containers';
import { Button } from '../../components/Buttons/buttons';
import { Input } from '../../components/Input/input';
import { Tag } from '../../components/Tags/tags';
import { Link } from '../../components/Link/link';
import { Form } from '../../components/Form/form';
import { clearFormInputs, formDataToJson, redirect } from '../../utils/Helpers';
import { inputsData, InputData } from '../../../public/inputsData';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';
import { Routes } from '../../../index';
import { validateForm } from '../../utils/FormValidator';

export class RegisterPage extends Block {
  constructor() {
    super({});
  }

  init() {
    const info = new Container({
      classes: ['warning-container'],
      content: [
        new Tag({
          tag: 'p',
          content: 'warning',
        }),
      ],
    });

    const button = new Button({
      label: 'Create account',
      type: 'submit',
    });

    const link = new Link({
      label: 'Login into existing account',
      to: '/',
    });

    const { first_name, second_name, login, email, password, phone } =
      inputsData;
    const inputs = [first_name, second_name, login, email, password, phone].map(
      (d: InputData) =>
        new Container({
          classes: ['input-container'],
          content: [
            new Tag({
              tag: 'label',
              content: d.label,
              for: d.name,
            }),
            new Input({
              ...d,
              id: d.name,
              required: true,
              validate: true,
              classes: ['input-square'],
            }),
          ],
        })
    );

    this.children.form = new Container({
      content: [
        new Form({
          title: 'Register',
          inputs,
          buttons: [button],
          link,
          info,
          events: {
            submit: this.registerSubmit.bind(this),
          },
        }),
      ],
      classes: ['form-container'],
    });
  }

  async registerSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    if (!validateForm(this.children.form as Block)) return;
    const formData = new FormData(form);
    const data = formDataToJson(formData) as SignupData;

    const res = await AuthController.signup(data);
    if (!res.success) {
      alert(`There was some error registering ${JSON.stringify(res.error)}`);
      return;
    }
    AuthController.fetchUser();
    clearFormInputs(form);
    redirect({ url: Routes.Messenger });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
