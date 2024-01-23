import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyData } from '../helpers/interfaceMyData';
import { MyDocument } from './MyDocument';

export const saveDataToFilePdf = (txtData: MyData[], fileName: string) => {
  const splitDataIntoSegments = (data: MyData[]) => {
    const segmentSize = 6;
    const segments = [];
    for (let i = 0; i < data.length; i += segmentSize) {
      segments.push(data.slice(i, i + segmentSize));
    }
    return segments;
  };
  const segments = splitDataIntoSegments(txtData);

  return (
    <PDFDownloadLink
      document={<MyDocument segments={segments} />}
      fileName={fileName}
    >
      {({ loading }) =>
        loading ? <button className='btn btn-success'>Loading document...</button>: <button className='btn btn-success'>Download now!</button>
      }
    </PDFDownloadLink>
  );
};
