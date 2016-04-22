import React, {
 Component,
 Image,
 ListView,
 StyleSheet,
 Text,
 View
} from 'react-native';

var shopatReqUrl = "http://static.ssgcdn.com/common/ui/json/bshop_list_NORMAL.json"
class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
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
          dataSource: this.state.dataSource.cloneWithRows(responseData[0].D),
          loaded: true,
        })
      }).done();
  }

 render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBshop}
          style={styles.listView}>
        </ListView>
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

  renderBshop(bshop) {
    return (
      <View style={shopatStyles.container}>
       <Image
         source={{uri:bshop.I}}
         style={shopatStyles.bshop}>
       </Image>
      </View>
    );
  }
};
const shopatStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    fontSize: 20,
    marginBottom: 8,
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
