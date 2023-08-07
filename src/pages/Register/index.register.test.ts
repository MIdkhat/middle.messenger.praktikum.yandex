/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import sinon from 'sinon';
import { RegisterPage } from './index.register';

const inputNames = [
  'first_name',
  'second_name',
  'login',
  'email',
  'password',
  'phone',
];

describe('Register Page Test', () => {
  let registerPageElement: HTMLElement;

  beforeEach(() => {
    const registerPage = new RegisterPage();
    registerPageElement = registerPage.getContent() as HTMLElement;
  });

  it('Test Register page elements exist', () => {
    expect(registerPageElement).to.exist;

    const form = registerPageElement.querySelector('form') as HTMLFormElement;
    expect(form).to.exist;

    inputNames.map((name) => {
      const input = registerPageElement.querySelector(
        `input[name=${name}]`
      ) as HTMLInputElement;
      expect(input).to.exist;
      return true;
    });

    const warningElement = registerPageElement.querySelector('p');
    expect(warningElement).to.exist;

    const registerLink = registerPageElement.querySelector('span');
    expect(registerLink).to.exist;
    expect(registerLink?.textContent).to.equal('Login into existing account');

    const submitButton = registerPageElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(submitButton).to.exist;
  });

  it('Test Register page inputs can be changed', () => {
    inputNames.map((name) => {
      const input = registerPageElement.querySelector(
        `input[name=${name}]`
      ) as HTMLInputElement;
      input.setAttribute('value', 'test');
      expect(input?.value).to.equal('test');
      return true;
    });
  });

  it('Test Button can be clicked', () => {
    const submitButton = registerPageElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    const submitHandler = sinon.spy();

    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      submitHandler();
    });
    submitButton.click();

    expect(submitHandler.calledOnce).to.be.true;
  });

  // it('Test Link can be clicked', () => {
  //   const registerLink = registerPageElement.querySelector('span') as HTMLElement;
  //   const submitHandler = sinon.spy();

  //   registerLink.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     submitHandler();
  //   });
  //   registerLink.click();

  //   expect(submitHandler.calledOnce).to.be.true;

  //   // const redirect = sinon.spy();

  //   // registerLink?.addEventListener('click', (event) => {
  //   //   event.preventDefault();
  //   //   redirect();
  //   // });
  //   // registerLink?.click();

  //   // expect(redirect.calledOnce).to.be.true;
  //   // if (registerLink) {
  //   //   testLink(
  //   //     'http://localhost:3000/',
  //   //     'http://localhost:3000/register',
  //   //     registerLink
  //   //   );
  //   // }
  // });
});
