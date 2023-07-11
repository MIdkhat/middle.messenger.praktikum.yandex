import Block from '../../utils/Block.js'
import { template } from './chatTop.templ.js'
import { withStore } from '../../utils/Store.js'
import { ChatInfo } from '../../api/ChatsAPI.js'
import { User } from '../../api/AuthAPI.js'
import { Avatar } from '../Avatar/avatar.js'
import { ButtonAwesome } from '../Buttons/buttons.js'
import { Container } from '../Containers/containers.js'
// import ChatsController from '../../controllers/ChatsController.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
import store from '../../utils/Store.js'
import { Tag } from '../Tags/tags.js'
import { isEqual } from '../../utils/Helpers.js'

interface ChatTopProps extends ChatInfo {
  selectedChat: number
  selected: boolean
  users: User[]
  events: {
    addUser: () => void
    deleteChat: () => void
  }
}
export class ChatTopBase extends Block<ChatTopProps> {
  constructor(props: ChatTopProps) {
    super({ ...props })
  }
  init() {
    if (this.props.selectedChat) {
      this.children.avatarContainer = this.createAvatar(this.props)
    }

    this.children.buttonAddUser = new ButtonAwesome({
      icon: 'fa fa-user-plus',
      title: 'Add user',
      // classes: ['profile-button'],
      events: {
        click: () => this.props.events?.addUser(),
      },
    })

    this.children.buttonDeleteChat = new ButtonAwesome({
      icon: 'fa fa-times',
      title: 'Delete chat',
      // classes: ['profile-button'],
      events: {
        click: () => this.props.events?.deleteChat(),
      },
    })
  }

  protected componentDidUpdate(oldProps: ChatTopProps, newProps: ChatTopProps): boolean {
    if (!isEqual(oldProps, newProps) && newProps.selectedChat) {
      console.log('updating', newProps)
      this.children.avatar = this.createAvatar(newProps)
      return true
    }
    return false
  }

  private createAvatar(props: ChatTopProps) {
    console.log('props top', props)
    const chat = store.getChatById(props.selectedChat)
    const { title, avatar } = chat
    // console.log(title, avatar, users)
    // const usersLength = users.length ?? 0

    return new Container({
      classes: ['top-chat-avatar-container', 'blue'],
      content: [
        new Avatar({
          title,
          src: avatar ? avatar : './public/images/cactus.png',
        }),
        new Tag({
          tag: 'span',
          content: title,
          classes: ['name'],
        }),
        // new Tag({
        //   tag: 'span',
        //   content: `User${users > 1 ? 's' : ''}: ${users}`,
        // }),
      ],
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

export const withSelectedChat = withStore((state) => {
  // console.log(state)
  // const chatProps = state.selectedChat
  // console.log(chatProps)
  return { selectedChat: state.selectedChat || undefined }
})

// const withChats = withStore((state) => {
//   return { chats: [...(state.chats || [])] }
// })

export const ChatTop = withSelectedChat(ChatTopBase)
