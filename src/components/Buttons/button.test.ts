/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import Handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './buttons.templ';

describe('Handlebars Button Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = Handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    const styles = {
      'button-submit': 'btn-primary',
      disabled: 'disabled',
    };

    const data = {
      styles,
      class: ['btn-large', 'btn-red'],
      disabled: true,
      type: 'submit',
      label: 'Click Me',
    };

    const renderedHTML = render(data);
    const { document } = new JSDOM(renderedHTML).window;
    const buttonElement = document.querySelector('button');
    expect(buttonElement).to.exist;
    expect(buttonElement?.classList.contains(styles['button-submit'])).to.be
      .true;
    expect(buttonElement?.classList.contains(styles.disabled)).to.be.true;
    // expect(buttonElement?.classList.contains('btn-large')).to.be.true;
    expect(buttonElement?.classList.contains('btn-red')).to.be.true;
    expect(buttonElement?.getAttribute('type')).to.equal('submit');
    expect(buttonElement?.getAttribute('disabled')).to.equal('');

    expect(buttonElement?.textContent.trim()).to.equal('Click Me');
  });
});
