import React, {
 Component,
 Image,
 ListView,
 StyleSheet,
 Text,
 View,
 TouchableHighlight
} from 'react-native';

var shopatReqUrl = "http://static.ssgcdn.com/common/ui/json/bshop_list_NORMAL.json"

class brandsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(shopatReqUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        })
      }).done();
  }

 render() {
   console.log("brandsByCategory");
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        aaaaaaa
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
module.exports = brandsByCategory;
