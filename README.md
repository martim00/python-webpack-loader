
<div align="center">
  <img width="160" height="160"
    src="https://cdn.worldvectorlogo.com/logos/python-5.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="20"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Python Webpack Loader</h1>
</div>

Loads Python files and transpile to JavaScript using the awesome [Transcrypt](http://www.transcrypt.org/), [Jiphy](https://github.com/timothycrosley/jiphy) or [Javascripthon](https://github.com/metapensiero/metapensiero.pj) compilers.


## Install

```bash
pip install transcrypt  # or jiphy, or javascripthon
npm install --save-dev py-loader
```

You may specify `jiphy` instead of `transcrypt` if you prefer. In this case, ensure that `options.compiler` in `webpack.config.js` is set to `jiphy` (see below). The compiler option for Javascripthon is `pj`.

## Usage

```js
import Something from 'main.py';
```

### Configuration

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.py$/,
        loader: 'py-loader',
        options: {
          compiler: 'transcrypt'
        }
      }
    ]
  }
}
```

## Extend

`py-loader` can be extended to use other Python compilers. Just fork this repo and extend the `compilers` object in `index.js`.

Please submit a pull request with your addition.


## Contributors

- Ryan Liao (https://github.com/pirsquare)
- Sebastian Silva (https://github.com/icarito)

