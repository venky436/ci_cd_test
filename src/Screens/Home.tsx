import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { PurchasesPackage } from 'react-native-purchases';
// import User from '../components/User';

const Home = () => {
	const navigation = useNavigation<any>();
	
	return (
		<ScrollView>
			<Button title='paywall' onPress={()=>navigation.navigate('PaywallScreen')}/>
			{/* Display the packages */}
			{/* <View style={styles.container}>
				{packages.map((pack) => (
					<TouchableOpacity
						key={pack.identifier}
						onPress={() => onPurchase(pack)}
						style={styles.button}
					>
						<View style={styles.text}>
							<Text>{pack.product.title}</Text>
							<Text style={styles.desc}>{pack.product.description}</Text>
						</View>
						<View style={styles.price}>
							<Text>{pack.product.priceString}</Text>
						</View>
					</TouchableOpacity>
				))}
			</View> */}

			{/* Display the user state */}
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginVertical: 6
	},
	button: {
		padding: 12,
		borderRadius: 4,
		margin: 4,
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff'
	},
	text: {
		flexGrow: 1
	},
	desc: {
		color: '#B6B7C0',
		paddingVertical: 4
	},
	price: {
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 8,
		borderColor: '#EA3C4A'
	}
});

export default Home;