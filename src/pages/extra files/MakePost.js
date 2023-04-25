import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet , TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getFirestore, onSnapshot, doc, getDocs, setDoc, collection, Firestore } from 'firebase/firestore'

export default function MakePosr({navigation}) {

    const [image, setImage] = React.useState(null);
    const [title, settitle] = React.useState(null);
    const [brand, setbrand] = React.useState(null);
    const [des, setdes] = React.useState(null);
    const [price, setprice] = React.useState(null);
    const [loc, setloc] = React.useState(null);



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection : true
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
        else
        {
            console.log("image not picked")
        }
    };

    return (

        <View style={styles.container}>
            
        <View style={{flex:0.26, backgroundColor:'grey'}}>
        <View style={{justifyContent:'center'}}>
            <Image source={{ uri: image  }} style={styles.imagez} />
        </View>
        </View>

        <Button title="Pick an image from gallery" onPress={pickImage} />

        <View style={{ backgroundColor:'grey'}}>
        
        <TextInput
        style={styles.input}
        onChangeText={settitle}
        value={title}
        placeholder="Enter Title"
        borderBottomColor = 'pink'
      />

       <TextInput
        style={styles.input}
        onChangeText={setbrand}
        value={brand}
        placeholder="Enter Brand"
      />
       <TextInput
        style={styles.inputDescription}
        onChangeText={setdes}
        numberOfLines={10}
        multiline={true}
        value={des}
        placeholder="Enter Add Description"
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setprice}
        value={price}
        placeholder="Enter Price"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={setloc}
        value={loc}
        placeholder="Enter Location"
      />

      </View>

       
        <Button 
          title="Submit Add"
          onPress={ async () =>
            db.collection('add')
            .add({
            titles: title,
            brands: brand,
            descriptions: des ,
            prices: price ,
            locations: loc ,
            pics: image,
            })
            .then(() => {
              console.log('Add Posted!!!');
            })   
        }
        />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 5000
    },

    input: {
        height: 40,
        margin: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'white'
      },
      inputDescription: {
        height: 80,
        margin: 6,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'white'
      },
   
      imagez:{
        height:100,
        width:100,
        justifyContent: 'center',
        margin:4,
        alignSelf: 'center',
        backgroundColor:'green',
        
      }

  });