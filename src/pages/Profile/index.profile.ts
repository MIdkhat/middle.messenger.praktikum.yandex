import Block from '../../utils/Block';
import { Routes } from '../../../index';
import { template, detailTemplate } from './profile.templ';
import { redirect, isEqual } from '../../utils/Helpers';
import { ButtonAwesome } from '../../components/Buttons/buttons';
import { Avatar } from '../../components/AvatarProfile/avatarProfile';
import { Container } from '../../components/Containers/containers';
import { withStore } from '../../utils/Store';
import { User } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import styles from './styles.module.scss';

interface DetailsProps {
  value: string | number;
  label: string;
}

export class Details extends Block<DetailsProps> {
  constructor(props: DetailsProps) {
    super({ ...props });
  }

  render() {
    return this.compile(detailTemplate, { ...this.props, styles });
  }
}

export interface ProfileProps {
  user: User;
  isLoaded: boolean;
}

class ProfilePageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({ ...props });
  }

  protected init() {
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
        icon: 'fa-solid fa-right-from-bracket',
        title: 'Logout',
        events: {
          click: () => this.logout(),
        },
      },
    ];

    this.children.tools = new Container({
      content: buttons.map((d) => new ButtonAwesome(d)),
      classes: ['tools-top-container'],
    });

    this.children.avatar = this.setAvatar(this.props);

    this.children.details = this.setDetails(this.props);
  }

  protected componentDidUpdate(
    oldProps: ProfileProps,
    newProps: ProfileProps
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.avatar = this.setAvatar(newProps);
      this.children.details = this.setDetails(newProps);
      return true;
    }
    return false;
  }

  setAvatar(props: ProfileProps) {
    return new Avatar({
      title: 'Avatar',
      src: props.user.avatar,
      classes: ['avatar-profile'],
    });
  }

  setDetails(props: ProfileProps) {
    const { first_name, second_name, login, display_name, email, phone } =
      props.user;
    const userDetails = [
      { label: 'Name', value: first_name },
      { label: 'Last Name', value: second_name },
      { label: 'Login', value: login },
      { label: 'Display Name', value: display_name },
      { label: 'Email Address', value: email },
      { label: 'Phone Number', value: phone },
    ];
    return userDetails.map((d) => new Details(d));
  }

  logout() {
    AuthController.logout();
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ user: state.user || {} }));

export const ProfilePage = withChats(ProfilePageBase);
