#!/usr/bin/env node
'use strict';

var _index = require('./index.js');

var lib = _interopRequireWildcard(_index);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ethereumGoIpc = require('ethereum-go-ipc');

var eth = _interopRequireWildcard(_ethereumGoIpc);

var _defined = require('defined');

var _defined2 = _interopRequireDefault(_defined);

var _getIpcPath = require('./getIpcPath.js');

var _getIpcPath2 = _interopRequireDefault(_getIpcPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (process.argv.slice(2).includes('--help')) {
    console.log('Usage: [number of blocks for confirmation] [number of mining thread] [Eth IPC Path]');
    console.log('If you leave Eth IPC Path blank, it will use the default IPC address for your system');
    process.exit(1);
}

var txConfirmation = typeof process.argv[2] !== 'undefined' ? parseInt(process.argv[3]) : undefined;
var mineCores = typeof process.argv[3] !== 'undefined' ? parseInt(process.argv[4]) : undefined;
var ipcAddress = (0, _defined2.default)(process.argv[4], (0, _getIpcPath2.default)());

eth.setGethSocket(ipcAddress);
var web3 = eth.web3Provider();
new lib.mine_when_need(eth, web3, txConfirmation, mineCores);

console.log(_chalk2.default.green('Start succeeded. Press Control+C to stop'));