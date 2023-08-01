/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './chatList.templ';

describe('Chat List Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    const styles = {
      'scroller-container': 'scroller-container-style',
      scroller: 'scroller-style',
    };

    const data = {
      styles,
      chats: ['<div>Chat 1</div>', '<div>Chat 2</div>', '<div>Chat 3</div>'],
    };

    if (render) {
      const renderedHTML = render(data);
      const { document } = new JSDOM(renderedHTML).window;
      const scrollerContainer = document.querySelector(
        `.${styles['scroller-container']}`
      );
      expect(scrollerContainer).to.exist;
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });
});
