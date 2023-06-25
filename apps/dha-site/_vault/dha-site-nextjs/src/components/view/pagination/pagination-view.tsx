import { MouseEvent } from 'react';

import styles from './pagination.module.scss';

interface Props {
  count: number;
  curIndex: number;
  buttonSelectedHandler(pageNum: number): void;
}

export default function PaginationView({
  count,
  curIndex,
  buttonSelectedHandler,
}: Props) {
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const pageNum = +(e.target as HTMLButtonElement).innerHTML;

    buttonSelectedHandler(pageNum);
  };

  // TODO - move below to use state?
  /////////////////////////////////////////////
  const buttons = [];
  for (let i = 0; i < count; i++) {
    const li = (
      <button
        onClick={handleSubmit}
        className={i === curIndex ? 'button-active' : ''}
      >
        {i + 1}
      </button>
    );
    buttons.push(li);
  }
  /////////////////////////////////////////////

  return <ul>{buttons}</ul>;
}