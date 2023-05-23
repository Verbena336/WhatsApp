import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

import formatNumber from '../../utils/formatNumber';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const number = localStorage.getItem('number');
  const formatedNumber = number ? formatNumber(number!) : '';

  const handleLogout = (): void => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.number}>{formatedNumber}</div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
