import { expect } from 'chai';
import { Form, FormProps } from './form';
import { Input } from '../Input/input';
import { Button } from '../Buttons/buttons';
import { Link } from '../Link/link';
import { Container } from '../Containers/containers';
import { Tag } from '../Tags/tags';
import { mockConsoleLog } from '../../utils/TestHelpers';
import { inputsData } from '../../../public/inputsData';

const { login: inputData } = inputsData;

const submitForm = async (e: Event) => {
  e.preventDefault();
  console.log('Form submitted');
  return;
};

const formProps: FormProps = {
  title: 'Form Title',
  inputs: [
    new Container({
      classes: ['input-container'],
      content: [
        new Tag({
          tag: 'label',
          content: 'Select file',
          for: 'avatar',
        }),
        new Input({
          ...inputData,
          id: inputData.name,
          required: true,
          validate: true,
          classes: ['input-square'],
        }),
      ],
    }),
  ],
  buttons: [
    // Mock button blocks
    new Button({
      label: 'Login',
      type: 'submit',
    }),
    new Button({
      label: 'Cancel',
      classes: ['button-cancel'],
      events: {
        click: () => console.log('cancel'),
      },
    }),
  ],
  link: new Link({
    label: 'Register new account',
    to: './test',
  }),
  events: {
    submit: submitForm,
  },
  valid: false,
};

describe('Form Component Test', () => {
  const form = new Form(formProps);
  const formElement = form.getContent();

  it('should render the form template with correct values', () => {
    expect(formElement).to.exist;
    if (formElement) {
      expect(formElement.tagName.toLowerCase()).to.equal('form');
      expect(formElement.getAttribute('action')).to.equal(
        'javascript:void(0);'
      );
      expect(formElement.textContent?.trim()).to.contain('Form Title');
    }
  });

  it('should call onSubmit function when the form is submitted', () => {
    // Mock the console.log method to capture the output
    if (formElement) {
      const consoleOutput = mockConsoleLog(formElement, 'submit');
      expect(consoleOutput).to.equal('Form submitted');
    }
  });
});
