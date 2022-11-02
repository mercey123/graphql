import Button from '../Button/Button';
import Search_bar from '../Search_bar/Search_bar';
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Search_bar />
      <div className='header__buttons'>
        <Button value={"Светлая тема"} />
        <Button value={"Темная тема"} />
      </div>
    </div>
  );
}

export default Header;
