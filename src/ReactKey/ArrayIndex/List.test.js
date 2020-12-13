import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ListOfItemsWithIndexKeys, ListOfItemsWithUniqueKeys } from "./";
import {
  getList,
  unshiftItem,
  pushItem,
  shiftItem,
  popItem,
  getTestItem,
} from "./mocks";

let list;
let onItemMount;
let onItemUnmount;
let onItemReceiveNewProps;
let initialLength;
let lastItem;
let newItem;
let firstItem;

beforeEach(() => {
  list = getList();
  onItemMount = jest.fn();
  onItemUnmount = jest.fn();
  onItemReceiveNewProps = jest.fn();
  initialLength = list.length;
  lastItem = list[list.length - 1];
  firstItem = list[0];
  newItem = getTestItem();
});

it("Should be mounted all items in the list", () => {
  render(
    <ListOfItemsWithIndexKeys
      list={list}
      onItemMount={onItemMount}
      onItemReceiveNewProps={onItemReceiveNewProps}
    />
  );

  // components were mount
  expect(onItemMount).toBeCalledTimes(list.length);
  expect(onItemReceiveNewProps).toBeCalledTimes(list.length);
});

it("No item should be unmounted", () => {
  render(
    <ListOfItemsWithIndexKeys list={list} onItemUnmount={onItemUnmount} />
  );

  // components still weren't unmount
  expect(onItemUnmount).toBeCalledTimes(0);
});

/**
 *
 *
 *
 *
 *
 * @test
 */

describe("Add a new item to the end of the list", () => {
  const props = {};

  beforeEach(() => {
    props.list = list;
    props.onItemMount = onItemMount;
    props.onItemUnmount = onItemUnmount;
    props.onItemReceiveNewProps = onItemReceiveNewProps;
    props.onClick = (items) => pushItem(newItem, items);
  });

  it("Component uses array indexes as keys", () => {
    render(<ListOfItemsWithIndexKeys {...props} />);

    // Add Item
    userEvent.click(screen.getByRole("button"));
    // There is +1 new item in the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength + 1);
    // The new component (newItem) has been mounted
    expect(onItemMount).toBeCalledTimes(initialLength + 1);
    expect(onItemMount).toHaveBeenLastCalledWith(newItem.name, newItem.age);
    // Only the new component has been updated
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength + 1);
    // Components haven't been unmounted
    expect(onItemUnmount).toBeCalledTimes(0);
  });

  it("Component uses unique ids as keys", () => {
    render(<ListOfItemsWithUniqueKeys {...props} />);

    // Add Item
    userEvent.click(screen.getByRole("button"));
    // There is +1 new item in the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength + 1);
    // The new component (newItem) has been mounted
    expect(onItemMount).toBeCalledTimes(initialLength + 1);
    expect(onItemMount).toHaveBeenLastCalledWith(newItem.name, newItem.age);
    // Only the new component has been updated
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength + 1);
    // Components haven't been unmounted
    expect(onItemUnmount).toBeCalledTimes(0);
  });
});

/**
 *
 *
 *
 *
 *
 * @test
 */

