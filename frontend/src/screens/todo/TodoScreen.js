import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { clearTodoErrors, createTodo } from '../../actions';
import { IconButton } from '../../components/buttons';
import { SearchField } from '../../components/inputs';
import { Alert, LandingLoader } from '../../components/ui';
import { AddTodoModal } from '../../components/modals';
import { TODO_URL } from '../../constants';
import { fetchListHook } from '../../hooks';
import { debounce } from '../../utils/utils';
import { TodoList } from './components';

export const TodoScreen = () => {
  const { group_id } = useParams();
  const dispatch = useDispatch();
  const todoError = useSelector((state) => state.error.todo);
  const [show, setShow] = useState(false);
  const [todo, setToDo] = useState({
    group: group_id,
    title: '',
    body: '',
  });
  const [url, setUrl] = useState(`${TODO_URL}?group=${group_id}`);

  const [
    {
      data: { results = [], next, previous, count = 0 },
      loading,
      error,
    },
    getData,
  ] = fetchListHook(`${TODO_URL}?group=${group_id}`);

  const setTitle = (title) => {
    setToDo({ ...todo, title: title });
  };

  const setBody = (body) => {
    setToDo({ ...todo, body: body });
  };

  const dismiss = () => {
    dispatch(clearTodoErrors());
    setShow(false);
  };

  const submit = () =>
    dispatch(
      createTodo(todo, () => {
        debounce(() => {
          setShow(false);
        })();
        debounce(() => {
          getData(`${TODO_URL}?page=1&group=${group_id}`);
        })();
      })
    );

  return (
    <>
      <div className='d-flex align-items-center'>
        <IconButton onClick={() => setShow(true)} icon={'folder-plus'} />
        <SearchField onValue={(value) => setUrl(`${TODO_URL}?search=${value}&group=${group_id}`)} />
        <IconButton onClick={() => getData(url)} icon={'search'} />

        <IconButton
          onClick={() => getData(previous)}
          icon={'caret-left'}
          active={previous === null || previous === undefined}
        />
        <span>
          {results.length} of {count}
        </span>
        <IconButton onClick={() => getData(next)} icon={'caret-right '} active={next === null || next === undefined} />
      </div>
      {error && <Alert show={true} message={error} fontSize={18} />}

      <TodoList results={results} />
      <LandingLoader show={loading} />
      <AddTodoModal
        show={show}
        setTitle={setTitle}
        setBody={setBody}
        submit={submit}
        dismiss={dismiss}
        error={todoError}
      />
    </>
  );
};
