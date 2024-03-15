/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
// import CodePush from 'react-native-code-push';

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/Screens/Home';
import PaywallScreen from './src/Screens/PaywallScreen';
import Purchases, {LOG_LEVEL} from 'react-native-purchases';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};

function App(): React.JSX.Element {
  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        // setPackages(offerings.current.availablePackages);
        console.log(offerings.current.availablePackages);
      }
    } catch (e) {
      console.log({e});
    }
  };
  const init = async () => {
    if (Platform.OS === 'android') {
      await Purchases.configure({apiKey: 'goog_mJHnXUMftoahzoYoVfdXDyShhPi'});
    } else {
      //   await Purchases.configure({apiKey:'appl_CgCkVEUYAfpybWfqFcjgGXdAsRo'});
    }
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    // Load all offerings and the user object with entitlements
    // await loadOfferings();
  };
  useEffect(() => {
    init();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PaywallScreen" component={PaywallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App
