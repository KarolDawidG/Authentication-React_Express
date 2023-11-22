import { Page, Text, View, Document } from '@react-pdf/renderer';
import { styles, mainPageStyle } from './style';
import { MyData } from '../helpers/interfaceMyData';
import { writings } from './writings';

export const MyDocument = ({ segments }: { segments: MyData[][] }) => {
  let questionNumber = 0;
  return(<Document>

    {/* Pirst page */}
    <Page size="A4" style={mainPageStyle.page}>
      <Text style={mainPageStyle.title}>{writings.title}</Text>
      <Text style={mainPageStyle.subtitle}>{writings.subtitle}</Text>
      <Text style={mainPageStyle.description}>{writings.description_1}</Text>
      <Text style={mainPageStyle.description}>{writings.description_2}</Text>
      <Text style={mainPageStyle.description}>{writings.good_luck}</Text>
    </Page>

    {/* Main pages */}
    {segments.map((segment, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {segment.map((item, itemIndex) => {
            questionNumber += 1;
            return (
              <View key={itemIndex} style={styles.section}>
                <Text style={styles.question}>
                  {'No. '}{`${questionNumber}: ${item.question}`}
                </Text>
                <Text style={styles.spacer} />
                <Text style={styles.answer}>{'a) '}{item.optionA}</Text>
                <Text style={styles.answer}>{'b) '}{item.optionB}</Text>
                <Text style={styles.answer}>{'c) '}{item.optionC}</Text>
              </View>
            );
          })}
          <Text style={styles.pageNumber}>
            Page {pageIndex + 2}
          </Text>
        </Page>
      ))}

    {/* Last page */}
    <Page size="A4" style={styles.page}>
      <Text>Correct answers</Text>
      {segments.flat().map((item, itemIndex) => (
        <View key={itemIndex}>
          <Text style={styles.correctAnswer}>
            {itemIndex+1} {' : '} {item.correctAnswer}
          </Text>
        </View>
      ))}
    </Page>

  </Document>)
};

