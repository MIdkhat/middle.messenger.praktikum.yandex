/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import handlebars from 'handlebars';
import { JSDOM } from 'jsdom';
import { template } from './avatar.templ';

describe('Handlebars Image Template Test', () => {
  let render: Handlebars.TemplateDelegate<any> | null = null;

  beforeEach(() => {
    render = handlebars.compile(template);
  });

  it('should render the template with correct values', () => {
    const data = {
      src: 'path/to/image.jpg',
      class: ['img-thumbnail', 'rounded'],
      title: 'Image Title',
    };

    if (render) {
      const renderedHTML = render(data);
      const { document } = new JSDOM(renderedHTML).window;
      const imgElement = document.querySelector('img');
      expect(imgElement).to.exist;
      expect(imgElement?.getAttribute('src')).to.equal('path/to/image.jpg');
      expect(imgElement?.classList.contains('img-thumbnail')).to.be.true;
      expect(imgElement?.classList.contains('rounded')).to.be.true;
      expect(imgElement?.getAttribute('alt')).to.equal('Image Title');
      expect(imgElement?.getAttribute('title')).to.equal('Image Title');
    } else {
      throw new Error('Handlebars template render is not initialized.');
    }
  });
});
