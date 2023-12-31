import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import QuizAndroid from './QuizAndroid';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

export class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired, // Add route prop type
  };

  static navigationOptions = ({ route }) => {
    const title = route.params?.title || '';
    return {
      title: `${title} Quiz`,
    };
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { navigation, route } = this.props;
    const title = route.params?.title || '';

    if (Constants.platform.android) {
      return <QuizAndroid title={title} />;
    }
    return null;
  }
}

export default Quiz;
