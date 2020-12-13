import React, { useEffect } from 'react';

export const Item = ({ onMount, onUnmount }) => {
  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

  return <div>Hallo world!</div>;
};

export const FunctionalComponent = ({ _key, onMount, onUnmount }) => {
  return <Item key={_key} onMount={onMount} onUnmount={onUnmount} />;
};
