import React from 'react';

import { FunctionalComponent, ClassComponent } from './';
import { render, screen } from '@testing-library/react';

let onMount;
let onUnmount;
let key;

beforeEach(() => {
  onMount = jest.fn();
  onUnmount = jest.fn();
  key = 'some-key';
});

/**
 *
 *
 *
 *
 *
 * @test
 */

describe('Functional component', () => {
  it('onMount callback works as expected', () => {
    render(<FunctionalComponent _key={key} onMount={onMount} onUnmount={onUnmount} />);

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
  });

  it('onUnmount callback works as expected', () => {
    const { unmount } = render(
      <FunctionalComponent _key={key} onMount={onMount} onUnmount={onUnmount} />,
    );

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
    // unmount component via testing library api
    unmount();
    // onUnmount callback has been called
    expect(onUnmount).toBeCalledTimes(1);
  });

  it('The component is remounted when the key changes', () => {
    const { rerender } = render(
      <FunctionalComponent _key={key} onMount={onMount} onUnmount={onUnmount} />,
    );

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
    // onUnmount callback hasn't been called
    expect(onUnmount).toBeCalledTimes(0);

    // rerender component via testing library api
    rerender(<FunctionalComponent _key={'some-new-key'} onMount={onMount} onUnmount={onUnmount} />);

    // Component has been updated
    expect(onMount).toBeCalledTimes(2);
    expect(onUnmount).toBeCalledTimes(1);
  });

  it('The component is not remounted when the key remains the same', () => {
    const { rerender } = render(
      <FunctionalComponent _key={key} onMount={onMount} onUnmount={onUnmount} />,
    );

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
    // onUnmount callback hasn't been called
    expect(onUnmount).toBeCalledTimes(0);

    // rerender component with the same key via testing library api
    rerender(<FunctionalComponent _key={key} onMount={onMount} onUnmount={onUnmount} />);

    // Component hasn't been remounted
    expect(onMount).toBeCalledTimes(1);
    expect(onUnmount).toBeCalledTimes(0);
  });
});

describe('Class component', () => {
  it('onMount callback works as expected', () => {
    render(<ClassComponent _key={key} onMount={onMount} onUnmount={onUnmount} />);

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
  });

  it('onUnmount callback works as expected', () => {
    const { unmount } = render(
      <ClassComponent _key={key} onMount={onMount} onUnmount={onUnmount} />,
    );

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
    // unmount component via testing library api
    unmount();
    // onUnmount callback has been called
    expect(onUnmount).toBeCalledTimes(1);
  });

  it('The component is remounted when the key changes', () => {
    const { rerender } = render(
      <FunctionalComponent _key={key} onMount={onMount} onUnmount={onUnmount} />,
    );

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
    // onUnmount callback hasn't been called
    expect(onUnmount).toBeCalledTimes(0);

    // rerender component via testing library api
    rerender(<FunctionalComponent _key={'some-new-key'} onMount={onMount} onUnmount={onUnmount} />);

    // Component has been updated
    expect(onMount).toBeCalledTimes(2);
    expect(onUnmount).toBeCalledTimes(1);
  });

  it('The component is not remounted when the key remains the same', () => {
    const { rerender } = render(
      <ClassComponent _key={key} onMount={onMount} onUnmount={onUnmount} />,
    );

    // Component has been mounted
    expect(screen.getByText(/hallo world/i)).toBeInTheDocument();
    expect(onMount).toBeCalledTimes(1);
    // onUnmount callback hasn't been called
    expect(onUnmount).toBeCalledTimes(0);

    // rerender component with the same key via testing library api
    rerender(<ClassComponent _key={key} onMount={onMount} onUnmount={onUnmount} />);

    // Component hasn't been remounted
    expect(onMount).toBeCalledTimes(1);
    expect(onUnmount).toBeCalledTimes(0);
  });
});
