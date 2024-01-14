import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ViewPagerAndroid
} from 'react-native';
import PropTypes from 'prop-types';
import TextButton from './TextButton';
import TouchButton from './TouchButton';
import { gray, green, red, textGray, darkGray, white } from '../utils/colors';
import { connect } from 'react-redux';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

export class QuizTest extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired
  };
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    page: 0,
    questions: Object.values(this.props.decks)[2].questions.length,
    answered: Array(Object.values(this.props.decks)[2].questions.length).fill(0)
  };
  handlePageChange = evt => {
    console.log('evt.nativeEvent.position', evt.nativeEvent.position);
    this.setState({
      show: screen.QUESTION,
      page: evt.nativeEvent.position
    });
  };
  handleAnswer = response => {
    const { decks } = this.props;
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(prevState => ({
      answered: prevState.answered.map((val, idx) =>
        prevState.page === idx ? 1 : val
      )
    }));
    console.log('this.state.answered', this.state.answered);

    const { correct, incorrect } = this.state;
    const questions = Object.values(decks)[2].questions;
    const numQuestions = questions.length - 1;

    if (numQuestions === correct + incorrect) {
      this.setState({ show: screen.RESULT });
    }
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,

      answered: Array(prevState.questions).fill(0)
    }));
  };
  render() {
    const { decks } = this.props;
    const { show } = this.state;
    const questions = Object.values(decks)[2].questions;


    if (this.state.show === screen.RESULT) {
      const { correct, incorrect } = this.state;
      const total = correct + incorrect;
      const percent = ((correct / total) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.container}>
          <View style={styles.block}>
            <Text style={styles.count}>Done</Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {correct} / {total} correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Percentage correct
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <TouchButton
              btnStyle={{ backgroundColor: green, borderColor: white }}
              onPress={this.handleReset}
            >
              Restart Quiz
            </TouchButton>
            <TouchButton
              btnStyle={{ backgroundColor: gray, borderColor: textGray }}
              txtStyle={{ color: textGray }}
            >
              Back to Deck
            </TouchButton>
          </View>
        </View>
      );
    }

    return (

      <ViewPagerAndroid
        style={styles.container}
        scrollEnabled={true}
        // onPageSelected={pos => this.handlePageChange(pos)}
        onPageSelected={this.handlePageChange}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TextButton
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: screen.ANSWER })}
              >
                Answer
              </TextButton>
            ) : (
              <TextButton
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: screen.QUESTION })}
              >
                Question
              </TextButton>
            )}
            <View>
              <TouchButton
                btnStyle={{ backgroundColor: green, borderColor: white }}
                onPress={() => this.handleAnswer(answer.CORRECT)}
                // disabled={true}
                disabled={this.state.answered[idx] === 1}
              >
                Correct
              </TouchButton>
              <TouchButton
                btnStyle={{ backgroundColor: red, borderColor: white }}
                onPress={() => this.handleAnswer(answer.INCORRECT)}
                // disabled={true}
                disabled={this.state.answered[idx] === 1}
              >
                Incorrect
              </TouchButton>
            </View>
          </View>
        ))}
      </ViewPagerAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: darkGray,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  resultTextGood: {
    color: green,
    fontSize: 46,
    textAlign: 'center'
  },
  resultTextBad: {
    color: red,
    fontSize: 46,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({ decks: state });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizTest);
