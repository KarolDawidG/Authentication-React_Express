export const backgroundColor = (value: number, e:number) =>{
  return value >= e ? "lightcoral" : "grey";
}

export const preventSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === ' ') {
    e.preventDefault();
  }
};

export   const validateEmail = (e: string) => {
  const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return email.test(e);
};