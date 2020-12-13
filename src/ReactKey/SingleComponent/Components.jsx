import React, { useEffect } from 'react';

export const Item = ({ title, onMount, onUnmount }) => {
  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

  return <div>{title}</div>;
};

export const FunctionalComponent = ({ _key, title, onMount, onUnmount }) => {
  return <Item key={_key} title={title} onMount={onMount} onUnmount={onUnmount} />;
};

class ClassItem extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <div>{this.props.title}</div>;
  }
}

export class ClassComponent extends React.Component {
  render() {
    const { _key, title, onMount, onUnmount } = this.props;

    return <ClassItem key={_key} title={title} onMount={onMount} onUnmount={onUnmount} />;
  }
}
