import React  from "react";

export class Item extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <div>Hallo world!</div>;
  }
}

export class ClassComponent extends React.Component {
  render() {
    const { _key, onMount, onUnmount } = this.props;

    return <Item key={_key} onMount={onMount} onUnmount={onUnmount} />;
  }
}
