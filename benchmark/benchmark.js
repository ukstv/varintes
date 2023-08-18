#!/usr/bin/env node

import benchmark from "benchmark";
import varint from "varint";
import { encode } from "../dist/encode.js";
import { decode } from "../dist/decode.js";

let suite = new benchmark.Suite();

function formatNumber(number) {
  return String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const SIZE = 10;

function numbersN(n, size) {
  const MAX = Math.pow(2, 7 * n);
  return Array.from({ length: size }).map(() => Math.floor(Math.random() * MAX));
}

function addN(n, size) {
  const numbers = numbersN(n, size);
  const out = new Uint8Array(n);
  suite.add(`${n}: varint`, () => {
    numbers.forEach((num) => {
      varint.encode(num, out);
      varint.decode(out);
    });
  });
  suite.add(`${n}: varintes`, () => {
    numbers.forEach((num) => {
      encode(num, out);
      decode(out);
    });
  });
}

addN(1, SIZE);
addN(2, SIZE);
addN(3, SIZE);
addN(4, SIZE);
addN(5, SIZE);
addN(6, SIZE);
addN(7, SIZE);

suite
  .on("cycle", (event) => {
    let name = event.target.name.padEnd(20);
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(9);
    const ops = `${hz} ops/sec`.padStart(20);
    process.stdout.write(`${name}${ops}\n`);
  })
  .on("error", (event) => {
    process.stderr.write(event.target.error.toString() + "\n");
    process.exit(1);
  })
  .run();
