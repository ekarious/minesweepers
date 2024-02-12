export function getRandomIntFromArray(arr: number[], quantity: number): number[] {
  const temp: number[] = [];

  while(temp.length < quantity) {
    const index = Math.floor(Math.random() * 1000 + 1) % (arr.length);

    if (!temp.some((x) => x === index)){
      temp.push(index)
    }
  }

  return temp;
}