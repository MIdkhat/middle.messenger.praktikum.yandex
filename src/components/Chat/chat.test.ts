/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { Chat } from './chat';
import { registerHandlebarsHelpers } from '../../utils/HandlebarsHelpers';
import { mockConsoleLog } from '../../utils/TestHelpers';

registerHandlebarsHelpers();

const chatProps = {
  selected: false,
  chat: {
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
  },
  users: [],
  events: {
    click: () => console.log('Click Me'),
  },
};

describe('Chat Template Test', () => {
  let chatContainer;
  beforeEach(() => {
    const chat = new Chat(chatProps);
    chatContainer = chat.getContent();
  });

  it('Chat elements exitst', () => {
    expect(chatContainer).to.exist;
    const img = chatContainer.querySelector('img');
    expect(img).to.exist;
    expect(img?.getAttribute('src')).to.equal(
      'https://ya-praktikum.tech/api/v2/resourcescactus.png'
    );

    const allSpans: HTMLSpanElement[] = Array.from(
      chatContainer.querySelectorAll('span')
    );

    const title = allSpans[0];
    expect(title).to.exist;
    expect(title?.textContent?.trim()).to.equal(chatProps.chat.title.trim());

    const unread_count = allSpans[1];
    if (chatProps.chat.unread_count !== 0) {
      expect(unread_count).to.exist;
      expect(unread_count?.textContent?.trim()).to.equal(
        chatProps.chat.unread_count.toString().trim()
      );
    } else {
      expect(unread_count).to.not.exist;
    }
  });

  it('Chat clicks', () => {
    if (chatContainer) {
      const consoleOutput = mockConsoleLog(chatContainer, 'click');
      expect(consoleOutput).to.equal('Click Me');
    }
  });
});
