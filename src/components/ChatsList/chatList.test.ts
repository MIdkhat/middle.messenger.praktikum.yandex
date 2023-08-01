/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './chatList.templ';

const styles = {
  'scroller-container': 'scroller-container-style',
  scroller: 'scroller-style',
};

const data = {
  styles,
  chats: [
    '<div class="chat-item">Chat 1</div>',
    '<div class="chat-item">Chat 2</div>',
    '<div class="chat-item">Chat 3</div>',
  ],
};

describe('Chat List Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    if (render) {
      const renderedHTML = render(data);
      const { document } = new JSDOM(renderedHTML).window;
      const scrollerContainer = document.querySelector(
        `.${styles['scroller-container']}`
      );
      expect(scrollerContainer).to.exist;

      // Test the number of chats rendered
      const chats = scrollerContainer?.querySelectorAll('.chat-item');
      expect(chats).to.have.lengthOf(data.chats.length);

      // Test the content of each chat
      data.chats.forEach((chat, index) => {
        const chatDiv = document.createElement('div');
        chatDiv.innerHTML = chat;
        const renderedChat = chats?.[index];
        expect(renderedChat?.outerHTML).to.equal(chatDiv.innerHTML);
      });
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });
});
