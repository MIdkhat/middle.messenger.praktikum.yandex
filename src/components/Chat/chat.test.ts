/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { registerHandlebarsHelpers } from '../../utils/HandlebarsHelpers';
import { template } from './chat.templ.js';
// import * as stylesDefs from './styles.module.scss';

// const styles = stylesDefs.default;

const styles = {
  'chat-container': 'chat-container-style',
  'avatar-container': 'avatar-container-style',
  blue: 'blue-style',
  'new-count': 'new-count-style',
  message: 'message-style',
  date: 'date-style',
};

const data = {
  styles,
  selected: true,
  avatar: '<img src="./public/images/cactus.png">',
  title: '<h2>User Name</h2>',
  chat: {
    unread_count: 3,
  },
  message: 'Hello, how are you?',
  date: '2023-07-29',
};

registerHandlebarsHelpers();

describe('Chat Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    if (render) {
      const renderedHTML = render(data);
      const { document } = new JSDOM(renderedHTML).window;
      const chatContainer = document.querySelector(
        `.${styles['chat-container']}`
      );

      expect(chatContainer).to.exist;

      // Test img element
      const img = chatContainer.querySelector('img');
      expect(img).to.exist;
      expect(img?.getAttribute('src')).to.equal('./public/images/cactus.png');

      // Test h2 element (title)
      const title = chatContainer.querySelector('h2');
      expect(title).to.exist;
      expect(title?.textContent).to.equal('User Name');

      // Test .new-count element (unread_count)
      const unread_count = chatContainer.querySelector('.new-count-style');
      // console.log(chatContainer.outerHTML);
      // console.log(unread_count);
      if (data.chat.unread_count !== 0) {
        expect(unread_count).to.exist;
        expect(unread_count?.textContent.trim()).to.equal(
          data.chat.unread_count.toString().trim()
        );
      } else {
        expect(unread_count).to.not.exist;
      }

      // Test .message-style element (message)
      const message = chatContainer.querySelector('.message-style');
      expect(message).to.exist;
      expect(message?.textContent.trim()).to.equal(data.message.trim());

      // Test .date-style element (date)
      const date = chatContainer.querySelector('.date-style');
      expect(date).to.exist;
      expect(date?.textContent).to.equal(data.date);
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });
});
