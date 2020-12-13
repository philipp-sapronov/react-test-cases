import React from 'react';

import { Component, ClassComponent } from './index';
import { render } from '@testing-library/react';

let onMount;
let onUnmount;
let getTitle;

beforeEach(() => {
  onMount = jest.fn();
  onUnmount = jest.fn();
  getTitle = jest.fn().mockReturnValueOnce('hallo world').mockReturnValueOnce('hallo react');
});

/**
 * @test
 * useEffect hook with an empty array of dependencies has the same behaviour
 * as Lifecycle method componentDidMount as componentWillUnmount
 */

describe('should call onMount callback only one time during component lifetime', () => {
  it('uses useEffect hook', () => {
    const { rerender } = render(
      <Component title={getTitle()} onMount={onMount} onUnmount={onUnmount} />,
    );
    rerender(<Component title={getTitle()} onMount={onMount} onUnmount={onUnmount} />);
    expect(onMount).toBeCalledTimes(1);
  });

  it('uses componentDidMount method', () => {
    const { rerender } = render(
      <ClassComponent title={getTitle()} onMount={onMount} onUnmount={onUnmount} />,
    );
    rerender(<ClassComponent title={getTitle()} onMount={onMount} onUnmount={onUnmount} />);
    expect(onMount).toBeCalledTimes(1);
  });
});

describe('should call onUnmount callback only one time during component lifetime', () => {
  it('uses useEffect hook', () => {
    const { rerender, unmount } = render(
      <Component title={getTitle()} onMount={onMount} onUnmount={onUnmount} />,
    );
    rerender(<Component title={getTitle()} onMount={onMount} onUnmount={onUnmount} />);
    unmount();
    expect(onUnmount).toBeCalledTimes(1);
  });

  it('uses componentWillUnmount method', () => {
    const { rerender, unmount } = render(
      <ClassComponent title={getTitle()} onMount={onMount} onUnmount={onUnmount} />,
    );
    rerender(<ClassComponent title={getTitle()} onMount={onMount} onUnmount={onUnmount} />);
    unmount();
    expect(onUnmount).toBeCalledTimes(1);
  });
});
