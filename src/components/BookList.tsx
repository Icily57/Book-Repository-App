import React from 'react';

interface BookListProps {
  books: any[];
  dispatch: React.Dispatch<any>;
  currentPage: number;
}

const BookList: React.FC<BookListProps> = ({ books, dispatch, currentPage }) => {
  const booksPerPage = 5;
  const startIndex = (currentPage - 1) * booksPerPage;
  const selectedBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <table className="min-w-full divide-y divide-gray-200 mb-4 bg-white shadow-md rounded">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {selectedBooks.map((book) => (
          <tr key={book.id}>
            <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
            <td className="px-6 py-4 whitespace-nowrap">{book.year}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => dispatch({ type: 'DELETE_BOOK', payload: book.id })}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
