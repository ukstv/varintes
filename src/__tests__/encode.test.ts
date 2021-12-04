import { encode } from "../encode.js";
import { randInt } from "./test-util.js";

test("encode works as expected", () => {
  const encoded = encode(300);
  expect(encoded).toEqual(new Uint8Array([0xac, 0x02]));
});

test("encode single bytes", () => {
  const expected = randInt(parseInt("1111111", 2));
  const encoded = encode(expected);
  expect(encoded).toEqual(new Uint8Array([expected]));
  expect(encoded.length).toEqual(1);
});

test("encode multiple byte with zero first byte", () => {
  const expected = 0x0f00;
  const encoded = encode(expected);
  expect(encoded).toEqual(new Uint8Array([0x80, 0x1e]));
  expect(encoded.length).toEqual(2);
});
