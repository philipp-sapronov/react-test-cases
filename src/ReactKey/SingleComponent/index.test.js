import React from 'react';

import { FunctionalComponent, ClassComponent } from './';
import { render } from '@testing-library/react';

let onMount;
let onUnmount;
let title;
let nextTitle;
let key;
let nextKey;

beforeEach(() => {
  onMount = jest.fn();
  onUnmount = jest.fn();
  key = 'key';
  nextKey = 'next-key';
  title = 'Hello world';
  nextTitle = 'Hello React';
});

/**
 *
 *
 *
 *
 *
 * @test
 */

describe('The component is remounted when the key changes', () => {
  it('uses useEffect hook', () => {
    const { rerender } = render(
      <FunctionalComponent _key={key} title={title} onMount={onMount} onUnmount={onUnmount} />,
    );

    rerender(
      <FunctionalComponent _key={nextKey} title={title} onMount={onMount} onUnmount={onUnmount} />,
    );
    expect(onMount).toBeCalledTimes(2);
    expect(onUnmount).toBeCalledTimes(1);
  });

  it('uses lifecycle methods', () => {
    const { rerender } = render(
      <ClassComponent _key={key} title={title} onMount={onMount} onUnmount={onUnmount} />,
    );

    rerender(
      <ClassComponent _key={nextKey} title={title} onMount={onMount} onUnmount={onUnmount} />,
    );

    expect(onMount).toBeCalledTimes(2);
    expect(onUnmount).toBeCalledTimes(1);
  });
});

/**
 * @test
 * Key remains the same but the title prop changes
 */
describe('Component is not remounted when the key remains the same', () => {
  it('uses useEffect hook', () => {
    const { rerender } = render(
      <FunctionalComponent _key={key} title={title} onMount={onMount} onUnmount={onUnmount} />,
    );

    rerender(
      <FunctionalComponent _key={key} title={nextTitle} onMount={onMount} onUnmount={onUnmount} />,
    );

    expect(onMount).toBeCalledTimes(1);
    expect(onUnmount).toBeCalledTimes(0);
  });

  it('uses lifecycle methods', () => {
    const { rerender } = render(
      <ClassComponent _key={key} title={title} onMount={onMount} onUnmount={onUnmount} />,
    );

    rerender(
      <ClassComponent _key={key} title={nextTitle} onMount={onMount} onUnmount={onUnmount} />,
    );

    expect(onMount).toBeCalledTimes(1);
    expect(onUnmount).toBeCalledTimes(0);
  });
});
