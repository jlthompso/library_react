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

  handleSubmit = (e) => {
    e.preventDefault()
    let title, author, pages, read
    for (let i = 0; i < e.target.length; i++) {
      switch (e.target[i].name) {
        case 'fTitle':
          title = e.target[i].value
          break
        case 'fAuthor':
          author = e.target[i].value
          break
        case 'fPages':
          pages = Number(e.target[i].value)
          break
        case 'fRead':
          read = e.target[i].checked
          break
        default:
          break
      }
    }
    let books = this.state.books
    books.push({title, author, pages, read})
    this.setState({'books': books})
  }

  handleClick (index, title) {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      let books = this.state.books
      books.splice(index, 1)
      this.setState({'books': books})
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
        {this.state.books.map((book, index) => {
          return <BookRow
            title={book.title}
            author={book.author}
            pages={book.pages}
            read={book.read ? 'yes' : 'no'}
            onClick={() => this.handleClick(index, book.title)}
          />
        })}
        <form id='newBookForm' onSubmit={this.handleSubmit} />
        <AddBookForm />
      </table>
    )
  }
}

function BookRow (props) {
  return (
    <tr>
      <td>
        <DeleteBookButton
          onClick={props.onClick}
        />
      </td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>{props.pages}</td>
      <td>{props.read}</td>
    </tr>
  )
}

function AddBookForm () {
  return (
    <tr>
      <td>
        <AddBookButton />
      </td>
      <td>
        <input
          type='text'
          name='fTitle'
          placeholder='Enter book details...'
          form='newBookForm'
          required
        />
      </td>
      <td>
        <input
          type='text'
          name='fAuthor'
          form='newBookForm'
          required
        />
      </td>
      <td>
        <input
          type='number'
          name='fPages'
          form='newBookForm'
          min='1'
          required
        />
      </td>
      <td>
        <input
          type='checkbox'
          name='fRead'
          form='newBookForm'
        />
      </td>
    </tr>
  )
}

function DeleteBookButton (props) {
  return (
    <button onClick={props.onClick}>X</button>
  )
}

function AddBookButton () {
  return (
    <input
      type='submit'
      form='newBookForm'
      value='+'
    />
  )
}

export default App
