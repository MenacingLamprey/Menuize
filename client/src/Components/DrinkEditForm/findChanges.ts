export interface ObjectDifference<T> {
  remove: T[];
  add: T[];
}

export const difference = <T>(objList1: T[], objList2: T[], identifierKey: keyof T): ObjectDifference<T> => {
  
  const diff: ObjectDifference<T> = {
    remove: [],
    add: []
  };

  const map1 = new Map();
  for (const obj of objList1) {
    const identifier = obj[identifierKey];
    map1.set(identifier, obj);
  }

  for (const obj2 of objList2) {
    const identifier = obj2[identifierKey];
    if (map1.has(identifier)) {
      const obj1 = map1.get(identifier);

      let isDifferent = false;
      const diffObj: any = {};

      for (const key in obj1 as T) {
        if (obj1.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
          isDifferent = true;
          diffObj[key] = obj2[key];
        }
      }

      if (isDifferent) {
        const diffObject: T = { ...obj1, ...diffObj };
        diff.add.push(diffObject);
      }
    } else {
      diff.add.push(obj2);
    }
  }

  for (const obj1 of objList1) {
    const identifier = obj1[identifierKey];
    if (!objList2.some(obj => obj[identifierKey] === identifier)) {
      diff.remove.push(obj1);
    }
  }

  return diff;
}