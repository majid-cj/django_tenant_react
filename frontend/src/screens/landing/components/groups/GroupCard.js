import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateTodoGroups } from '../../../../actions';
import { IconButton } from '../../../../components/buttons';
import { GroupField } from '../../../../components/inputs';
import { doNothing } from '../../../../utils/utils';

export const GroupCard = ({ group, callBack = doNothing }) => {
  const [edit, setEdit] = useState(false);
  const { id, name } = group;
  const { push } = useHistory();
  const [newName, setNewName] = useState(name);
  const dispatch = useDispatch();

  const onValue = (value) => {
    setNewName(value);
  };

  const update = () => {
    dispatch(
      updateTodoGroups({ id: id, name: newName }, () => {
        callBack();

        setEdit(!edit);
      })
    );
  };

  return (
    <div className='text-center rounded col-3 border border-light' style={{ margin: 4, height: edit ? 100 : 75 }}>
      {edit ? (
        <GroupField initialValue={newName} onValue={onValue} />
      ) : (
        <p
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            marginBlock: 8,
          }}
        >
          {newName}
        </p>
      )}

      <div className='btn-group'>
        <IconButton
          icon={'eye'}
          type={'primary'}
          onClick={() => {
            push({ pathname: `groups/${id}/todo` });
          }}
        />
        <IconButton
          icon={'pencil-square'}
          type={'warning'}
          onClick={() => {
            setEdit(!edit);
          }}
        />

        {edit && <IconButton icon={'check'} type={'success'} onClick={update} />}
      </div>
    </div>
  );
};
