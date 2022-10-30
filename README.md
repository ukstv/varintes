# Varintes

Encode and decode numbers per [unsigned-varint](https://github.com/multiformats/unsigned-varint) specification,
exposed as [pure ES Module](https://nodejs.org/api/esm.html).

It is **fast**: 1.5x - 10x times faster than original `varint` module.

## History

We started this package as an ES Module version of [`varint`](https://www.npmjs.com/package/varint) package.
Then we added few helpers used by existing varint package consumers.

## Installation

```shell
npm install varintes
```

## Usage

To encode a number as varint use `encode` function:

```typescript
import * as varintes from "varintes";
const bytes = varintes.encode(4242); // Uint8Array(2) [ 146, 33 ]
```

To decode varint from bytes, use `decode` function. It returns decoded number, and amount of bytes read to decode.
The bytes read number may be used to continue decoding of a long bytes sequence.

```typescript
import * as varintes from "varintes";
const [number, bytesRead] = varintes.decode(new Uint8Array([146, 33])); // number = 4242, bytesRead = 2
```

`encodingLength` gives you length in bytes of a number when encoded as varint:

```typescript
import * as varintes from "varintes";
const length = varintes.encodingLength(4242); // 2
```

Let's call tight packing of varints an encoding where varints' bytes follow each other.
There are two functions for tight packing and unpacking provided - `encodePach` and `decodePack`:

```typescript
import * as varintes from "varintes";
const packed = varintes.encodePack([1, 17, 4242]); // Uint8Array(4) [ 1, 17, 146, 33 ]
const unpacked = varintes.decodePack(packed); // [1, 17, 4242]
```

# To Do

- [x] Faster decode by loop unrolling

## License

MIT or APACHE-2.0
