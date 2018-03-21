#!/usr/bin/env node
'use strict';

// Require modules
const findDividers = require('find-dividers');
const columnify = require('columnify');
const program = require('commander');
const pkg = require('./package.json');

program
    .name('find-dividers')
    .version(pkg.version)
    .description(pkg.description)
    .usage('[options] <numbers...>')
    .option('-e, --exclude-one', 'Whether to exclude the number 1 from the results.')
    .parse(process.argv);

if (program.args.length === 0) {
    program.help();
} else {
    // filter args to retrieve all given numbers
    const numbers = program.args
        .map(a => parseInt(a))
        .filter(a => Number.isInteger(a));

    // exclude number one?
    const excludeOne = program.excludeOne || false;
    
    // calculate dividers
    const data = {};
    numbers.forEach(number => {
        const divs = findDividers(number, excludeOne);
        data[`${number}`] = divs.join(', ');
    });

    // output
    console.log(columnify(data, {
        columns: [ 'NUMBER', 'DIVIDERS' ],
        minWidth: 12,
        columnSplitter: ' | '
    }));
}
