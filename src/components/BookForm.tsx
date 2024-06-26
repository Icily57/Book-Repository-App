import React, { useRef } from 'react';

interface BookFormProps {
  dispatch: React.Dispatch<any>;
}

const BookForm: React.FC<BookFormProps> = ({ dispatch }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current) {
      const newBook = {
        id: Date.now(),
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      };
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 bg-white p-4 rounded shadow-md">
      <input ref={titleRef} type="text" placeholder="Title" className="p-2 border border-gray-300 rounded" />
      <input ref={authorRef} type="text" placeholder="Author" className="p-2 border border-gray-300 rounded" />
      <input ref={yearRef} type="number" placeholder="Year" className="p-2 border border-gray-300 rounded" />
      <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Add Book</button>
    </form>
  );
};

export default BookForm;
