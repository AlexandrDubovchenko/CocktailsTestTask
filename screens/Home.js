import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CocktailsList } from '../components/CocktailsList';

export const HomeScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const categoriesRes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const categoriesList = await categoriesRes.json();
      setCategories(categoriesList.drinks.map(category => ({ ...category, checked: true })));
    })()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Filter', {categories, setCategories })}>
          <Image style={{ width: 40, height: 40, marginRight: 20 }} source={require('../assets/filter.png')} />
        </TouchableOpacity>
      ),
    });
  })

  useEffect(() => {
    const activeCategories = categories.filter(category => category.checked)
    const promises = activeCategories.map(el => {
       return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${el.strCategory}`)
      });     
    Promise.all(promises).then(res => Promise.all(res.map(el => el.json())).then(res => {
      const list = res.map((el, i) => ({
        title: activeCategories[i].strCategory,
        data: el.drinks
      }))
      setList(list)
      
    }));
  }, [categories])
  if (!list.length) {
    return <View></View>
  }
  
  return (
    <View style={styles.container}>
       <CocktailsList  list={list} />
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
