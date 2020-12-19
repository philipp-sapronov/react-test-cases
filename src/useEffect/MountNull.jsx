import { useEffect } from 'react';

export const MountNull = ({ onMount }) => {
  useEffect(() => {
    onMount();
  }, []);
  return null;
};
