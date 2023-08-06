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

describe('Button Template Test', () => {
  let buttonElement;
  beforeEach(() => {
    const button = new Button(buttonProps);
    buttonElement = button.getContent();
  });

  it('Avatar elements exist', () => {
    expect(buttonElement).to.exist;
    if (buttonElement) {
      expect(buttonElement.getAttribute('type')).to.equal('button');
      expect(buttonElement.getAttribute('disabled')).to.equal('');
      expect(buttonElement.textContent?.trim()).to.equal('Click Me');
      expect(buttonElement).to.exist;
    }
  });

  it('button clicks', () => {
    if (buttonElement) {
      const consoleOutput = mockConsoleLog(buttonElement, 'click');
      expect(consoleOutput).to.equal('Click Me');
    }
  });
});
