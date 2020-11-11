// Cleaning the dataset by parsing the strings to integers and floats:
export function cleanData(dataset) {
  let data = toIntegers(dataset, 'chargingCapacity');
  console.log('this is the data: ' + data);
  dataset.map(column => {
    // console.log(column['chargingCapacity']);
    // column.chargingCapacity = +column.chargingCapacity;
    column.parkingCapacity = +column.parkingCapacity;
    column.location.latitude = +column.location.latitude;
    column.location.longitude = +column.location.longitude;
  })
  return dataset;
}

export function toIntegers(dataArray, column) {
  return dataArray.map(arrItem => arrItem[column] = parseInt(arrItem[column]));
}

// Merging the two datasets together:
export function mergeData(dataset1, dataset2) {
  return dataset2.map((item) => {
    const specs = dataset1.find((obj) => item.areaid === obj.areaid);
    if (specs !== undefined) {
      item.chargingCapacity = specs.chargingpointcapacity;
      item.parkingCapacity = specs.capacity;
    } else {
      item.chargingCapacity = 0;
      item.parkingCapacity = 0;
    }
    return item;
  })
}