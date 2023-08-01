import Block from '../../utils/Block';
import { template } from './form.templ';
import { Tag } from '../Tags/tags';
import { setStyles, warningStyles } from '../../utils/Helpers';
import * as stylesDefs from './styles.module.scss';

const styles = stylesDefs.default;

interface FormProps {
  title?: string;
  inputs: Block[];
  buttons: Block[];
  avatar?: Block;
  link?: Block;
  info?: Block;
  onSubmit?: () => void;
  valid?: boolean;
  events?: {
    submit: (e: Event) => Promise<void>;
  };
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ title: '', valid: false, ...props });
  }

  init() {
    this.children.title = new Tag({
      tag: 'h2',
      content: this.props.title,
    });

    // add toggleWarning to inputs
    const inputContainers = this.children.inputs as Block[];
    const inputs = inputContainers.map((container) => {
      const content = container.children.content as Block[];
      return content[1];
    });

    inputs.forEach((i: Block) => {
      i.setProps({
        toggleWarning: this.toggleWarning.bind(this),
      });
    });
  }

  toggleWarning(valid: boolean, message: string) {
    const info = this.children.info as Block;
    const warningElement = info.getContent() as HTMLElement;
    if (warningElement) {
      if (valid) {
        setStyles(warningElement, warningStyles.pending);
        warningElement.getElementsByTagName('p')[0].textContent = '';
      } else {
        setStyles(warningElement, warningStyles.invalid);
        warningElement.getElementsByTagName('p')[0].textContent = message;
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
