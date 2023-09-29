export const removePart = (text: string, partToRemove: string): string => {
  return text.replace(partToRemove, "");
};

export const removeFirstCharacter = (text: string): string => {
  return text.slice(1);
};

export const replaceCharacter = (text: string): string => {
  return text.replace(new RegExp("_", "g"), " ");
};
