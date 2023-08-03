import Block from '../../utils/Block';
import { template } from './chat.templ';
import { ChatInfo } from '../../api/ChatsAPI';
import { Avatar } from '../Avatar/avatar';
import { User } from '../../api/AuthAPI';
import { Tag } from '../Tags/tags';
import styles from './styles.module.scss';

export interface ChatProps {
  selected: boolean;
  chat: ChatInfo;
  users: User[];
  events?: {
    click: () => void;
  };
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props });
  }
  init() {
    // console.log('CHAT:', this.props.chat.id, this.props.selected)
    this.children.avatar = this.createAvatar(this.props);
    this.children.title = this.createTitle(this.props);
  }

  private createAvatar(props: ChatProps) {
    const { chat } = props;
    const title = chat ? chat.title : '';
    const src = chat.avatar ? chat.avatar : null;

    return new Avatar({
      title,
      src,
    });
  }

  private createTitle(props: ChatProps) {
    const { chat } = props;
    const content = chat ? chat.title : '';
    return new Tag({
      tag: 'span',
      content,
      classes: ['name-chat'],
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
