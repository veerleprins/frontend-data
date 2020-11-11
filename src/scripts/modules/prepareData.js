// CLEANING THE DATASETS:

//This function has as parameters the total data set and an array
// of columns and changes each item of the column to a integer or float:
export function toNumbers(dataArray, columnArr) {
  return dataArray.forEach(arrItem => {
    columnArr.forEach(c => {arrItem[c] = +arrItem[c];});
  });
}

// This function changes the values within an object that is inside
// an object to integers or floats:
export function toIntegersInObj(dataArray, objName, columnArr) {
  return dataArray.forEach(arrItem => {
    columnArr.forEach(c => {arrItem[objName][c] = +arrItem[objName][c];});
  });
}


// TRANSFORMING THE DATASETS:

// This function merges two datasets together:
export function mergeData(dataset1, dataset2, itemArr) {
  return dataset2.map(obj1 => {
    const filtered = dataset1.find(obj2 => obj1[itemArr[0]] === obj2[itemArr[0]]);
    obj1[itemArr[1]] = filtered;
    return obj1;
  });
}

// This function transforms the data that has no data available:
export function createNaN(dataArray) {
  dataArray.forEach(item => {
    item.specifications == undefined ? item.specifications = {
      capacity: NaN,
      chargingpointcapacity : NaN
    } : item.specifications
  })
}

// This function creates a new array with only the specific data:
export function createArr(data) {
  return data.map(element => {
    return {
      description : element.areadesc,
      capacity : element.specifications.capacity,
      location : element.location,
      chargingPoints :  element.specifications.chargingpointcapacity
    };
  });
}