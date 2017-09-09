
<div align="center">
  <img width="160" height="160"
    src="https://cdn.worldvectorlogo.com/logos/python-5.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="20"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Python Webpack Loader</h1>
</div>

Loads Python files and transpile to Javascript using the awesome <a href="http://www.transcrypt.org/">Transcrypt</a> compiler.


<h2>Install</h2>

```bash
pip install transcrypt
npm install --save-dev py-loader
```

<h2>Usage</h2>

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
        loader: 'py-loader'
      }
    ]
  }
}
```

