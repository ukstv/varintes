import { encode } from "../encode.js";
import { randInt } from "./test-util.js";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("encode works as expected", () => {
  const encoded = encode(300);
  assert.equal(encoded, new Uint8Array([0xac, 0x02]));
});

test("encode single bytes", () => {
  const expected = randInt(parseInt("1111111", 2));
  const encoded = encode(expected);
  assert.equal(encoded, new Uint8Array([expected]));
  assert.equal(encoded.length, 1);
});

test("encode multiple byte with zero first byte", () => {
  const expected = 0x0f00;
  const encoded = encode(expected);
  assert.equal(encoded, new Uint8Array([0x80, 0x1e]));
  assert.equal(encoded.length, 2);
});

test.run();
