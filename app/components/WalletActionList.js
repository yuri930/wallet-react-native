import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import context from './common/context';

import WalletAction from './WalletAction';

class WalletActionList extends Component {
  onButtonPress(type) {
    const { navigation, currency, account } = this.props;

    switch (type) {
      case 'send': {
        navigation.navigate('Send', { account, currency });
        break;
      }
      case 'receive': {
        navigation.navigate('Receive', { currency });
        break;
      }
      case 'withdraw': {
        navigation.navigate('Withdraw', { account, currency });
        break;
      }
      case 'deposit': {
        navigation.navigate('Deposit');
        break;
      }
      case 'more':
        navigation.navigate('Wallets', { account, currency });
        break;
      default:
        console.log('Error: unknown button type');
    }
  }

  render() {
    const { viewStyleContainer, viewStyleButtons } = styles;
    const { type, colors } = this.props;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.header }]}>
        <FlatList
          contentContainerStyle={viewStyleButtons}
          data={this.props.buttons}
          horizontal
          scrollEnabled={false}
          renderItem={({ item }) => (
            <WalletAction
              type={item.type}
              onPress={() => this.onButtonPress(item.type)}
              color={this.props.colors.primary}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    zIndex: 10,
  },
  viewStyleButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 8,
  },
  viewStyleBox: {
    flexDirection: 'column',
    padding: 16,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'normal',
  },
};

export default context(WalletActionList);
