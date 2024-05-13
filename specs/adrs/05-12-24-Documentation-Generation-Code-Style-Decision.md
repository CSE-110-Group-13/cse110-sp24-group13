# Use JSDoc Generator for documentation and use specific rules for code styling

## Context and Problem Statement

How to write readable documentation?
How to write readable code?
How to maintain a consistent code style?

## Considered Options

* ESLint
* Set group standards
* JSDoc Generator

## Decision Outcome

We decided to go with JSDoc Generator extension.

https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator

It can automatically generate function documentation from VSCode.

For code styling we looked into using ESlint, but it's more complicated than the purposes we need which are just basic code styling which can be done with proper VSCode settings. The rules we outline can be found in our file [pipeline.md](../admin/cipipeline/phase1.md).
