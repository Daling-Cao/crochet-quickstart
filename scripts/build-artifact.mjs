// 从 index.html 生成发布到 Claude Artifact 的版本：
// Artifact 发布时会自己包上 <!doctype html><html><head>…<body>，
// 所以这里去掉外层标签和 charset/viewport，只留 <title>、<style> 和正文。
// 用法：node scripts/build-artifact.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'index.html'), 'utf8');

const head = src.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charset[^>]*>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '');
const body = src.match(/<body>([\s\S]*?)<\/body>/)[1];

const out = head.trim() + '\n' + body.trim() + '\n';
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', 'artifact.html'), out);
console.log(`dist/artifact.html  ${(out.length / 1024).toFixed(0)} KB`);
