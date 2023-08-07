// @ts-nocheck
import Block from '../../utils/Block';
import { template } from './chatList.templ';
import { Chat } from '../Chat/chat';
import store, { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import styles from './styles.module.scss';

interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map((chat: ChatInfo) => {
      const selected = store.isSelectedChat(chat.id);
      const users = store.getChatUsers(chat.id);
      return new Chat({
        selected,
        chat,
        users,
        events: {
          click: () => {
            ChatsController.selectChat(chat.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
