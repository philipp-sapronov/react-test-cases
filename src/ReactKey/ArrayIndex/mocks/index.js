// import faker from "faker";

class Item {
  constructor(name, age, id) {
    this.name = name;
    this.age = age;
    this.id = id;
  }
}

export const getList = () => [
  new Item("Barbara", 20, "ax"),
  new Item("John", 30, "bx"),
  new Item("Jenifer", 25, "cx"),
  new Item("Paul", 29, "dx"),
  new Item("Stephan", 16, "ex"),
  new Item("Monika", 34, "fx"),
];

export const getTestItem = () => new Item("Bob", 30, "gx");

export const unshiftItem = (item, items) => [item, ...items];
export const pushItem = (item, items) => [...items, item];
export const popItem = (items) => items.slice(0, -1);
export const shiftItem = (items) => items.slice(1);
