import React from 'react';

import { App } from './';
import { render, screen } from '@testing-library/react';

let onMount;
let onUnmount;

beforeEach(() => {
  onMount = jest.fn();
  onUnmount = jest.fn();
});

describe('How component mounts after redirect', () => {
  it('should be mounted', () => {
    render(<App onMount={onMount} onUnmount={onUnmount} shouldRedirect={false} />);

    expect(screen.getByText('page')).toBeInTheDocument();

    expect(onMount).toBeCalledTimes(1);
    expect(onUnmount).toBeCalledTimes(0);
  });

  it('should be mounted and then should be unmounted', () => {
    render(<App onMount={onMount} onUnmount={onUnmount} shouldRedirect={true} />);

    expect(screen.queryByText('page')).not.toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();

    expect(onMount).toBeCalledTimes(1);
    expect(onUnmount).toBeCalledTimes(1);
  });
});
