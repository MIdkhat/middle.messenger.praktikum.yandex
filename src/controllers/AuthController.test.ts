import { expect } from 'chai';
import sinon from 'sinon';
import Router from '../utils/Router';
import AuthController from './AuthController';
import MessagesController from './MessagesController';
import { SigninData, SignupData } from '../api/AuthAPI';

describe('AuthController', () => {
  let authController;
  let authAPI;

  beforeEach(() => {
    authAPI = {
      signin: sinon.stub(),
      signup: sinon.stub(),
      read: sinon.stub(),
      logout: sinon.stub(),
    };
    authController = AuthController;
    authController.api = authAPI;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('signin', () => {
    it('should return success when signin is successful', async () => {
      const signinData: SigninData = {
        login: 'test_login',
        password: 'testpassword',
      };

      authAPI.signin.resolves();
      authAPI.read.resolves(signinData);

      const response = await authController.signin(signinData);
      expect(response).to.deep.equal({
        success: true,
        user: { login: 'test_login', password: 'testpassword' },
        error: null,
      });
    });

    it('should return failure when signin fails', async () => {
      const signinData: SigninData = {
        login: 'test_login',
        password: 'testpassword',
      };
      const error = new Error('Signin failed');
      authAPI.signin.rejects(error);

      const response = await authController.signin(signinData);
      expect(response).to.deep.equal({
        success: false,
        user: null,
        error,
      });
    });
  });

  describe('signup', () => {
    it('should return success when signup is successful', async () => {
      const signupData: SignupData = {
        first_name: 'test first name',
        second_name: 'test second name',
        login: 'test_login',
        email: 'test@email',
        password: 'secretpassword',
        phone: '12345678',
      };

      authAPI.signup.resolves();
      authAPI.read.resolves(signupData);

      const response = await authController.signup(signupData);

      expect(response).to.deep.equal({
        success: true,
        user: {
          first_name: 'test first name',
          second_name: 'test second name',
          login: 'test_login',
          email: 'test@email',
          password: 'secretpassword',
          phone: '12345678',
        },
        error: null,
      });
    });

    it('should return failure when signup fails', async () => {
      const signupData: SignupData = {
        first_name: 'test first name',
        second_name: 'test second name',
        login: 'test_login',
        email: 'test@email',
        password: 'secretpassword',
        phone: '12345678',
      };

      const error = new Error('Signup failed');
      authAPI.signup.rejects(error);

      const response = await authController.signup(signupData);

      expect(response).to.deep.equal({
        success: false,
        user: null,
        error,
      });
    });
  });

  describe('fetchUser', () => {
    it('should return success when fetching user data is successful', async () => {
      const user = { id: 1, username: 'test_login' };
      authAPI.read.resolves(user);

      const response = await authController.fetchUser();

      expect(response).to.deep.equal({
        success: true,
        user,
        error: null,
      });
    });

    it('should return failure when fetching user data fails', async () => {
      const error = new Error('Fetching user failed');
      authAPI.read.rejects(error);

      const response = await authController.fetchUser();

      expect(response).to.deep.equal({
        success: false,
        user: null,
        error,
      });
    });
  });

  describe('logout', () => {
    it('should call API logout method and redirect to home page', async () => {
      const closeAllStub = sinon.stub(MessagesController, 'closeAll');
      const goStub = sinon.stub(Router, 'go');
      authAPI.logout.resolves();

      await authController.logout();

      expect(closeAllStub.calledOnce).to.be.true;
      expect(authAPI.logout.calledOnce).to.be.true;
      expect(goStub.calledWithExactly('/')).to.be.true;
    });
  });
});
