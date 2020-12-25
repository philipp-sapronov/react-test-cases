import React, { useState } from 'react';

export const ChangeState = ({ onRender, count = 1 }) => {
  const [state, setState] = useState(0);

  onRender(state);

  const handleClick = () => {
    for (let i = 0; i < count; i++) {
      setState(state + 1);
    }
  };

  return <button onClick={handleClick}>{state}</button>;
};

export const ChangeStateWithCallback = ({ onRender, count = 1 }) => {
  const [state, setState] = useState(0);

  onRender(state);

  const handleClick = () => {
    for (let i = 0; i < count; i++) {
      setState((prev) => prev + 1);
    }
  };

  return <button onClick={handleClick}>{state}</button>;
};

export const ChangeStateWithSetTimeout = ({ onRender, count = 1 }) => {
  const [state, setState] = useState(0);

  onRender(state);

  const handleClick = () => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => setState((prev) => prev + 1), i);
    }
  };

  return <button onClick={handleClick}>{state}</button>;
};

export const ChangeStateWithZeroTimeout = ({ onRender, count = 1 }) => {
  const [state, setState] = useState(0);

  onRender(state);

  const handleClick = () => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => setState((prev) => prev + 1), 0);
    }
  };

  return <button onClick={handleClick}>{state}</button>;
};

export const ChangeStateWithClosureAndZeroTimeout = ({ onRender, count = 1 }) => {
  const [state, setState] = useState(0);

  onRender(state);

  const handleClick = () => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => setState(state + 1), 0);
    }
  };

  return <button onClick={handleClick}>{state}</button>;
};
