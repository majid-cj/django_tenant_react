import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTodoErrors, createTodoGroups } from '../../../../actions';
import { IconButton } from '../../../../components/buttons';
import { SearchField } from '../../../../components/inputs';
import { AddGroupModal } from '../../../../components/modals';
import { Alert, LandingLoader } from '../../../../components/ui';
import { TODO_GROUP_URL } from '../../../../constants';
import { fetchListHook } from '../../../../hooks';
import { debounce } from '../../../../utils/utils';
import { CardListView } from './CardListView';

export const GroupsLists = () => {
  const dispatch = useDispatch();
  const todoError = useSelector((state) => state.error.todo);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState(TODO_GROUP_URL);

  const [
    {
      data: { results, next, previous, count },
      loading,
      error,
    },
    getData,
  ] = fetchListHook(TODO_GROUP_URL);

  const dismiss = () => {
    dispatch(clearTodoErrors());
    setShow(false);
  };

  const submit = () =>
    dispatch(
      createTodoGroups({ name: name }, () => {
        debounce(() => {
          setShow(false);
        })();
        debounce(() => {
          getData(`${TODO_GROUP_URL}?page=1`);
        })();
      })
    );

  return (
    <>
      <div className='d-flex align-items-center'>
        <IconButton onClick={() => setShow(true)} icon={'folder-plus'} />
        <SearchField onValue={(value) => setUrl(`${TODO_GROUP_URL}?search=${value}`)} />
        <IconButton onClick={() => getData(url)} icon={'search'} />

        <IconButton
          onClick={() => getData(previous)}
          icon={'caret-left'}
          active={previous === null || previous === undefined}
        />
        <span>
          {results?.length} of {count}
        </span>
        <IconButton onClick={() => getData(next)} icon={'caret-right '} active={next === null || next === undefined} />
      </div>
      {error && <Alert show={true} message={error} fontSize={18} />}

      <CardListView groups={results} callBack={()=>{getData(`${TODO_GROUP_URL}?page=1`)}}/>
      <LandingLoader show={loading} />
      <AddGroupModal show={show} dismiss={dismiss} submit={submit} setName={setName} error={todoError} />
    </>
  );
};
