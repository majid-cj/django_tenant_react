import React from 'react';
import { useHistory } from 'react-router';
import { IconButton } from '../../../../components/buttons';

export const CardListView = ({ groups = [] }) => {
  const { push } = useHistory();

  return (
    <div className='row'>
      {groups.map((group) => (
        <div key={group.id} className='text-center rounded col-3 border border-light' style={{ margin: 4, height: 75 }}>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marginBlock: 8,
            }}
          >
            {group.name}
          </p>

          <div className='btn-group'>
            <IconButton
              icon={'eye'}
              type={'success'}
              onClick={() => {
                push({ pathname: `groups/${group.id}/todo` });
              }}
            />
            <IconButton icon={'pencil-square'} type={'warning'} />
          </div>
        </div>
      ))}
    </div>
  );
};
