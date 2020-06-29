import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { Cocktail } from './Cocktail';
import { set } from 'react-native-reanimated';


export const  CocktailsList = ({list}) => {
  let [page, setPage] = useState(1);
  const [DATA, setDATA] = useState([]);
 useEffect(() => {
  setPage(1)
  setDATA([list[page-1]])
 }, [list])
 useEffect(() => {
  setDATA([...DATA, list[page-1]])
 }, [page])
   
  return (
    <View style={styles.container}>
      <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) =>  <Cocktail cocktail={item}/>}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{paddingVertical: 20}}>{title}</Text>
      )}
      onEndReached={() => page < list.length && setPage(page+1)}
      onEndReachedThreshold={0.1}
    />
    
       {/* <View>
         {list.map(item => <Cocktail cocktail={item}/>)}
       </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
