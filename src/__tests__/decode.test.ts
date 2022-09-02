import { decode } from "../decode.js";
import { randInt } from "./test-util.js";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("two bytes", () => {
  const buffer = new Uint8Array([172, 2]);
  const [decoded, length] = decode(buffer);
  assert.equal(decoded, 300);
  assert.equal(length, 2);
});

test("test decode single bytes", () => {
  const original = randInt(parseInt("1111111", 2));
  const buffer = new Uint8Array([original]);
  const [decoded, length] = decode(buffer);
  assert.equal(decoded, original);
  assert.equal(length, 1);
});

test("decode multiple bytes with zero", () => {
  const original = randInt(parseInt("1111111", 2));
  const buffer = new Uint8Array([128, original]);
  const [decoded, length] = decode(buffer);
  assert.equal(decoded, original << 7);
  assert.equal(length, 2);
});

test("decode multiple bytes with a remainder", () => {
  const original = randInt(parseInt("1111111", 2));
  const buffer = new Uint8Array([128, original, 10, 20]);
  const [decoded, length] = decode(buffer);
  assert.equal(decoded, original << 7);
  assert.equal(length, 2);
});

test.run();
