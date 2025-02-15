import { User } from '../api/AuthAPI';
import { ChatsAPI, ChatInfo } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

type Response = {
  success: boolean;
  chat?: User | null;
  chats?: User[] | null;
  error: unknown | null;
};

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  // create chat
  async createChat(title: string) {
    try {
      await this.api.create(title);
      await this.updateChats();
      return {
        success: true,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error,
      };
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.delete(id);
      await this.updateChats();
      return {
        success: true,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error,
      };
    }
  }

  async editChatAvatar(data: FormData): Promise<Response> {
    try {
      const chat = await this.api.editChatAvatar(data);
      const index = store.getSelectedChatIndex();
      store.set(`chats.${index}`, chat);
      return {
        success: true,
        chat,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        chat: null,
        error,
      };
    }
  }

  async updateChats() {
    try {
      const newChats = await this.api.read();
      const oldChats = store.getChats();
      const oldChatsIds = oldChats.map((chat: ChatInfo) => chat.id);
      const newChat = newChats.filter(
        (chat) => !oldChatsIds.includes(chat.id)
      )[0];
      let chats;
      let selectedChat;
      // newChat can be undefined if it was deleted
      if (newChat) {
        // chat was added
        chats = [newChat, ...oldChats];
        selectedChat = newChat.id;
        const token = await this.getToken(newChat.id);
        await MessagesController.connect(newChat.id, token);
      } else {
        // chat was deleted
        chats = newChats;
        selectedChat = newChats[0] ? newChats[0].id : null;
      }
      store.set('chats', chats);
      store.set('selectedChat', selectedChat);

      if (selectedChat) this.getChatUsers(selectedChat);

      return {
        success: true,
        chats,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        chats: null,
        error,
      };
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();
      store.set('chats', chats);
      if (!store.getState().selectedChat && chats.length > 0) {
        this.selectChat(chats[0].id);
      }
      chats.forEach(async (chat) => {
        const token = await this.getToken(chat.id);
        // this is very long, but swagger doesn't support complex requests to JOIN data
        await MessagesController.connect(chat.id, token);
        const res = await this.getChatUsers(chat.id);
        if (res.success) {
          store.set(`chatsUsers.${chat.id}`, res.users);
        }
      });
      return {
        success: true,
        chats: null,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        chats: null,
        error,
      };
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);
      const res = await this.getChatUsers(id);
      if (res.success) {
        return {
          success: true,
          users: res.users,
          error: null,
        };
      }
      return {
        success: false,
        users: null,
        error: res.error,
      };
    } catch (error: unknown) {
      return {
        success: false,
        users: null,
        error,
      };
    }
  }

  async removeUserFromChat(id: number, userId: number) {
    try {
      await this.api.removeUsers(id, [userId]);
      const res = await this.getChatUsers(id);
      if (res.success) {
        return {
          success: true,
          users: res.users,
          error: null,
        };
      }
      return {
        success: false,
        users: null,
        error: res.error,
      };
    } catch (error: unknown) {
      return {
        success: false,
        users: null,
        error,
      };
    }
  }

  async getChatUsers(id: number) {
    try {
      const users = await this.api.getUsers(id);
      store.set(`chatsUsers.${id}`, users);
      return {
        success: true,
        users,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        users: null,
        error,
      };
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async selectChat(id: number) {
    store.set('selectedChat', id);

    try {
      const authorId = store.getChatById(id).created_by;
      const users = store.getChatUsers();
      const author = users.filter((user: User) => user.id === authorId)[0]
        .login;
      // const chat = store.getChatById(id);
      // console.log(chat);
      console.log(`Author: ${author}`);
    } catch {
      console.log("Couldn't define author");
    }
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
