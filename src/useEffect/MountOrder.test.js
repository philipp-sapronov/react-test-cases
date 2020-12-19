import React from 'react';

import { MountOrder } from './';
import { render, screen } from '@testing-library/react';

it('should start call useEffect from the deepest component', () => {
  const onMount = jest.fn();

  render(
    <MountOrder onMount={onMount} index={1}>
      <MountOrder onMount={onMount} index={2}>
        <MountOrder onMount={onMount} index={3}>
          mounted
        </MountOrder>
      </MountOrder>
    </MountOrder>,
  );

  expect(screen.getByText('mounted')).toBeInTheDocument();

  expect(onMount).toHaveBeenCalledTimes(3);
  expect(onMount).toHaveBeenNthCalledWith(1, 3);
  expect(onMount).toHaveBeenNthCalledWith(2, 2);
  expect(onMount).toHaveBeenNthCalledWith(3, 1);
});
