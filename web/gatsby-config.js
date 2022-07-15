/**
 * https://www.extensive.one/converting-gatsby-config-and-node-api-to-typescript/
 * https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9
 * Source-map-support mimics node's stack trace making debugging easier
 * ts-node register helps importing and compiling TypeScript modules into JS
 */
require('source-map-support').install();
require('ts-node').register();

module.exports = require('./gatsby-config.ts');
