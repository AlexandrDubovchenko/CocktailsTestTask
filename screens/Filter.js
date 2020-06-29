import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const FilterScreen = ({ route, navigation }) => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    setCategories(route.params.categories)
  }, [])

  return (
    <View style={styles.container}>
      {
        categories.map(category => (
          <TouchableOpacity  onPress={() => {
            category.checked = !category.checked;
            setCategories([...categories])
          }}>
            <View style={styles.item}>
              <Text>{category.strCategory}</Text>
              {category.checked && <Image style={{ width: 20, height: 20 }} source={require('../assets/mark.png')}/>}
            </View>
          </TouchableOpacity>
        ))
      }
      <Button
        onPress={() => {
          route.params.setCategories(categories);
          navigation.navigate('Home')
        }}
        title="Apply"
        color="#272727"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },

  item: {

    flexDirection: "row",
    justifyContent: "space-between",
    color: 'blue',
    marginBottom: 40,

  }
});
