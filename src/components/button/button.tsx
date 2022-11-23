import React from 'react';
import './button.css';

interface ButtonProps {
  buttonText: string
}

function Button({ buttonText }: ButtonProps) {
  return (
    <div className="button">
      {buttonText}
    </div>
  );
}

export default Button;
