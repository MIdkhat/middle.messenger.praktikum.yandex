/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { Button, ButtonProps } from './buttons';

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
  console.log(buttonElement?.outerHTML);

  it('should render the template with correct values', () => {
    expect(buttonElement).to.exist;
    if (buttonElement) {
      expect(buttonElement?.getAttribute('type')).to.equal('button');
      expect(buttonElement?.getAttribute('disabled')).to.equal('');

      expect(buttonElement?.textContent?.trim()).to.equal('Click Me');

      // Mock the console.log method to capture the output
      let consoleOutput = '';
      const originalConsoleLog = console.log;
      console.log = (output: string) => {
        consoleOutput += output;
      };
      const clickEvent = new window.MouseEvent('click');
      buttonElement.dispatchEvent(clickEvent);
      console.log = originalConsoleLog;
      expect(consoleOutput).to.equal('Click Me');
    }
  });
});
