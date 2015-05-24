# lkhan

[![Join the chat at https://gitter.im/aeby/lkhan](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aeby/lkhan?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Simple offline Khan exercise viewer.

## Build & development

Initialize submodules:
    
    git submodule update --init --recursive

Build persues:

    cd app/static/scripts/perseus
    make build

Concat and optimize perseus dependencies (from project root)

    grunt requirejs

Run `grunt` for building and `grunt serve` for preview.

Create cache manifest file for [localkhan](https://github.com/aeby/localkhan):

    grunt manifest

## Testing

Running `grunt test` will run the unit tests with karma.
