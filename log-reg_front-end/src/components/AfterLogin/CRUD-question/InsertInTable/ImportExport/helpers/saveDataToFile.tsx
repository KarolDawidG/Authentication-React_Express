
interface MyData {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correctAnswer: string;
}

  export const saveDataToFile = (txtData: MyData[], fileName: string, onClose: () => void) => {
    const txtDataString = txtData
      .map((item: MyData) => {
        return `${item.question}\n${item.optionA}\n${item.optionB}\n${item.optionC}\n${item.correctAnswer}\n\n`;
      })
      .join("");
  
    const blob = new Blob([txtDataString], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
  
    a.click();
  
    window.URL.revokeObjectURL(url);
    onClose();
  };
  