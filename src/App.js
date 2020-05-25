import React from 'react'
import './App.css'

function App () {
  return (
    <BookTable />
  )
}

class BookTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [
        {
          title: 'Yurts: Living in the Round',
          author: 'Becky Kemery',
          pages: 146,
          read: false
        },
        {
          title: 'Psychovertical',
          author: 'Andy Kirkpatrick',
          pages: 288,
          read: true
        },
        {
          title: 'Dead Mountain: The Untold True Story of the Dyatlov Pass Incident',
          author: 'Donnie Eichar',
          pages: 288,
          read: true
        },
        {
          title: 'Reinhold Messner: My Life At The Limit',
          author: 'Reinhold Messner',
          pages: 256,
          read: false
        }
      ]
    }
  }

  render() {
    return (
      <table>
        <tr>
          <td></td>
          <th>Title</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Read?</th>
        </tr>
        {this.state.books.map((book) => {
          return <BookRow 
            title = {book.title}
            author = {book.author}
            pages = {book.pages}
            read = {book.read ? 'yes' : 'no'}
          />
        })}
        <AddBookForm />
      </table>
    )
  }
}

function BookRow (props) {
  return (
    <tr>
      <td>
        <DeleteBookButton />
      </td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>{props.pages}</td>
      <td>{props.read}</td>
    </tr>
  )
}

class AddBookForm extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <AddBookButton />
        </td>
        <td>
          <input type='text' placeholder='Enter book details...' required></input>
        </td>
        <td>
          <input type='text' required></input>
        </td>
        <td>
          <input type='number' required></input>
        </td>
        <td>
          <input type='checkbox'></input>
        </td>
      </tr>
    )
  }
}

function DeleteBookButton () {
  return (
    <button>X</button>
  )
}

function AddBookButton () {
  return (
    <button>+</button>
  )
}

export default App
