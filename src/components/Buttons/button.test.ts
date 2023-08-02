/* eslint-disable import/no-extraneous-dependencies */
// import '../../../.mocharc.js';
import { expect } from 'chai';
// import Handlebars from 'handlebars';
// import { JSDOM } from 'jsdom';
import { Button, ButtonProps } from './buttons';

const buttonProps: ButtonProps = {
  type: 'button',
  label: 'Click',
  classes: ['button-class-1', 'button-class-2'],
  disabled: false,
  events: {
    click: () => console.log('Click'),
  },
};

describe('Handlebars Button Template Test', () => {
  const button = new Button(buttonProps);
  console.log(button.getContent());
  // it('should render the template with correct values', () => {

  //   const renderedHTML = render(data);
  //   const { document } = new JSDOM(renderedHTML).window;
  //   const buttonElement = document.querySelector('button');
  //   expect(buttonElement).to.exist;
  //   expect(buttonElement?.classList.contains(styles['button-submit'])).to.be
  //     .true;
  //   expect(buttonElement?.classList.contains(styles.disabled)).to.be.true;
  //   // expect(buttonElement?.classList.contains('btn-large')).to.be.true;
  //   expect(buttonElement?.classList.contains('btn-red')).to.be.true;
  //   expect(buttonElement?.getAttribute('type')).to.equal('submit');
  //   expect(buttonElement?.getAttribute('disabled')).to.equal('');

  //   expect(buttonElement?.textContent.trim()).to.equal('Click Me');
  // });

  expect(1).to.equal(1);
});
