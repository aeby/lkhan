# lkhan

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

Create cache manifest file for localkhan:

   grunt manifest

## Testing

Running `grunt test` will run the unit tests with karma.
