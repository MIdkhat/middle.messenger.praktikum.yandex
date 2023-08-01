/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './chatTop.templ.js';

describe('Login Page Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template correctly with data', () => {
    // Mock data for the template
    const loginFormData = {
      login: 'john_doe',
      password: 'secretpassword',
      warning: 'Invalid credentials',
    };

    const renderedHTML = render(loginFormData);
    const { document } = new JSDOM(renderedHTML).window;

    const mainElement = document.querySelector('main');
    expect(mainElement).to.exist;

    const loginInput = document.querySelector(
      'input[name="login"]'
    ) as HTMLInputElement;
    expect(loginInput).to.exist;
    expect(loginInput?.value).to.equal('john_doe');

    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    expect(passwordInput).to.exist;
    expect(passwordInput?.value).to.equal('secretpassword');

    const warningElement = document.querySelector('p');
    expect(warningElement).to.exist;
    expect(warningElement?.textContent).to.equal('Invalid credentials');

    const registerLink = document.querySelector('span');
    expect(registerLink).to.exist;
    expect(registerLink?.textContent).to.equal('Register new account');
  });
});
