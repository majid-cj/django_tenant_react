import React from 'react';
import { doNothing } from '../../../../utils/utils';
import { GroupCard } from './GroupCard';

export const CardListView = ({ groups = [], callBack = doNothing }) => {
  return (
    <div className='row'>
      {groups.map((group, index) => (
        <GroupCard group={group} key={index} callBack={callBack} />
      ))}
    </div>
  );
};
