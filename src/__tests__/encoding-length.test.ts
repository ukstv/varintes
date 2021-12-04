import { encode } from "../encode.js";
import { encodingLength } from "../encoding-length.js";

test("encodingLength", () => {
  for (let i = 0; i <= 53; i++) {
    const n = Math.pow(2, i) - 1;
    const encoded = encode(n);
    expect(encoded.length).toEqual(encodingLength(n));
  }
});
