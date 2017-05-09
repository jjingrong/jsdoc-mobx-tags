# jsdoc-mobx-tags
JSDoc plugin pre-process typical MobX tags to make them parsable

Currently supports common MobX tags, such as
- `@observer`
- `@observable`
- `@computed`

## INSTALL

The `jsdoc-mobx-tags` plugin can be installed using NPM.

```bash
npm install --save-dev jsdoc-mobx-tags
```

## Usage

To use plugin you should include the plugin module in the `plugins` array of
[JSDoc's configuration file](http://usejsdoc.org/about-configuring-jsdoc.html).

```json
{
    "plugins": ["node_modules/jsdoc-mobx-tags"]
}
```

## Details 

### `@observer`
Assumes layout to be in the form - 
```
@observer
/**
 * Some documentation
 * Some more js documentation
 */
class SomeComponent extends React.Component {
  <Your Component code here>
}
```
Output :
```
/**
 * MobX @observer
 * Some documentation
 * Some more js documentation
 */
class SomeComponent extends React.Component {
  <Your Component code here>
}
```
---
### `@computed`
Assumes layout to be in the form similar to `@observer` - 
```
@computed
/**
 * Some description
 *
 * @return {type} Some type
 */
get someValue() {
  return this.value;
}
```
Output :
```
/**
 * MobX @computed
 * Some description
 *
 * @return {type} Some type
 */
get someValue() {
  return this.value;
}
```
---
### `@observable`
Assumes layout to be in the form - 
```
/* JSDOC: MARK START OBSERVABLE */
@observable someVariable = 0
@observable someString = ''
/* JSDOC: MARK END OBSERVABLE */
```
Output :
```
mobxObservables() {
  /**  
   * MobX @observable
   */
  someVariable = 0
  /**  
   * MobX @observable
   */
  someString = ''
}
```

## Contributing

Feel free to open issues/PRs. This is implemented as a quick hack for my own usage, but I realised that some others may find it useful too :)
