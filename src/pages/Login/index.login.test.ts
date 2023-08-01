/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import Handlebars from 'handlebars';
import { JSDOM } from 'jsdom';

describe('Handlebars Template Test', () => {
  const source = `<main>
    <div>
      <form action="javascript:void(0);">
        <h2>Login</h2>
        <div>
          <label for="login">Login</label>
          <input id="login" name="login" type="text" placeholder="Login" value="{{login}}">
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" value="{{password}}">
        </div>
        <div>
          <p>{{warning}}</p>
        </div>
        <span>Register new account</span>
        <button type="submit">Login</button>
      </form>
    </div>
  </main>`;

  it('should render the template correctly with data', () => {
    const template = Handlebars.compile(source);
    // Mock data for the template
    const loginFormData = {
      login: 'john_doe',
      password: 'secretpassword',
      warning: 'Invalid credentials',
    };

    const templateResult = template(loginFormData);

    const { document } = new JSDOM(templateResult).window;
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
