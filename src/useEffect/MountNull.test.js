import React from 'react';

import { MountNull } from './';
import { render } from '@testing-library/react';

it('should be mounted', () => {
  const onMount = jest.fn();

  render(<MountNull onMount={onMount} />);

  expect(onMount).toBeCalledTimes(1);
});
