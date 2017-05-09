'use e.sourceict';

/**
* Handles typical MobX tags
* A parsing error typically occurs when parsing MobX files with jsdoc.
* 
* This plugin converts these tags into parsable comments for jsdoc
* 
* @module node_modules/jsdoc-mobx-tags
* @author Jing Rong LIM <contact@jjingrong.com>
*/

exports.handlers = {
  ///
  /// Convert MobX tags into comments
  /// @param e
  ///
  beforeParse: function(e) {

    /**    
    * Parses `@observer` tag    
    */     
    ///  Assumes layout to be in the form - 
    ///  ```
    ///  @observer
    ///  /**
    ///   * Some documentation
    ///   * Some more js documentation
    ///   */
    ///  class SomeComponent extends React.Component {
    ///    <Component code here>
    ///  }
    ///  ```   
    var match = '\n@observer\n\/\*\*';
    var replace = '\n/**\n * MobX @observer\n *';
    e.source = e.source.replace(match, replace);

    /**
    * Parses `@computed` tag
    * Assume layout to be similar to how `@observer` tags are used
    */ 
    var replace = '\n  /**\n   * MobX @computed\n   *';
    e.source = e.source.replace(/\n\s+@computed\n\s+\/\*\*/g, replace);

    /**    
     * Handles observable instantiation
     */
     ///  Assumes layout to be in the form - 
     ///  ```
     ///  /* JSDOC: MARK START OBSERVABLE */
     ///  @observable someVariable = 0
     ///  @observable someString = ''
     ///  /* JSDOC: MARK END OBSERVABLE */
     ///  ```   
    var match = "/* JSDOC: MARK START OBSERVABLE */"
    var replace = 'mobxObservables() {';
    e.source = e.source.replace(match, replace);
    var match = "/* JSDOC: MARK END OBSERVABLE */"
    var replace = '}';
    e.source = e.source.replace(match, replace);

    /**
    * Parses `@observable` tag for variables
    */ 
    var replace = '\n /**\n  * MobX @observable\n  *\/\n this\.';
    e.source = e.source.replace(/@observable\s+/g, replace);
  }
};
