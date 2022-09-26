import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { Filter } from './Filter/Filter';
import s from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Container from './Container/Container';
import { save, load } from './localstorage';

export class App extends Component {
  static propTypes = {
    filter: PropTypes.string,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    const storedContacts = load('contacts');

    storedContacts && this.setState({ contacts: storedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) save('contacts', contacts);
    // localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  addContact = (name, number) => {
    if (this.state.contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <h1 className={s.mainHeader}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <section>
          <h2 className={s.addHeader}>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />

          <ul className={s.list}>
            <ContactList data={visibleContacts} onClick={this.removeContact} />
          </ul>
        </section>
      </Container>
    );
  }
}

export default App;
