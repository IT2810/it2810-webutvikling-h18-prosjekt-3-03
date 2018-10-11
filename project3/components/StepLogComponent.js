import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
// <div>Icons made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


export default class FlatListBasics extends Component {
  renderListSeparator = () => {
     return (
       <View
         style={styles.itemSeperator}
       />
     );
   };

   renderListHeader = () => {
      return (
        <View style={styles.listHeader}>
        <Text style={styles.headerText}> Log </ Text></ View>
      );
    };


  render() {
    return (
      <View style={styles.container}>
        <FlatList
        ItemSeparatorComponent={this.renderListSeparator}
        ListHeaderComponent={this.renderListHeader}
          data={[
            {key: new Date("2018","09","06").toDateString(), steps:3000, goal: 5000, achieved: false},
            {key: new Date("2018","09","07").toDateString(), steps:2000, goal: 3000, achieved: false},
            {key: new Date("2018","09","08").toDateString(), steps:7000, goal: 7000, achieved: true},
            {key: new Date("2018","09","09").toDateString(), steps:13000, goal: 10000, achieved: true},
          ]}
          renderItem={({item}) => <View style={styles.container} ><View style={styles.cont2}><Text style={styles.dateText}>{item.key}</Text>
          <Image style={styles.stepImg} source={ require('../assets/run.png')} /><Text style={styles.stepText}>{item.steps}/{item.goal}</Text></ View>
          {item.achieved ? <Image style={styles.starImg} source={ require('../assets/favourites.png')} /> : <Image style={styles.starImg} source={ require('../assets/empty.png')} />}</View>}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  alignItems: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'wrap',
  },
  dateText: {
    paddingTop: 4,
    margin: "4%",
    marginRight:0,
    fontSize: 18,
    flexDirection: 'row',
    width: "48%",
  },
  stepText: {
    paddingTop: 6,
    margin: "4%",
    marginLeft: "2%",
    fontSize: 14,
    flexDirection: 'row',
  },
  starImg:{
    margin: "4%",
  },
  stepImg:{
    marginTop: "5%",
  },
  itemSeperator:{
    height: 1,
    width: "96%",
    backgroundColor: "#CED0CE",
    marginLeft: "2%"
  },
  cont2: {
   flex: 1,
  alignItems: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'wrap',
  },
  listHeader:{
    width: "100%",
    height: 40,
    backgroundColor: "#555555",
    alignItems:"center",

    marginTop: "8%",
  },
  headerText:{
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 5,
  }
})
