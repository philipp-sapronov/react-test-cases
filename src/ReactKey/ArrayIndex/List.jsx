import React, { useState, useEffect } from "react";

const fn = () => {};

const Item = ({
  name,
  age,
  onMount = fn,
  onUnmount = fn,
  onReceiveNewProps = fn,
}) => {
  useEffect(() => {
    onMount(name, age);
    return () => onUnmount(name, age);
  }, []);

  useEffect(() => {
    onReceiveNewProps(name, age);
  }, [name]);

  return (
    <li className="list__item">
      <span className="name">{name}</span>
      <span className="age">{age}</span>
    </li>
  );
};

export const ListOfItemsWithIndexKeys = ({
  list,
  onClick,
  onItemMount,
  onItemUnmount,
  onItemReceiveNewProps,
}) => {
  const [state, setState] = useState(list);

  const handleClick = () => {
    setState(onClick);
  };

  return (
    <div>
      <ul className="list">
        {state.map((item, idx) => (
          <Item
            key={idx}
            name={item.name}
            age={item.age}
            onMount={onItemMount}
            onUnmount={onItemUnmount}
            onReceiveNewProps={onItemReceiveNewProps}
          />
        ))}
      </ul>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export const ListOfItemsWithUniqueKeys = ({
  list,
  onClick,
  onItemMount,
  onItemUnmount,
  onItemReceiveNewProps,
}) => {
  const [state, setState] = useState(list);

  const handleClick = () => {
    setState(onClick);
  };

  return (
    <div>
      <ul className="list">
        {state.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            age={item.age}
            onMount={onItemMount}
            onUnmount={onItemUnmount}
            onReceiveNewProps={onItemReceiveNewProps}
          />
        ))}
      </ul>
      <button onClick={handleClick}>click</button>
    </div>
  );
};
