import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = (props) => {
  const styles = {
    padding: '.5rem .75rem',
    display: 'inline-block',
    cursor: 'pointer',
    marginRight: '.5rem',
    marginBottom: '.5rem',
    fontSize: '.875rem',
    backgroundColor: '#1c54b9',
    color: '#fff',
    border: 0,
  } as React.CSSProperties;

  return <button style={styles} {...props} />;
};

export default Button;
