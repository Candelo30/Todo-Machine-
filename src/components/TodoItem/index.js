import React from 'react';
import './TodoItem.css';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import {TodoContext} from '../TodoContext';

function TodoItem(props) {
  return (
    <li className={`TodoItem ${props.completed && 'TodoItems-completed'}`}>
      <BsCheckLg
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
      />
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <BsXLg className="Icon Icon-delete" onClick={props.onDelete} />
      <div className="">
      </div>
    </li>
  );
}

export { TodoItem };
