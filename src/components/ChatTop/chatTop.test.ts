/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { ChatTop } from './chatTop';
import { ButtonAwesome } from '../Buttons/buttons';
import { mockConsoleLog } from '../../utils/TestHelpers';

const chatProps = {
  selected: false,
  id: 1,
  title: 'TestChat',
  created_by: 1,
  avatar: 'cactus.png',
  unread_count: 1,
  last_message: {
    user: {
      id: 1,
      first_name: 'test first name',
      second_name: 'test second name',
      display_name: 'test display name',
      login: 'test_login',
      email: 'test@email',
      password: 'secretpassword',
      phone: '12345678',
      avatar: 'cactus.png',
    },
    time: '2023-07-29',
    content: 'Test message',
  },

  users: [],
  buttons: {
    removeUserButton: new ButtonAwesome({
      icon: 'fa fa-user-minus',
      title: 'removeUser',
      events: {
        click: () => console.log('Click Me'),
      },
    }),
    editChatButton: new ButtonAwesome({
      icon: 'far fa-edit',
      title: 'Edit Profile',
      events: {
        click: () => console.log('Click Me'),
      },
    }),
  },
};

describe('TopChat Template Test', () => {
  let chatContainer;

  beforeEach(() => {
    const chat = new ChatTop(chatProps);
    chatContainer = chat.getContent();
  });

  it('Chat container exists', () => {
    expect(chatContainer).to.exist;
  });

  it('TopChat elements exist', () => {
    expect(chatContainer).to.exist;

    const removeUserButton = chatContainer.querySelector(
      'i[class="fa fa-user-minus"]'
    );
    expect(removeUserButton).to.exist;

    const editChatButton = chatContainer.querySelector(
      'i[class="far fa-edit"]'
    );
    expect(editChatButton).to.exist;
  });

  it('TopChat buttons click', () => {
    const buttons = chatContainer.querySelectorAll('button[type="button"]');
    buttons.forEach((button) => {
      const consoleOutput = mockConsoleLog(button, 'click');
      expect(consoleOutput).to.equal('Click Me');
    });
  });
});
