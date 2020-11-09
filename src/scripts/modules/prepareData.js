// Cleaning the dataset by parsing the strings to integers and floats:
export function cleanData(dataset) {
  dataset.map(column => {
    column.chargingCapacity = parseInt(column.chargingCapacity);
    column.parkingCapacity = parseInt(column.parkingCapacity);
    column.location.latitude = parseFloat(column.location.latitude);
    column.location.longitude = parseFloat(column.location.longitude);
  })
  return dataset;
}

// Merging the two datasets together:
export function mergeData(dataset1, dataset2) {
  return dataset2.map((item) => {
    const specs = dataset1.find((obj) => item.areaid === obj.areaid);
    if (specs !== undefined) {
      item.chargingCapacity = specs.chargingpointcapacity;
      item.parkingCapacity = specs.capacity;
    } else {
      item.chargingpointCapacity = 0;
      item.parkingCapacity = 0;
    }
    return item;
  })
}