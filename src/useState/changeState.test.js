import React from 'react';
import {
  ChangeStateWithCallback,
  ChangeState,
  ChangeStateWithZeroTimeout,
  ChangeStateWithSetTimeout,
  ChangeStateWithClosureAndZeroTimeout,
} from './index';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let onRender;

beforeEach(() => {
  onRender = jest.fn();
});

/**
 * @test
 */

it('uses useState hook 1', () => {
  const cnt = 100 * 100 * 100;
  render(<ChangeState count={cnt} onRender={onRender} />);

  const initial = screen.getByText('0');

  expect(initial).toBeInTheDocument();
  expect(onRender).toBeCalledTimes(1);

  // Run setState cnt times
  userEvent.click(initial);

  expect(onRender).toBeCalledTimes(2);
  expect(screen.getByText('1')).toBeCalledTimes(1);
});

it('uses useState method 2', () => {
  const cnt = 100 * 100 * 100;
  render(<ChangeStateWithCallback count={cnt} onRender={onRender} />);

  const initial = screen.getByText('0');

  expect(initial).toBeInTheDocument();
  expect(onRender).toBeCalledTimes(1);

  // Run setState cnt times
  userEvent.click(initial);

  expect(onRender).toBeCalledTimes(2);
  expect(screen.getByText(cnt.toString())).toBeInTheDocument();
});

it('uses useState method 3', async () => {
  const cnt = 10 * 100;
  render(<ChangeStateWithSetTimeout count={cnt} onRender={onRender} />);

  const initial = screen.getByText('0');

  expect(initial).toBeInTheDocument();
  expect(onRender).toBeCalledTimes(1);

  // Run setState cnt times
  userEvent.click(initial);

  await waitFor(() => screen.getByText(cnt.toString()));
  expect(onRender).toBeCalledTimes(cnt + 1);
});

it('uses useState method 4', async () => {
  const cnt = 10 * 100;
  render(<ChangeStateWithZeroTimeout count={cnt} onRender={onRender} />);

  const initial = screen.getByText('0');

  expect(initial).toBeInTheDocument();
  expect(onRender).toBeCalledTimes(1);

  // Run setState cnt times
  userEvent.click(initial);

  await waitFor(() => screen.getByText(cnt.toString()));
  expect(onRender).toBeCalledTimes(cnt + 1);
});


it('uses useState method 5', async () => {
  const cnt = 10 * 100;
  render(<ChangeStateWithClosureAndZeroTimeout count={cnt} onRender={onRender} />);

  const initial = screen.getByText('0');

  expect(initial).toBeInTheDocument();
  expect(onRender).toBeCalledTimes(1);

  // Run setState cnt times
  userEvent.click(initial);

  await waitFor(() => screen.getByText('1'));
  expect(onRender).toBeCalledTimes(3);
});
