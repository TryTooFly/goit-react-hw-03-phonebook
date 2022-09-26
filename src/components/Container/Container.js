import React from 'react';
import c from './Container.module.css';

function Container({ children }) {
  return <div className={c.container}>{children}</div>;
}

export default Container;
