import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export const  Cocktail = ({cocktail}) => {
  return (
    <View style={styles.container}>
       <Image style={{ width: 80, height: 80 }} source={{uri: cocktail.strDrinkThumb}}/>
       <Text>{cocktail.strDrink}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#fff',
  },
});
