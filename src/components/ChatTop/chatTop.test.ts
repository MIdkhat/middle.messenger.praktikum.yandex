/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './chatTop.templ.js';

const styles = {
  'messages-header-container': 'messages-header-container-style',
  hidden: 'hidden-style',
};

const data = {
  styles,
  selected: true,
  avatarContainer: '<div class="avatar-container">Avatar Container</div>',
  addUserButton: '<button class="add-user-button">Add User</button>',
  removeUserButton: '<button class="remove-user-button">Remove User</button>',
  editChatButton: '<button class="edit-chat-button">Edit Chat</button>',
  deleteChatButton: '<button class="delete-chat-button">Delete Chat</button>',
};
describe('Top Chat Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    if (render) {
      const renderedHTML = render(data);
      const { document } = new JSDOM(renderedHTML).window;
      const messagesHeaderContainer = document.querySelector(
        `.${styles['messages-header-container']}`
      );
      expect(messagesHeaderContainer).to.exist;

      // Test the content of each element
      const avatarContainer =
        messagesHeaderContainer?.querySelector('.avatar-container');
      expect(avatarContainer?.outerHTML).to.equal(data.avatarContainer);

      const addUserButton =
        messagesHeaderContainer?.querySelector('.add-user-button');
      expect(addUserButton?.outerHTML).to.equal(data.addUserButton);

      const removeUserButton = messagesHeaderContainer?.querySelector(
        '.remove-user-button'
      );
      expect(removeUserButton?.outerHTML).to.equal(data.removeUserButton);

      const editChatButton =
        messagesHeaderContainer?.querySelector('.edit-chat-button');
      expect(editChatButton?.outerHTML).to.equal(data.editChatButton);

      const deleteChatButton = messagesHeaderContainer?.querySelector(
        '.delete-chat-button'
      );
      expect(deleteChatButton?.outerHTML).to.equal(data.deleteChatButton);
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });
});
