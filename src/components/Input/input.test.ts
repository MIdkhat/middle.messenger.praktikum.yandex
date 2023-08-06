import { expect } from 'chai';
import { Input, InputProps } from '../Input/input';

// import { inputsData } from '../../../public/inputsData';

const validate = () => {
  console.log('The input is valid');
};

const inputProps: InputProps = {
  name: 'inputName',
  type: 'text',
  placeholder: 'Enter your name',
  value: 'John Doe',
  classes: ['input-style'],
  validate: true,
  events: {
    blur: validate,
  },
};

describe('Input Component Test', () => {
  let inputElement;
  beforeEach(() => {
    const input = new Input(inputProps);
    inputElement = input.getContent() as HTMLInputElement;
  });

  it('Check input exists and check attributes', () => {
    expect(inputElement).to.exist;
    expect(inputElement?.tagName.toLowerCase()).to.equal('input');
    expect(inputElement?.getAttribute('name')).to.equal('inputName');
    expect(inputElement?.getAttribute('type')).to.equal('text');
    expect(inputElement?.getAttribute('placeholder')).to.equal(
      'Enter your name'
    );
    expect(inputElement?.value).to.equal('John Doe');
  });

  it('input can be changed', () => {
    inputElement.setAttribute('value', 'JohnDoe');
    expect(inputElement?.value).to.equal('JohnDoe');
  });

  // it('should validate input on blur event', () => {
  //   const warning = 'Please enter a valid name';
  //   let valid = true;
  //   let message = '';
  //   const toggleWarning = (v: boolean, m: string) => {
  //     valid = v;
  //     message = m;
  //   };
  //   console.log(inputElement.outerHTML);

  //   inputElement.addEventListener('blur', () => {
  //     console.log('BLUR');
  //     toggleWarning(false, warning);
  //   });

  //   inputElement.blur();

  //   expect(valid).to.be.false;
  //   expect(message).to.equal(warning);
  // });
});
