# msgee
An extended events manager

## Installation - NPM
```sh
npm i msgee
```

## Installation - Browser
```html
<script src="https://unpkg.com/msgee@2.0.1/dist/bundle.browser.iife.js"></script>
```

## Usage
**Msgee instance:**
```js
import msgee from 'msgee';
```
browser version:
```js
window.msgee.instance;
```
**Constructors:**
```js
import { Msgee, Channel } from 'msgee';
```
browser version:
```js
const { Msgee, Channel } = window.msgee;
```
***
**Actual usage:**
Msgee instance is created by calling an Msgee constructor with a required first argument,- channel constructor. Second argument is a storage key. It is optional and defaults to ```msgee-storage```.
```js
import { Msgee, Channel } from 'msgee';

const withDefaultName = new Msgee(Channel);
//or:
const withCustomName = new Msgee(Channel, 'storage-key-name');
```
If for some reason you're unhappy with a default storage key name, you can change it without a need to create a new instance with a constructor, just call a method:
```js
import msgee from 'msgee';

msgee.setStorageKey('storage-key-name');
```

