import React, { Component } from 'react';
import s from './ContactList.module.css';

export class ContactList extends Component {
  removeContact = id => {
    this.props.onClick(id);
  };

  render() {
    const arr = this.props.data;
    return arr.map(({ id, name, number }) => (
      <li key={id} className={s.listItem}>
        <p className={s.pEl}>{name}</p>:{' '}
        <span className={s.spanEl}>{number}</span>
        <button
          className={s.btn}
          type="button"
          onClick={() => this.removeContact(id)}
        >
          Delete
        </button>
      </li>
    ));
  }
}

export default ContactList;
