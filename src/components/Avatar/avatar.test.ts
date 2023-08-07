/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { Avatar } from './avatar';

const avatarProps = {
  src: './public/images/cactus.png',
  class: ['img-thumbnail', 'rounded'],
  title: 'Image Title',
};

describe('Avatar Template Test', () => {
  let avatarElement;
  beforeEach(() => {
    const avatar = new Avatar(avatarProps);
    avatarElement = avatar.getContent();
  });

  it('should render the template with correct values', () => {
    expect(avatarElement).to.exist;
    expect(avatarElement?.getAttribute('src')).to.equal(
      'https://ya-praktikum.tech/api/v2/resources./public/images/cactus.png'
    );
    expect(avatarElement?.classList.contains('img-thumbnail')).to.be.true;
    expect(avatarElement?.classList.contains('rounded')).to.be.true;
    expect(avatarElement?.getAttribute('alt')).to.equal('Image Title');
    expect(avatarElement?.getAttribute('title')).to.equal('Image Title');
  });
});
