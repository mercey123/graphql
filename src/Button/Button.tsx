import React from 'react';
import './Button.css';

function Button(theme: any) {
  return (
    <div className="button">
      {theme.value}
    </div>
  );
}

export default Button;
