bs-binding of [cmdliner](https://github.com/dbuenzli/cmdliner)

## Caution

Proverbly you should filter manualy path to bin of `node` from command-line arguments and path it explicitly.

Because executing JavaScript program via Node.JS like `$ node ./foo.js ...some-args`  
or append `#!/usr/bin/env node` in your entry point.

And execute directly like `$ ./foo.js ...some-args` both are evaluate as `node path/to/foo.js ...some-args`.

Thus, parser of CmdLiner interapt args like `["path/to/js", "some", "args"]`,

It means CmdLiner treats `path/to/js` as argument too which actually not argument.

