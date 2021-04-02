import React, { useEffect, useState } from 'react';
import { debounce } from '../../utils/utils';

export const Alert = ({ message, show = false, alertType = 'danger', fontSize = 10 }) => {
  const [alert, setAlert] = useState(show);
  const onAlert = debounce((newAlert) => {
    setAlert(newAlert);
  }, 3000);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      onAlert(show);
    }

    return () => {
      unmounted = true;
    };
  }, [alert, show]);

  if (!alert) return <React.Fragment />;

  return (
    <div
      className={`text-center col-12 alert-${alertType} m-1`}
      style={{
        fontSize: fontSize,
        fontWeight: 'bold',
        background: 'transparent',
      }}
    >
      {message}
    </div>
  );
};
