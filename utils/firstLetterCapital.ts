export function firstLetterCapital(word: string){
  let firstLetter = word.charAt(0).toUpperCase();
  let OtherLetters = word.slice(1);

  return firstLetter + OtherLetters
}