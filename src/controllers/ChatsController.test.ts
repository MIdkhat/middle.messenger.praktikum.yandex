import { expect } from 'chai';
import sinon from 'sinon';
import ChatsController from './ChatsController';
import store from '../utils/Store';

describe('Test ChatsController', () => {
  let chatsController;
  let chatsAPI;
  let setSpy;
  let getChatByIdSpy;
  let getChatUsersSpy;
  let getTokenSpy;

  const chatId = 123;
  const userId = 1;
  const chats = [
    {
      id: chatId,
      title: 'my-chat',
      avatar: '/123/avatar1.jpg',
      unread_count: 15,
      created_by: userId,
      last_message: {
        user: {
          first_name: 'Petya',
          second_name: 'Pupkin',
          avatar: '/path/to/avatar.jpg',
          login: 'userLogin',
        },
        time: '2020-01-02T14:22:22.000Z',
        content: 'this is message content',
      },
    },
  ];
  const chatsUsers = [
    {
      id: userId,
      first_name: 'Petya',
      second_name: 'Pupkin',
      display_name: 'petya petrov',
      login: 'userLogin',
      avatar: '/path/to/avatar.jpg',
      email: 'test@email.com',
      password: 'secretpassword',
      phone: '1234567890',
    },
  ];
  beforeEach(() => {
    store.set('chats', chats);
    store.set('chatsUsers', { 123: chatsUsers });

    // stub for API
    chatsAPI = {
      create: sinon.stub(),
      delete: sinon.stub(),
      editChatAvatar: sinon.stub(),
      read: sinon.stub(),
      addUsers: sinon.stub(),
      removeUsers: sinon.stub(),
      getUsers: sinon.stub(),
      getToken: sinon.stub(),
    };
    chatsAPI.read.resolves(chats);
    chatsAPI.create.resolves();

    setSpy = sinon.spy(store, 'set');
    getChatByIdSpy = sinon.spy(store, 'getChatById');
    getChatUsersSpy = sinon.spy(store, 'getChatUsers');

    // stub for controller
    chatsController = ChatsController;
    chatsController.api = chatsAPI;
    getTokenSpy = sinon.spy(chatsController, 'getToken');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Test createChat', () => {
    it('should return success when chat creation is successful', async () => {
      const title = 'Test Chat';
      const response = await chatsController.createChat(title);

      expect(response).to.deep.equal({
        success: true,
        error: null,
      });
      expect(chatsAPI.create.calledOnceWith(title)).to.be.true;
    });

    it('should return failure when chat creation fails', async () => {
      const title = 'Test Chat';
      const error = new Error('Chat creation failed');
      chatsAPI.create.rejects(error);

      const response = await chatsController.createChat(title);

      expect(response).to.deep.equal({
        success: false,
        error,
      });
      expect(chatsAPI.create.calledOnceWith(title)).to.be.true;
    });
  });

  describe('Test selectChat', () => {
    it('should set the selectedChat in the store and return the author', async () => {
      const author = await chatsController.selectChat(chatId);
      expect(setSpy.withArgs('selectedChat', chatId).calledOnce).to.be.true;
      expect(getChatByIdSpy.withArgs(chatId).called).to.be.true;
      expect(getChatUsersSpy.withArgs().calledOnce).to.be.true;
      expect(author).to.be.equal(chatsUsers[0].display_name);
    });
  });

  describe('Test selectChat no author', () => {
    it('should set the selectedChat in the store and return null', async () => {
      const author = await chatsController.selectChat(chatId + 1);
      expect(author).to.be.equal(null);
    });
  });
});
