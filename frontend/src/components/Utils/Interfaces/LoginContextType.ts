export interface LoginContextType {
  username: string;
  password: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  onClose: () => void;
}
