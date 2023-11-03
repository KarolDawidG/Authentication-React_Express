export interface ContactProps {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    onClose?: () => void;
  }