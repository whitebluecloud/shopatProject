import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://m.apps.ssg.com/api/bshop/main/datas/item.ssg';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL;

class ShopatProject extends Component {
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
    fetch(REQUEST_URL, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      body: JSON.stringify({
          cacheCmd:"pass",
          common:{
           ts:"20150106160929",
           apl_ver:"2.0.3",
           os_cd:"10",
           mobil_app_no:"14"
          },
          params:{
             siteNo:"6005",
             itemImgSize:"500",
             zoneId:"5000016022",
             tabIndex:"food",
             srchwdNm:"나이키",
             brandId:"2000019295",
             cornrId:"1000016628",
             dispCtgId:"3500002939",
             gender:"M",
             bshopId:"1000000401",
             seasonId:"1000002117",
             shopId:"6000091825", // nba매장
             onedayBeforeYn:"N",
             dispSiteNo:"6005"
           }
      })})
      .then((response) =>{ return response.json() })
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.itemList),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    console.log(movie);
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{uri: movie.itemImgUrl}}
        >
        </Image>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
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
  thumbnail: {
    width: 128,
    height: 128,
    backgroundColor:'white',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = ShopatProject;
