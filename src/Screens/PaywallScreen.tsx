import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Purchases from 'react-native-purchases';
import {useNavigation} from '@react-navigation/native';

export default function PaywallScreen() {
  const [packages, setPackages] = useState<any>(null);
  const navigation = useNavigation<any>();

  const ENTITLEMENT_ID = 'pro';

  const getPackages = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      // if (
      //   offerings.current !== null &&
      //   offerings.current.availablePackages.length !== 0
      // ) {
      //   setPackages(offerings.current.availablePackages);
      //   console.log(offerings.current.availablePackages);
      // }
      // Iterate through the offerings and extract entitled products

      //TO GET ENTITLED PRODUCTS
      // for (const offeringKey in offerings.current.offerings) {
      //   const offering = offerings.current.offerings[offeringKey];
      //   for (const productIdentifier in offering.products) {
      //     const product = offering.products[productIdentifier];
      //     if (product.entitlements.length > 0) {
      //       entitledProducts.push(product);
      //     }
      //   }
      // }
      if (offerings && offerings.current) {
        const offering = offerings.all;
        console.log(offering.pro_2);
        if (offering) {
          let pro = offering.pro_2.availablePackages;
          // console.log({pro});
          setPackages(pro);

          // You can access the offering details here
        } else {
          // console.error(`Offering with identifier '${offeringIdentifier}' not found`);
        }
      }
    } catch (e) {
      Alert.alert('Error getting offers', e.message);
    }
  };

  async function getEntitlements() {
    // let products = await Purchases.getEntitlements();
    // console.log({products});
  }

  async function onPurchase(packa: any) {
    try {
      const {customerInfo} = await Purchases.purchasePackage(packa);
      console.log({customerInfo});
      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        navigation.goBack();
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e);
      }
    }
  }

  // const getUserDetails = async () => {
  
  //   const purchaserInfo = await Purchases.getCustomerInfo();
    
  //     if(typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'){

  //     }
  // };
  

  async function unSubScribeHandler() {
      
  }

  let packageView = () => {
    return (
      <View style={styles.container}>
        {packages?.map(pack => (
          <TouchableOpacity
            key={pack.identifier}
            onPress={() => onPurchase(pack)}
            style={styles.button}>
            <View style={styles.text}>
              <Text>{pack.packageType}</Text>
              <Text style={styles.desc}>{pack.product.description}</Text>
            </View>
            <View style={styles.price}>
              <Text>{pack.product.priceString}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  useEffect(() => {
    getEntitlements();
    getPackages();
  }, []);
  return (
    <View>
      <Text>PaywallScreen</Text>
      {packageView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 6,
    backgroundColor: 'black',
  },
  button: {
    padding: 12,
    borderRadius: 4,
    margin: 4,
    flexDirection: 'row',
    width: '100%',
    color: '#B6B7C0',
    // backgroundColor: '#fff',
  },
  text: {
    flexGrow: 1,
    color: '#B6B7C0',
  },
  desc: {
    color: '#B6B7C0',
    paddingVertical: 4,
  },
  price: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    borderColor: '#EA3C4A',
    color: '#B6B7C0',
  },
});
