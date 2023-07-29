export const showMessageForDuration = (message: string, setShowMessage: (value: boolean) => void, setMessage: (message: string) => void) => {
    setMessage(message);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };