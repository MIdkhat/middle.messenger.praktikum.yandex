import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../utils/withRouter';
import { template } from './link.templ';
import { redirect } from '../../utils/Helpers';
import { Routes } from '../../../index';
import Router from '../../utils/Router';
import styles from './styles.module.scss';

interface LinkProps extends PropsWithRouter {
  to: Routes;
  label: string;
  router?: typeof Router;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      router: Router,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    redirect({ url: this.props.to });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink);
