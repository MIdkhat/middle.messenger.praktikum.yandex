import Block from '../../utils/Block';
import { template } from './settings.templ';
import styles from './styles.module.scss';
import { Tag } from '../../components/Tags/tags';

export class SettingsPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.tag = new Tag({
      tag: 'p',
      content: 'Settings',
    });
    //
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