describe("Add a new item to the top of the list", () => {
  const props = {};

  beforeEach(() => {
    props.list = list;
    props.onItemMount = onItemMount;
    props.onItemUnmount = onItemUnmount;
    props.onItemReceiveNewProps = onItemReceiveNewProps;
    props.onClick = (items) => unshiftItem(newItem, items);
  });

  it("Component uses array indexes as keys", () => {
    render(<ListOfItemsWithIndexKeys {...props} />);

    // Add Item
    userEvent.click(screen.getByRole("button"));
    // There is +1 new item in the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength + 1);
    // The new component has been mounted
    expect(onItemMount).toBeCalledTimes(initialLength + 1);
    // Although the item was added to the top of the list the last item was mounted
    expect(onItemMount).toHaveBeenLastCalledWith(lastItem.name, lastItem.age);
    // The entire component list has been updated plus a new component
    expect(onItemReceiveNewProps).toBeCalledTimes(
      initialLength + initialLength + 1
    );
    // Components haven't been unmounted
    expect(onItemUnmount).toBeCalledTimes(0);
  });

  it("Component uses unique ids as keys", () => {
    render(<ListOfItemsWithUniqueKeys {...props} />);

    // Add Item
    userEvent.click(screen.getByRole("button"));
    // There is +1 new item in the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength + 1);
    // The new component (newItem) has been mounted
    expect(onItemMount).toBeCalledTimes(initialLength + 1);
    // The first element was mounted as expected
    expect(onItemMount).toHaveBeenLastCalledWith(newItem.name, newItem.age);
    // Only new item has been updated
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength + 1);
    // Components haven't been unmounted
    expect(onItemUnmount).toBeCalledTimes(0);
  });
});

/**
 *
 *
 *
 *
 *
 *
 * @test
 */

describe("Remove the last item from the list", () => {
  const props = {};

  beforeEach(() => {
    props.list = list;
    props.onItemMount = onItemMount;
    props.onItemUnmount = onItemUnmount;
    props.onItemReceiveNewProps = onItemReceiveNewProps;
    props.onClick = popItem;
  });

  it("Component uses array indexes as keys", () => {
    render(<ListOfItemsWithIndexKeys {...props} />);

    // Remove Item
    userEvent.click(screen.getByRole("button"));
    // Item has been removed from the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength - 1);
    // No component has been updated
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength);
    // The last item has been unmounted
    expect(onItemUnmount).toBeCalledTimes(1);
    expect(onItemUnmount).toHaveBeenLastCalledWith(lastItem.name, lastItem.age);
  });

  it("Component uses unique ids as keys", () => {
    render(<ListOfItemsWithUniqueKeys {...props} />);

    // Remove Item
    userEvent.click(screen.getByRole("button"));
    // Item has been removed from the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength - 1);
    // No component has been updated
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength);
    // The last item has been unmounted
    expect(onItemUnmount).toBeCalledTimes(1);
    expect(onItemUnmount).toHaveBeenLastCalledWith(lastItem.name, lastItem.age);
  });
});

/**
 *
 *
 *
 *
 *
 * @test
 */

describe("Remove the first item from the list", () => {
  const props = {};

  beforeEach(() => {
    props.list = list;
    props.onItemMount = onItemMount;
    props.onItemUnmount = onItemUnmount;
    props.onItemReceiveNewProps = onItemReceiveNewProps;
    props.onClick = shiftItem;
  });

  it("Component uses array indexes as keys", () => {
    render(<ListOfItemsWithIndexKeys {...props} />);

    // Remove Item
    userEvent.click(screen.getByRole("button"));
    // Item has been removed from the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength - 1);
    // The entire component list has been updated except deleted one
    expect(onItemReceiveNewProps).toBeCalledTimes(
      initialLength + (initialLength - 1)
    );
    // Although the item was removed from the top of the list the last item was unmounted
    expect(onItemUnmount).toBeCalledTimes(1);
    expect(onItemUnmount).toHaveBeenLastCalledWith(lastItem.name, lastItem.age);
  });

  it("Component uses unique ids as keys", () => {
    render(<ListOfItemsWithUniqueKeys {...props} />);

    // Remove Item
    userEvent.click(screen.getByRole("button"));
    // Item has been removed from the list
    expect(screen.getAllByRole("listitem")).toHaveLength(initialLength - 1);
    // No component has been updated as expected
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength);
    // Only first component has been deleted
    expect(onItemUnmount).toBeCalledTimes(1);
    expect(onItemUnmount).toHaveBeenLastCalledWith(
      firstItem.name,
      firstItem.age
    );
    // No component has been updated
    expect(onItemReceiveNewProps).toBeCalledTimes(initialLength);
  });
});


