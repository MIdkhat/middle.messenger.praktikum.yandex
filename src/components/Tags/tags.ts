import Block from '../../utils/Block';
import { template } from './tags.templ';
import styles from './styles.module.scss';

interface TagProps {
  tag: string;
  name?: string;
  for?: string;
  content?: string;
  title?: string;
  src?: string;
  classes?: string[];
  class?: string;
  events?: {
    click: () => void;
  };
}

export class Tag extends Block<TagProps> {
  constructor(props: TagProps) {
    super({ ...props });
  }
  init() {
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c) => styles[c]).join(' ');
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
