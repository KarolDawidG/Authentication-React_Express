import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 10,
    },
    section: {
      margin: 1,
      padding: 1,
    },
    question: {
      fontSize: 8,
      fontWeight: 'bold',
    },
    answer: {
      fontSize: 8,
      fontWeight: 'bold',
      paddingLeft: 10,
    },
    correctAnswer: {
      fontSize: 8,
      color: 'black',
      fontWeight: 'bold',
    },
    pageNumber: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      fontSize: 10,
      color: 'grey',
    },
    spacer: {
      height: 10,
    },
  });