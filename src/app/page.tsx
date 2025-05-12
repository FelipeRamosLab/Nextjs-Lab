'use client';

import '@/style/style.scss';
import { useEffect, useReducer } from 'react';
import booksBundle from '@/books.json';

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
}

type Filter = {
  start: boolean;
  title: string;
  author: string;
  year: number;
  result: Book[]
}

type ReducerAction = {
  toStart?: boolean,
  field?: 'title' | 'author' | 'year';
  value?: string | number;
}

const initialState: Filter = {
  start: false,
  title: '',
  author: '',
  year: 0,
  result: []
};

export default function Home() {
  const [ filter, dispatch ] = useReducer((state: Filter, action: ReducerAction) => {
    const newValue = { ...state };

    if (state.start) {
      newValue.start = true;
      newValue.result = booksBundle;

      return newValue;
    }

    switch (action.field) {
      case 'author':
        newValue.author = String(action.value);
        break;
      case 'title':
        newValue.title = String(action.value);
        break;
      case 'year':
        newValue.year = Number(action.value);
        break;
    }

    if (!newValue.author && !newValue.title && !newValue.year) {
      newValue.result = booksBundle;
    } else {
      newValue.result = booksBundle.filter(item => {
        const authorStore = newValue.author.toLowerCase();
        const titleStore = newValue.author.toLowerCase();
        const authorInput = item.author.toLowerCase();
        const titleInput = item.author.toLowerCase();

        return [
          (!newValue.author || authorInput.indexOf(authorStore) > -1),
          (!newValue.title || titleInput.indexOf(titleStore) > -1),
          (!newValue.year || item.year === newValue.year)
        ].every(item => item);
      });
    }

    return newValue;
  }, initialState);

  useEffect(() => {
    dispatch({ toStart: true });
  }, []);
  
  return (
    <div className="search-box">
      <div className="inputs">
        <div className="input-wrap">
          <label htmlFor="title">
            Title
          </label>

          <input type="text" id="title" value={filter.title} onChange={(e) => dispatch({ field: 'title', value: e.target.value })} />
        </div>

        <div className="input-wrap">
          <label htmlFor="author">
            Author
          </label>

          <input type="text" id="author" value={filter.author} onChange={(e) => dispatch({ field: 'author', value: e.target.value })} />
        </div>

        <div className="input-wrap">
          <label htmlFor="year">
            Year
          </label>

          <input type="number"  id="year" value={filter.year} onChange={(e) => dispatch({ field: 'year', value: e.target.value })} />
        </div>
      </div>

      <div className="books-list">
        {filter.result.map(book => (
          <div key={book.id} className="book">
            <div className="line">
              <span className="label">
                Title
              </span>
              <span className="value">
                {book.title}
              </span>
            </div>
            <div className="line">
              <span className="label">
                Author
              </span>
              <span className="value">
                {book.author}
              </span>
            </div>
            <div className="line">
              <span className="label">
                Year
              </span>
              <span className="value">
                {book.year}
              </span>
            </div>
            <div className="line">
              <span className="label">
                ID
              </span>
              <span className="value">
                {book.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
