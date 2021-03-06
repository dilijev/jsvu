// Copyright 2017 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// <https://apache.org/licenses/LICENSE-2.0>.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const fs = require('fs');

const execa = require('execa');
const tempy = require('tempy');

const config = require('../../shared/config.js');
const jsvuPath = config.path;

const test = async () => {
	const path = tempy.file();
	fs.writeFileSync(path, `print('Hi!');\n`);
	// TODO: Use `===` instead of `endsWith` once this bug is resolved:
	// https://github.com/sindresorhus/execa/issues/116
	console.assert(
		(await execa(`${jsvuPath}/spidermonkey`, [path])).stdout.endsWith('Hi!')
	);
	console.assert(
		(await execa(`${jsvuPath}/sm`, [path])).stdout.endsWith('Hi!')
	);
};

module.exports = test;
