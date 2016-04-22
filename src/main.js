var React = require('react-native')
var {
  Navigator,
  StyleSheet
} = React;

var ItemList = require('./components/itemList.js');
var TabBar = require('./components/tabBar.js');

var ROUTES = {
  itemList: ItemList,
  tabBar: TabBar
};

module.exports = React.createClass({
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },
  render: function() {
    return (
      <Navigator
        style={ styles.container }
        initialRoute={ {name: 'tabBar'} }
        renderScene={this.renderScene}
        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
