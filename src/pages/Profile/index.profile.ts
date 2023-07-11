import Block from '../../utils/Block.js'
import { Routes } from '../../../index.js'
import { template, detailTemplate } from './profile.templ.js'
// import data from '../../../public/data.js'
import { redirect } from '../../utils/Helpers.js'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { Avatar } from '../../components/Avatar/avatar.js'
import { Container } from '../../components/Containers/containers.js'

import AuthController from '../../controllers/AuthController.js'
import { User } from '../../api/AuthAPI.js'
import store from '../../utils/Store'

import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
// const { profile } = data

interface DetailsProps {
  value: string | number
  label: string
}

export class Details extends Block<DetailsProps> {
  constructor(props: DetailsProps) {
    super({ ...props })
  }

  render() {
    return this.compile(detailTemplate, { ...this.props, styles })
  }
}

export class ProfilePage extends Block {
  constructor() {
    super({})
  }

  init() {
    // TOOLS
    const buttons = [
      {
        icon: 'fa-solid fa-angle-left',
        title: 'Back',
        events: {
          click: () => redirect({ url: Routes.Messenger }),
        },
      },
      {
        icon: 'far fa-edit',
        title: 'Edit Profile',
        events: {
          click: () => redirect({ url: Routes.ProfileEdit }),
        },
      },
      {
        icon: 'fa-solid fa-bars',
        title: 'Settings',
        events: {
          click: () => redirect({ url: Routes.Settings }),
        },
      },
    ]
    this.children.tools = new Container({
      content: buttons.map((d) => new ButtonAwesome(d)),
      classes: ['tools-top-container'],
    })

    const setProfile = (profile: User) => {
      this.children.avatar = new Avatar({
        title: 'Avatar',
        src: profile.avatar ? profile.avatar : './public/images/cactus.png',
        classes: ['avatar-profile'],
      })

      const userDetails = [
        { label: 'Name', value: profile.first_name },
        { label: 'Last Name', value: profile.second_name },
        { label: 'Email Address', value: profile.login },
        { label: 'Phone Number', value: profile.phone },
      ]
      this.children.details = userDetails.map((d) => new Details(d))
    }

    const loadProfile = () => {
      console.log('Store user: ', store.getUser())
      const user = store.getUser()
      if (!user) {
        AuthController.fetchUser()
          .then((user) => {
            setProfile(user)
          })
          .finally(() => {
            this.setProps({
              isLoaded: true,
            })
          })
      } else {
        setProfile(user)
      }
    }
    loadProfile()
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
