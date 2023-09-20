export const backgroundColor = (value: number, e:number) =>{
  return value >= e ? "lightgreen" : "grey";
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


export const  validatePassword = (e:string) => {
  if (e.length < 8 || e.length > 16) {
      return false;
  }
  if (!/[A-Z]/.test(e)) {
      return false;
  }
  if (!/[0-9]/.test(e)) {
      return false;
  }
  return true ? "lightgreen" : "grey";
};