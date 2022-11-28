import React from 'react';
import './button.css';

interface ButtonProps {
  buttonText: string;
  handler: () => void
}

function Button({ buttonText, handler }: ButtonProps) {
  return (
    <div
      className="button"
      onClick={handler}
    >
      {buttonText}
    </div>
  );
}

export default Button;
