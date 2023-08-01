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
  title: 'User Name',
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
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });
});
