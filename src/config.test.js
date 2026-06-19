import { test } from 'node:test';
import assert from 'node:assert';
import { calcFinalPrice } from './config.js';

test('final price = base + usb-c add-on', () => {
  assert.equal(calcFinalPrice('wired', false), 899);
  assert.equal(calcFinalPrice('wired', true), 1019);
  assert.equal(calcFinalPrice('wireless', false), 1199);
  assert.equal(calcFinalPrice('wireless', true), 1319);
});
