import { decode } from "../decode.js";
import { randInt } from "./test-util";
import * as console from "console";

test("two bytes", () => {
  const buffer = new Uint8Array([172, 2]);
  const [decoded, length] = decode(buffer);
  expect(decoded).toEqual(300);
  expect(length).toEqual(2);
});

test("test decode single bytes", () => {
  const original = randInt(parseInt("1111111", 2));
  const buffer = new Uint8Array([original]);
  const [decoded, length] = decode(buffer);
  expect(decoded).toEqual(original);
  expect(length).toEqual(1);
});

test("decode multiple bytes with zero", () => {
  const original = randInt(parseInt("1111111", 2));
  const buffer = new Uint8Array([128, original]);
  const [decoded, length] = decode(buffer);
  expect(decoded).toEqual(original << 7);
  expect(length).toEqual(2);
});

test("decode multiple bytes with a remainder", () => {
  const original = randInt(parseInt("1111111", 2));
  const buffer = new Uint8Array([128, original, 10, 20]);
  const [decoded, length] = decode(buffer);
  expect(decoded).toEqual(original << 7);
  expect(length).toEqual(2);
});
