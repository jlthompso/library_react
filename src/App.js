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
    if (window.localStorage.getItem('books') === null) {
      window.localStorage.setItem('books', null)
    } else {
      this.state = {books: JSON.parse(window.localStorage.getItem('books'))}
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
    e.target.reset()
    let books = this.state.books
    books.push({title, author, pages, read})
    window.localStorage.setItem('books', JSON.stringify(books))
    this.setState({'books': books})
  }

  handleClick = (e, index, title) => {
    switch (e.target.getAttribute('class')) {
      case 'deleteButton':
        if (window.confirm(`Are you sure you want to delete ${title}?`)) {
          let books = this.state.books
          books.splice(index, 1)
          window.localStorage.setItem('books', JSON.stringify(books))
          this.setState({'books': books})
        }
        break
      case 'readStatusCell':
        let books = this.state.books
        books[index].read = !books[index].read
        window.localStorage.setItem('books', JSON.stringify(books))
        this.setState({'books': books})
        break
      default:
        break
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
            onClick={(e) => this.handleClick(e, index, book.title)}
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
      <ReadStatusCell read={props.read} onClick={props.onClick} />
    </tr>
  )
}

function ReadStatusCell (props) {
  return (
    <td class='readStatusCell' onClick={props.onClick}>{props.read}</td>
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
    <button class='deleteButton' onClick={props.onClick}>X</button>
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
