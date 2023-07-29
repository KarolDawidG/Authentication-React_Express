export interface LoginFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    username: string;
    password: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
  }