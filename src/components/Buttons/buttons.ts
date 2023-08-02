import Block from '../../utils/Block';
import { template, templateAwesome } from './buttons.templ';
import styles from './styles.module.scss';

export interface ButtonProps {
  type?: string;
  label: string;
  classes?: string[];
  disabled?: boolean;
  events?: {
    click: () => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({ type: 'button', disabled: false, ...props });
  }

  init() {
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c: string) => styles[c]);
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

interface ButtonAwesomeProps {
  icon: string;
  title: string;
  classes?: string[];
  class?: string[];
  type?: 'button' | 'submit';
  events?: {
    click?: () => void;
  };
}

export class ButtonAwesome extends Block<ButtonAwesomeProps> {
  constructor(props: ButtonAwesomeProps) {
    super({ ...props, type: 'button' });
  }

  init() {
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c) => styles[c]);
    }
  }

  render() {
    return this.compile(templateAwesome, { ...this.props, styles });
  }
}
