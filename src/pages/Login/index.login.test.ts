/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import sinon from 'sinon';
import { LoginPage } from './index.login';
import { getAttachedEvents, testLink } from '../../utils/TestHelpers';

describe('Login Page Test', () => {
  let loginPageElement: HTMLElement;

  beforeEach(() => {
    const loginPage = new LoginPage();
    loginPageElement = loginPage.getContent() as HTMLElement;
  });

  it('Test Login page elements exist', () => {
    expect(loginPageElement).to.exist;

    const form = loginPageElement.querySelector('form') as HTMLFormElement;
    expect(form).to.exist;

    const loginInput = loginPageElement.querySelector(
      'input[name="login"]'
    ) as HTMLInputElement;
    expect(loginInput).to.exist;

    const passwordInput = loginPageElement.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    expect(passwordInput).to.exist;

    const warningElement = loginPageElement.querySelector('p');
    expect(warningElement).to.exist;

    const registerLink = loginPageElement.querySelector('span');
    expect(registerLink).to.exist;
    expect(registerLink?.textContent).to.equal('Register new account');

    const submitButton = loginPageElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(submitButton).to.exist;
  });

  it('Test Login page inputs can be changed', () => {
    const loginInput = loginPageElement.querySelector(
      'input[name="login"]'
    ) as HTMLInputElement;
    loginInput.setAttribute('value', 'JohnDoe');
    expect(loginInput?.value).to.equal('JohnDoe');

    const passwordInput = loginPageElement.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    passwordInput.setAttribute('value', 'secretpassword');
    expect(passwordInput?.value).to.equal('secretpassword');
  });

  it('Test Button can be clicked', () => {
    const submitButton = loginPageElement.querySelector(
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
  //   const registerLink = loginPageElement.querySelector('span') as HTMLElement;
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
