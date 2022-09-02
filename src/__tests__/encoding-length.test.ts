import { test } from "uvu";
import * as assert from "uvu/assert";
import { encode } from "../encode.js";
import { encodingLength } from "../encoding-length.js";

test("encodingLength", () => {
  for (let i = 0; i <= 53; i++) {
    const n = Math.pow(2, i) - 1;
    const encoded = encode(n);
    assert.equal(encoded.length, encodingLength(n));
  }
});

test.run();
