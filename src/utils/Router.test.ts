import { expect } from 'chai';
// import sinon from 'sinon';

import Router from '../utils/Router';
import { Routes } from '../..';
import { LoginPage } from '../pages/Login/index.login';
import { RegisterPage } from '../pages/Register/index.register';
import { ProfilePage } from '../pages/Profile/index.profile';

describe('Router and Pages Tests', () => {
  const baseUrl = 'http://localhost:5173';
  before(() => {
    Router.use(Routes.Login, LoginPage);
    Router.use(Routes.Register, RegisterPage);
    Router.use(Routes.Profile, ProfilePage);
  });

  it('should navigate to the specified routes', () => {
    Router.go(Routes.Login);
    expect(window.location.href).to.equal(`${baseUrl}${Routes.Login}`);

    Router.go(Routes.Register);
    expect(window.location.href).to.equal(`${baseUrl}${Routes.Register}`);

    Router.go(Routes.Profile);
    expect(window.location.href).to.equal(`${baseUrl}${Routes.Profile}`);
  });
});
