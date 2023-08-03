import { expect } from 'chai';
import { Button, ButtonProps } from './buttons';
import { mockConsoleLog } from '../../utils/TestHelpers';

const buttonProps: ButtonProps = {
  type: 'button',
  label: 'Click Me',
  disabled: true,
  events: {
    click: () => console.log('Click Me'),
  },
};

describe('Handlebars Button Template Test', () => {
  const button = new Button(buttonProps);
  const buttonElement = button.getContent();

  it('should render the template with correct values', () => {
    expect(buttonElement).to.exist;
    if (buttonElement) {
      expect(buttonElement.getAttribute('type')).to.equal('button');
      expect(buttonElement.getAttribute('disabled')).to.equal('');
      expect(buttonElement.textContent?.trim()).to.equal('Click Me');

      // Mock the console.log method to capture the output
      const consoleOutput = mockConsoleLog(buttonElement, 'click');
      expect(consoleOutput).to.equal('Click Me');
    }
  });
});
