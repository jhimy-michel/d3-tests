/**
 * Function to generate random data sets
 * @returns
 */
export const generateDataset = () =>
  Array(10)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);

export const generateCirclesDataset = () =>
  Array(10)
    .fill(0)
    .map(() => ({
      x: Math.random() * 99 + 1,
      y: Math.random() * 99 + 1,
      radius: Math.random() * 5 + 2, // Random radius between 2 and 7
    }));

export const generateDatasetForCirclesExample = () =>
  Array(5)
    .fill(0)
    .map(() => Math.floor(Math.random() * 100) + 1);
