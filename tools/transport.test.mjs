import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const output = await build({
  entryPoints: ['src/app/shared/infrastructure/transport-policy.ts'],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
});
const { resolveTransport } = await import(
  'data:text/javascript;base64,' + Buffer.from(output.outputFiles[0].text).toString('base64')
);
test('configured production always uses server unless demo is explicitly selected', () => {
  const url = 'https://api.example.test/api/v1/';
  assert.deepEqual(resolveTransport('', 'ai-todu.github.io', url, null), {
    mode: 'server',
    baseUrl: url,
  });
  assert.equal(resolveTransport('?api=http', 'ai-todu.github.io', url, null).mode, 'server');
  assert.equal(resolveTransport('?api=demo', 'ai-todu.github.io', url, null).mode, 'browser-demo');
  assert.equal(resolveTransport('?api=server', 'ai-todu.github.io', url, 'demo').mode, 'server');
});
test('local HTTP demo selection survives route navigation and reload', () => {
  assert.equal(
    resolveTransport('?api=http', '127.0.0.1', 'http://localhost:8080/api/v1/', null).mode,
    'http-demo',
  );
  assert.equal(
    resolveTransport('', '127.0.0.1', 'http://localhost:8080/api/v1/', 'http').mode,
    'http-demo',
  );
});
