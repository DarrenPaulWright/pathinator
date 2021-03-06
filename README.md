# Pathinator

> SVG path builder and minifier
>
> [![npm][npm]][npm-url]
[![build][build]][build-url]
[![coverage][coverage]][coverage-url]
[![deps][deps]][deps-url]
[![size][size]][size-url]
[![vulnerabilities][vulnerabilities]][vulnerabilities-url]
[![license][license]][license-url]


<br><a name="Installation"></a>

## Installation
```
npm install pathinator
```

<br><a name="optimizeSvgPaths"></a>

## optimizeSvgPaths(input, [settings]) ⇒ <code>Promise.&lt;(string\|Document)&gt;</code>
> Optimize all the paths in an svg file. Currently supports the `d` attribute in the `path` element and the `points` attribute in both `polygon` and `polyline` elements.

**Returns**: <code>Promise.&lt;(string\|Document)&gt;</code> - Resolves with the optimized svg in the same format provided.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code>, <code>Document</code> | Can be the string content of an svg or a DOM Document. |
| [settings] | <code>object</code> | See [Path.export](#Path+export). Settings are applied to each path found in the svg. |

**Example**  
``` javascript
import { optimizeSvgPaths } from 'pathinator';

const svg = document.querySelector('svg');

optimizeSvgPaths(svg, { compress: true })
    .then((result) => {
        // do something
    });
```

<br><a name="Path"></a>

## Path

* [Path](#Path)
    * [new Path([path])](#new_Path_new)
    * [.length](#Path+length) ⇒ <code>integer</code>
    * [.import(path)](#Path+import) ⇒ <code>object</code>
    * [.move(...args)](#Path+move) ⇒ <code>object</code>
    * [.line(...args)](#Path+line) ⇒ <code>object</code>
    * [.cubic(...args)](#Path+cubic) ⇒ <code>object</code>
    * [.quadratic(...args)](#Path+quadratic) ⇒ <code>object</code>
    * [.arc(...args)](#Path+arc) ⇒ <code>object</code>
    * [.close([...args])](#Path+close) ⇒ <code>object</code>
    * [.update(index, values)](#Path+update) ⇒ <code>object</code>
    * [.eachPoint(callback)](#Path+eachPoint) ⇒ <code>object</code>
    * [.transform([settings])](#Path+transform) ⇒ <code>object</code>
    * [.export([settings])](#Path+export) ⇒ <code>Promise.&lt;string&gt;</code>


<br><a name="new_Path_new"></a>

### new Path([path])
> Parse, build, and optimize SVG path data.


| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> | Optional path data to parse. |

**Example**  
``` javascript
import { Path } from 'pathinator';

const path = new Path()
    .move(50, 100)
    .line(100, 100)
    .line(200, 200)
    .close();
```

<br><a name="Path+length"></a>

### path.length ⇒ <code>integer</code>
> The total number of commands in this path.


<br><a name="Path+import"></a>

### path.import(path) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Import a path string. Removes any previous commands and create a new one.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | A valid path data string or polygon string. |


<br><a name="Path+move"></a>

### path.move(...args) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Add a [move](https://www.w3.org/TR/SVG/paths.html#PathDataMovetoCommands) command.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | X and y coordinates or a string of X and y coordinates. If the final argument is `true` then command will be absolute coordinates. |


<br><a name="Path+line"></a>

### path.line(...args) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Add a [line](https://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands) command.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | X and y coordinates or a string of X and y coordinates. If the final argument is `true` then command will be absolute coordinates. |


<br><a name="Path+cubic"></a>

### path.cubic(...args) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Add a [quadratic bezier curve](https://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands) command.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Series of coordinates or a string of coordinates. If the final argument is `true` then command will be absolute coordinates. |


<br><a name="Path+quadratic"></a>

### path.quadratic(...args) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Add a [quadratic bezier curve](https://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands) command.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Series of coordinates or a string of coordinates. If the final argument is `true` then command will be absolute coordinates. |


<br><a name="Path+arc"></a>

### path.arc(...args) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Add an [arc](https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands) command.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Series of coordinates / values or a string of coordinates / values. If the final argument is `true` then command will be absolute coordinates. |


<br><a name="Path+close"></a>

### path.close([...args]) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Add a [close](https://www.w3.org/TR/SVG/paths.html#PathDataClosePathCommand) command.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [...args] | <code>boolean</code> | <code>false</code> | If the argument is `true` then command will be absolute coordinates. |


<br><a name="Path+update"></a>

### path.update(index, values) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Update command values at a specific index.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>integer</code> | Index of the command to update. |
| values | <code>string</code>, <code>Array.&lt;number&gt;</code> | New values for the command at this index. |


<br><a name="Path+eachPoint"></a>

### path.eachPoint(callback) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Calls  callback for each point in the path.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Provides three arguments: the Point, a boolean indicating if the point is a control point, and the command index. |


<br><a name="Path+transform"></a>

### path.transform([settings]) ⇒ <code>object</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Transform all commands in path.

**Returns**: <code>object</code> - Returns this.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>object</code> |  | Optional settings object. |
| [settings.fractionDigits] | <code>integer</code> | <code>3</code> | Round all numbers in path to a specified number of fraction digits. |
| [settings.scale] | <code>number</code>, <code>Point</code>, <code>Array</code>, <code>object</code> |  | Scale the entire path. If a number is provided then x and y are scaled the same. To scale x and y differently provide a Point, an array as [x, y], or an object as { x:_, y:_ }. |
| [settings.translate] | <code>number</code>, <code>Point</code>, <code>Array</code>, <code>object</code> |  | Translate the entire string a specified distance. If a number is provided then x and y are translated the same. To translated x and y differently provide a Point, an array as [x, y], or an object as { x:_, y:_ }. |


<br><a name="Path+export"></a>

### path.export([settings]) ⇒ <code>Promise.&lt;string&gt;</code>
> Export a string of the path. Transforms are only applied to the exported path.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>object</code> |  | Optional settings object. |
| [settings.coordinates] | <code>string</code> | <code>&quot;initial&quot;</code> | Can be 'absolute' to convert all coordinates to absolute, 'relative' to convert all coordinates to relative, 'auto' to convert coordinates to whichever is the fewest characters, 'initial' (default) to retain the coordinates set on each command. |
| [settings.compress] | <code>boolean</code> | <code>false</code> | Remove excess whitespace and unnecessary characters. |
| [settings.combine] | <code>boolean</code> | <code>true</code> | Combine consecutive commands that are redundant. |
| [settings.fractionDigits] | <code>integer</code> | <code>3</code> | Round all numbers in path to a specified number of fraction digits. |
| [settings.scale] | <code>number</code>, <code>Point</code>, <code>Array</code>, <code>object</code> |  | Scale the entire path. If a number is provided then x and y are scaled the same. To scale x and y differently provide a Point, an array as [x, y], or an object as { x:_, y:_ }. |
| [settings.translate] | <code>number</code>, <code>Point</code>, <code>Array</code>, <code>object</code> |  | Translate the entire string a specified distance. If a number is provided then x and y are translated the same. To translated x and y differently provide a Point, an array as [x, y], or an object as { x:_, y:_ }. |
| [settings.maxCharsPerLine] | <code>integer</code> |  | Add newlines at logical breaks in the path to improve readability. |
| [settings.commandsOnNewLines] | <code>boolean</code> | <code>false</code> | Add a newline between each command. |
| [settings.toPolygon] | <code>boolean</code> | <code>false</code> | Format the string for use in a polygon element. Sets coordinates to 'absolute'. |
| [settings.async] | <code>boolean</code> | <code>false</code> | Process each command in a separate Promise. |


[npm]: https://img.shields.io/npm/v/pathinator.svg
[npm-url]: https://npmjs.com/package/pathinator
[build]: https://travis-ci.org/DarrenPaulWright/pathinator.svg?branch&#x3D;master
[build-url]: https://travis-ci.org/DarrenPaulWright/pathinator
[coverage]: https://coveralls.io/repos/github/DarrenPaulWright/pathinator/badge.svg?branch&#x3D;master
[coverage-url]: https://coveralls.io/github/DarrenPaulWright/pathinator?branch&#x3D;master
[deps]: https://david-dm.org/DarrenPaulWright/pathinator.svg
[deps-url]: https://david-dm.org/DarrenPaulWright/pathinator
[size]: https://packagephobia.now.sh/badge?p&#x3D;pathinator
[size-url]: https://packagephobia.now.sh/result?p&#x3D;pathinator
[vulnerabilities]: https://snyk.io/test/github/DarrenPaulWright/pathinator/badge.svg?targetFile&#x3D;package.json
[vulnerabilities-url]: https://snyk.io/test/github/DarrenPaulWright/pathinator?targetFile&#x3D;package.json
[license]: https://img.shields.io/github/license/DarrenPaulWright/pathinator.svg
[license-url]: https://npmjs.com/package/pathinator/LICENSE.md
