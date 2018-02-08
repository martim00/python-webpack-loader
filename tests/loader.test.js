const path = require('path')
const { sep: slash } = require('path');
const loader = require('../index')
const fixturesDir = path.join(__dirname, 'fixtures');
const badSource = path.join(fixturesDir, 'bad.py');
const goodSource = path.join(fixturesDir, 'good.py');
const pythonWithJsSource = path.join(fixturesDir, 'python_with_js.py');
const pythonWithAnotherExtension = path.join(fixturesDir, 'python.vue');
const pythonWithJsWithoutJsSource = path.join(fixturesDir, 'python_with_js_without_js.py')

// Mock of webpack's loader context.
let mock = (source, query, opts, callback, watchMode, cwd) => {

    let emittedError
    let emittedWarning
    let addedDependencies = []
    let addedDirDependencies = []

    let result = {
        loaders: [],
        loaderIndex: 0,

        query: query,
    
        resource: source,
        resourcePath: source,
    
        async: function () { return callback; },
    
        emitError: function (err) { emittedError = err; },
        emittedError: function () { return emittedError; },
        emitWarning: function (warn) { emittedWarning = warn; },
        emittedWarning: function () { return emittedWarning; },
    
        addDependency: function (dep) { addedDependencies.push(dep); },
        addContextDependency: function(dir) { addedDirDependencies.push(dir); },
        addedDependencies: function () { return addedDependencies; },
        addedDirDependencies: function() { return addedDirDependencies; },
    
        cacheable: function () {},

        options: {}
    }

    // if (query) {
    //     result.query = '?' + (isArray(query) ? query.join('&') : query);
    // }

    return result

}

let getAsTmpPath = (entry) => {
    const fileInfo = path.parse(entry);
    return `${fileInfo.dir}${slash}__${fileInfo.base}`
}

jest.mock('node-cmd');
const mockedNodeCmd = require('node-cmd');

mockedNodeCmd.get.mockImplementation((args, callback) => {
    callback()
})

// const fs = require('fs');

jest.mock('fs');
const mockedFs = require('fs');


test('should get the compiler in options', () => {

    const mockCallback = jest.fn();
    context = mock(goodSource, '?compiler=jiphy', null, mockCallback)

    loader.call(context, goodSource)

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockedNodeCmd.get.mock.calls.length).toBe(1);
    expect(mockedNodeCmd.get.mock.calls[0][0]).toBe('jiphy  ' + getAsTmpPath(goodSource));
})

let readFile = (filePath) => {
    jest.unmock('fs');
    let fs = require('fs');
    let source = fs.readFileSync(filePath, 'utf8');
    // jest.mock('fs');
    return source.toString();
}

test('should pre-process js stuff before sending to compilers', () => {
    mockedNodeCmd.get.mockClear()

    const mockCallback = jest.fn();
    context = mock(pythonWithJsSource, '?compiler=jiphy', null, mockCallback)

    let source = readFile(pythonWithJsSource)

    const compilerGeneratedJs = 'compiler generated javascript source'

    mockedFs.readFileSync.mockImplementation(() => {
        return compilerGeneratedJs
    })

    loader.call(context, source)

    let expectedOutput = "\nvar axios = require('axios')\nimport Vue from 'vue'\n\n" + compilerGeneratedJs

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.calls[0][1]).toBe(expectedOutput)
    expect(mockedFs.writeFileSync.mock.calls.length).toBe(1)

    expect(mockedFs.writeFileSync.mock.calls[0][0].replace('__', '')).toBe(pythonWithJsSource)
    let expectedSource = readFile(pythonWithJsWithoutJsSource)
    expect(mockedFs.writeFileSync.mock.calls[0][1]).toBe(expectedSource)
})

test('should accept any extension', () => {
    const mockCallback = jest.fn()
    context = mock(pythonWithAnotherExtension, '?compiler=jiphy', null, mockCallback)

    loader.call(context, pythonWithAnotherExtension)

    expect(mockCallback.mock.calls.length).toBe(1)
})