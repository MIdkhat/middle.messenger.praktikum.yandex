// @ts-nocheck
import Block from '../../utils/Block';
import { template } from './messages.templ';
import store, { withStore } from '../../utils/Store';
import { isEqual, parseDate } from '../../utils/Helpers';
import { ContainerScroller, ContainerMessage } from '../Containers/containers';
import { Message } from '../../controllers/MessagesController';
import { User } from '../../api/AuthAPI';
import styles from './styles.module.scss';

interface MessagesProps {
  messages: Message[];
  chatsUsers: User[];
  isLoaded: boolean;
}

class MessagesBase extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super({ ...props });
  }

  protected init() {
    this.children.messages = new ContainerScroller({
      content: this.createMessages(this.props),
    });
  }

  protected componentDidUpdate(
    oldProps: MessagesProps,
    newProps: MessagesProps
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.messages = new ContainerScroller({
        content: this.createMessages(this.props),
      });

      setTimeout(() => {
        this.scrollTop();
      }, 0);

      return true;
    }
    return false;
  }

  public scrollTop = () => {
    const element = (
      this.children.messages as Block
    ).getContent() as HTMLElement;
    element.scrollTop = element.scrollHeight;
  };

  private createMessages(props: MessagesProps) {
    if (!props.messages) return [];
    const users = props.chatsUsers;
    const messages = props.messages.filter((m) => m.type !== 'user connected');
    return messages.map((m: Message) => {
      const getParts = (m: Message): Record<string, string> => {
        const message = m.content;
        if (!users || users.length === 0 || !m.user_id) {
          return { author: '', message };
        }
        // get user the chat with
        const sender = users.filter((u) => u.id === m.user_id)[0];
        if (!sender) return { author: '', message: '' };

        const user = store.getUser();
        const author = user.id === sender.id ? 'You' : sender.first_name;

        const { avatar } = sender;
        return { author, message, avatar };
      };
      const { author, message, avatar } = getParts(m);

      return new ContainerMessage({
        author,
        avatar,
        hideAvatar: false,
        message,
        date: parseDate(m.time),
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;
  const messages =
    state.messages && selectedChatId ? state.messages[selectedChatId] : [];
  const chatsUsers =
    state.chatsUsers && selectedChatId ? state.chatsUsers[selectedChatId] : [];
  try {
    return {
      messages,
      chatsUsers,
      isLoaded: false,
    };
  } catch {
    return { messages: [], chatsUsers: [], isLoaded: false };
  }
});

export const Messages = withMessages(MessagesBase);
