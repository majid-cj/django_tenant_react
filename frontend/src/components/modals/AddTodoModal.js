import React, { useEffect, useState } from 'react';
import { debounce, doNothing } from '../../utils/utils';
import { IconButton } from '../buttons';
import { BodyField, TitleInput } from '../inputs';

export const AddTodoModal = ({
  show = false,
  submit = doNothing,
  dismiss = doNothing,
  setTitle = doNothing,
  setBody = doNothing,
  error = undefined,
}) => {
  const [loading, setLoading] = useState(show);
  const onLoading = debounce((newAlert) => {
    setLoading(newAlert);
  });

  useEffect(() => {
    onLoading(show);
  }, [onLoading, show]);

  if (!loading) return <React.Fragment />;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: 'transparent',
        width: '100%',
        height: '100%',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ background: '#f5f5f5', borderRadius: 16, padding: 8 }}>
        <TitleInput onValue={(title) => setTitle(title)} />

        <BodyField onValue={(body) => setBody(body)} />

        {error && (
          <p className={'text-center text-danger'} style={{ fontSize: 12 }}>
            {error}
          </p>
        )}

        <div className='d-flex align-items-center justify-content-between'>
          <IconButton icon={'plus'} title={'add todo'} onClick={submit} type={'success'} />
          <IconButton icon={'x'} title={'close'} onClick={dismiss} type={'danger'} />
        </div>
      </div>
    </div>
  );
};
