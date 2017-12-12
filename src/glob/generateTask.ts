import extractParent from './extractParent';

export interface ITask {
  base: string;
  patterns: string[];
}

const generateTask = (pattern: string, ignore: string[]): ITask => {
  const parent = extractParent(pattern);
  const parents = {
    [parent]: pattern,
  };

  // Expand negative patterns to exclude directories
  ignore.forEach((ignorePattern) => {
    if (ignorePattern.endsWith('/**')) {
      ignore.push(ignorePattern.replace(/(\/\*\*)+$/, ''));
    }
  });

  const negative: string[] = [];
  ignore.forEach((ignorePattern) => {
    let gPattern = ignorePattern;
    if (parent === '.') {
      gPattern = '!' + ignorePattern;
    } else {
      gPattern = ignorePattern.startsWith(parent) ?
        `!${ignorePattern}` :
        `!${parent}/${ignorePattern}`;
    }

    if (ignore.indexOf(gPattern) === -1) {
      negative.push(gPattern);
    }
  });

  return {
    base: parent,
    patterns: [parents[parent], ...negative],
  };
};

export default generateTask;
