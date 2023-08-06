import { expect } from 'chai';
import sinon from 'sinon';
import { Link, LinkProps } from '../Link/link';
import { Routes } from '../../..';

const linkProps: LinkProps = {
  to: Routes.Register,
  label: 'Test Link',
  events: {
    click: () => console.log('Click Me'),
  },
};

describe('Link Component Test', () => {
  let link;
  let linkElement;

  beforeEach(() => {
    link = new Link(linkProps);
    linkElement = link.getContent() as HTMLLinkElement;
  });

  it('Check link exists', () => {
    expect(linkElement).to.exist;
  });

  it.skip('Redirect on link click', () => {
    const redirect = sinon.spy();

    linkElement.addEventListener('click', (event) => {
      event.preventDefault();
      redirect();
    });
    linkElement.click();

    expect(redirect.calledOnce).to.be.true;
  });
});
