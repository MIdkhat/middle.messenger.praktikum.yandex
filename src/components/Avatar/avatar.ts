import Block from '../../utils/Block';
import { template } from './avatar.templ';
import styles from './styles.module.scss';

interface AvatarProps {
  title: string;
  src: string | null;
  classes?: string[];
  class?: string[];
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  init() {
    const src = this.props.src
      ? `https://ya-praktikum.tech/api/v2/resources${this.props.src}`
      : './public/images/cactus.png';
    this.props.src = src;
    if (this.props.classes) {
      this.props.class = this.props.classes.map((c) => styles[c]);
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

// console.log('---');
// console.log(oldProps, newProps);
// console.log(!isEqual(oldProps, newProps));
