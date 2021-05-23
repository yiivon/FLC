# FLC (with visualizer)
 Fuzzy Logic Control

## Install & Usage
### Nodejs

`yarn add flc`
or `npm install flc`


### Browser, need abover v86.0



## Examples
### Nodejs
```
const FLC = require('FLC');

let flc = new FLC({
	inputs: [],
	
	});


// or
flc.configurate({});

```

### Browser

// ES6
```
const {FLC} = import('flc.js');
let flc = new FLC({method: ''});

flc.inputVariants();

flc.outputVariants();

```


