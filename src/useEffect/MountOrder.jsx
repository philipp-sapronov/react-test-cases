import React, { useEffect } from 'react';

export const MountOrder = ({ children, onMount, index }) => {
  useEffect(() => {
    onMount(index);
  });
  return <div>{children}</div>;
};
