/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './chatTop.templ.js';

describe('Top Chat Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    const styles = {
      'messages-header-container': 'messages-header-container-style',
      hidden: 'hidden-style',
    };

    const data = {
      styles,
      selected: true,
      avatarContainer: '<div>Avatar Container</div>',
      addUserButton: '<button>Add User</button>',
      removeUserButton: '<button>Remove User</button>',
      editChatButton: '<button>Edit Chat</button>',
      deleteChatButton: '<button>Delete Chat</button>',
    };

    if (render) {
      const renderedHTML = render(data);
      const { document } = new JSDOM(renderedHTML).window;
      const messagesHeaderContainer = document.querySelector(
        `.${styles['messages-header-container']}`
      );
      expect(messagesHeaderContainer).to.exist;

      // Test other elements and attributes as needed
      // You can use querySelector and other DOM methods to check the expected content
      // and classes of the elements.
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });

  // Add more test cases here if needed
});
