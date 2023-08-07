import { expect } from 'chai';
import sinon from 'sinon';
import UserController from './UserController';
import store from '../utils/Store';

describe('Test UserController', () => {
  let userController;
  let userAPI;
  let setSpy;

  const userId = 1;
  const userData = {
    id: userId,
    first_name: 'Petya',
    second_name: 'Pupkin',
    display_name: 'petya petrov',
    login: 'userLogin',
    avatar: '/path/to/avatar.jpg',
    email: 'test@email.com',
    password: 'secretpassword',
    phone: '1234567890',
  };
  const editedUser = {
    first_name: 'Petya_new',
    second_name: 'Pupkin_new',
    display_name: 'petya petrov new',
    login: 'userLogin_new',
    avatar: '/path/to/avatar_new.jpg',
    email: 'test_new@email.com',
    password: 'secretpassword_new',
    phone: '1234567891',
  };

  beforeEach(() => {
    // Stub the UserAPI class
    userAPI = {
      editProfile: sinon.stub(),
      editAvatar: sinon.stub(),
      editPassword: sinon.stub(),
      getUserById: sinon.stub(),
      getUsersByLogin: sinon.stub(),
    };

    userAPI.getUserById.resolves(userData);

    userAPI.editAvatar.resolves();
    userAPI.editPassword.resolves();

    setSpy = sinon.spy(store, 'set');

    // Create an instance of the UserController
    userController = UserController;
    userController.api = userAPI;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Test getUserById', () => {
    it('should get user by ID', async () => {
      userAPI.editProfile.resolves(editedUser);

      const response = await userController.getUserById(userId);
      expect(userAPI.getUserById.calledOnceWith(userId)).to.be.true;
      expect(response).to.deep.equal({
        success: true,
        user: userData,
        error: null,
      });
    });

    it('should handle error when editing user profile fails', async () => {
      const error = new Error('Edit profile failed');
      userAPI.editProfile.rejects(error);
      const response = await userController.editProfile(userData);
      expect(userAPI.editProfile.calledOnceWith(userData)).to.be.true;
      expect(response).to.deep.equal({
        success: false,
        user: null,
        error,
      });
    });
  });

  describe('Test editProfile', async () => {
    it('should edit the user profile and update the store', async () => {
      userAPI.editProfile.resolves(editedUser);

      // Call the editProfile method of the UserController
      const response = await userController.editProfile(userData);

      // Assert that the API method was called with the correct data
      expect(userAPI.editProfile.calledOnceWith(userData)).to.be.true;

      // Assert that the store set method was called to update the user data
      expect(setSpy.withArgs('user', editedUser).calledOnce).to.be.true;

      // Assert the response
      expect(response).to.deep.equal({
        success: true,
        user: editedUser,
        error: null,
      });
    });

    it('should handle error when editing user profile fails', async () => {
      const error = new Error('Edit profile failed');
      userAPI.editProfile.rejects(error);

      // Call the editProfile method of the UserController
      const response = await userController.editProfile(userData);

      // Assert that the API method was called with the correct data
      expect(userAPI.editProfile.calledOnceWith(userData)).to.be.true;

      // Assert the response
      expect(response).to.deep.equal({
        success: false,
        user: null,
        error,
      });
    });
  });

  describe('Test editAvatar', async () => {
    it('should edit the user avatar and update the store', async () => {
      userAPI.editAvatar.resolves(editedUser);
      const response = await userController.editAvatar(userData);

      expect(userAPI.editAvatar.calledOnceWith(userData)).to.be.true;
      expect(setSpy.withArgs('user', editedUser).calledOnce).to.be.true;
      expect(response).to.deep.equal({
        success: true,
        user: editedUser,
        error: null,
      });
    });

    it('should handle error when editing user profile fails', async () => {
      const error = new Error('Edit profile failed');
      userAPI.editAvatar.rejects(error);

      const response = await userController.editAvatar(userData);

      expect(userAPI.editAvatar.calledOnceWith(userData)).to.be.true;
      expect(response).to.deep.equal({
        success: false,
        user: null,
        error,
      });
    });
  });
});
