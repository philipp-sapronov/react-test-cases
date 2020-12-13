import React, { useEffect } from 'react';

const Item = ({ onMount, onUnmount, title }) => {
  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

  return <div>{title}</div>;
};

export const Component = ({ title, onMount, onUnmount }) => {
  return <Item title={title} onMount={onMount} onUnmount={onUnmount} />;
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
    const { title, onMount, onUnmount } = this.props;

    return <ClassItem title={title} onMount={onMount} onUnmount={onUnmount} />;
  }
}
