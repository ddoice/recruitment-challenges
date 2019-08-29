/**
 * Quick script to benchmark the throughput
 */

const { IntegerBinaryBitInfo } = require('./IntegerBinaryBitInfo');

const iterations = process.env.ITERATIONS || 1000000;

// Contains a random generated array of iterations length
const randomArray = [
  0,
  Number.MAX_SAFE_INTEGER,
  ...Array.from(Array(iterations - 2), _ =>
    Math.floor((Math.random() * Number.MAX_SAFE_INTEGER))),
];

const integerBinaryBitInfo = new IntegerBinaryBitInfo(randomArray)

/**
 * Formats a given number adding thousand separator and removing decimals
 * (es-ES locale is not available without node-icu, so comma is the shown separator)
 * @param {integer|float} num number to be formatted
 */
const getNumberPretty = (num) => (num)
  .toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

/**
 * Launches the benchmarks
 * @param {boolean} faster Indicates if must use the faster implementation
 */
const launch = (faster = false) => {
  console.time(`[faster:${faster}] - ${getNumberPretty(iterations)} operations`);
  const initial = Date.now();
  let temp = integerBinaryBitInfo.getBinaryBitInfo(faster);
  const msUsed = Date.now() - initial;
  console.timeEnd(`[faster:${faster}] - ${getNumberPretty(iterations)} operations`);
  const opsPerSecond = ((1000 / msUsed) * iterations);
  console.log(`[faster:${faster}] - ${getNumberPretty(opsPerSecond)} ops. per second`)
  return opsPerSecond;
};

// Main
(() => {
  const slow = launch();
  const fast = launch(true);
  const increase = ((fast - slow) / slow) * 100;
  console.log(`Faster version increases the throughput in ${increase.toFixed(2)}%.`);
  console.log(`Reference benchmark: Node 10.16.3 - Ubuntu 18.04.2 (4.15.0-54-generic) - i7 7700K (cpu_meltdown spectre_v1 spectre_v2 spec_store_bypass l1tf mds) ±245,000 ops. per second 🚀`);
})();
