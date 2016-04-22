import React, {
 Component,
 Image,
 ListView,
 StyleSheet,
 Text,
 View,
 TouchableHighlight,
 Navigator
} from 'react-native';

var shopatReqUrl = "http://static.ssgcdn.com/common/ui/json/bshop_list_NORMAL.json"

var BrandsByCategory = require('./brandsByCategory.js');
var ROUTES = {
  brandsByCategory: BrandsByCategory
};

class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        testCount : 0,
        loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(shopatReqUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        })
      }).done();
  }

 render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Text>
        카테고리 {this.state.testCount}
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBshop.bind(this)}
          style={styles.listView}>
        </ListView>
      </View>
      );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>);

  }

  renderBshop(bshop: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={this.navSecond.bind(this)}>
        <View style={shopatStyles.container}>
          <Text style={styles.title}>
            {bshop.NM}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  navSecond(){
    console.log(this);
    /*
    this.props.navigator.push({
      id: 'second'
    })
    */
  }
  _pressRow(rowID) {
    console.log("rowID is " + rowID);
    console.log(this);
    this.setState({testCount: this.state.testCount+1});
    return (
      <Text>
      aaaa {this.state.testCount}
      </Text>
      /*
      <Navigator
        style={ styles.container }
        initialRoute={ {name: 'brandsByCategory'} }
        renderScene={this.renderScene}
      ></Navigator>
      */
    );
  }

  renderScene(route, navigator) {
    console.log("c");
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
};


const shopatStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    bshop: {
    flex: 1,
    width:100,
    height:120
  },
});
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
  /*
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  */
});
module.exports = category;
