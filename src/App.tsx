import React, { useReducer, useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import useLocalStorage from './hooks/useLocalStorage';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

type ActionType =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number };

const bookReducer = (state: Book[], action: ActionType): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.payload);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const initialBooks: Book[] = [
    {id: 1,title: "To Kill a Mockingbird",author: "Harper Lee",year: 1960},
    {id: 2,title: "1984",author: "George Orwell",year: 1949},
    {id: 3,title: "The Great Gatsby",author: "F. Scott Fitzgerald",year: 1925},
    {id: 4,title: "Pride and Prejudice",author: "Jane Austen",year: 1813},
    {id: 5,title: "The Catcher in the Rye",author: "J.D. Salinger",year: 1951},
    {id: 6,title: "Animal Farm",author: "George Orwell",year: 1945},
    {id: 7,title: "Brave New World",author: "Aldous Huxley",year: 1932},
    {id: 8,title: "The Hobbit",author: "J.R.R. Tolkien",year: 1937},
    {id: 9,title: "Harry Potter and the Philosopher's Stone",author: "J.K. Rowling",year: 1997},
    {id: 10,title: "The Lord of the Rings",author: "J.R.R. Tolkien",year: 1954},
  ];

  const [books, setBooks] = useLocalStorage<Book[]>('books', initialBooks);
  const [state, dispatch] = useReducer(bookReducer, books);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setBooks(state);
  }, [state, setBooks]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = state.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const booksToDisplay = searchTerm ? filteredBooks : state;

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-white text-center">Book Repository</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded mb-4 w-full text-black"
      />
      <BookForm dispatch={dispatch} />
      <BookList books={booksToDisplay} dispatch={dispatch} currentPage={currentPage} />
      <Pagination currentPage={currentPage} totalBooks={booksToDisplay.length} setPage={setCurrentPage} />
    </div>
  );
};

export default App;
