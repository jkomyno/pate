export function isNegative(pattern: string): boolean {
  return pattern[0] === '!';
}

export function getNegativeAsPositive(patterns: string[]) {
  const results = patterns.reduce((acc, curr) => {
    if (isNegative(curr)) {
      acc.push(curr.slice(1));
    }

    return acc;
  }, [] as string[]);

  return results;
}
