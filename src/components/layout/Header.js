import { Link, NavLink } from 'react-router-dom';

import clsx from 'clsx';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import AuthButton from '../../pages/auth/components/AuthButton';

import './Header.css';

function Header({ className }) {
  return (
    <header className={clsx('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width={32} height={32} fill="red" />
          {/* <img src={logo} alt="twitter-react" /> */}
        </div>
      </ Link>
      <nav className="header-nav">
        <NavLink to="/tweets/new" replace>New tweet</ NavLink>||
        <NavLink to="/tweets" end>See latest tweets</ NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
