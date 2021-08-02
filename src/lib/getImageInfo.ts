export default function getImageInfo(requestParams: any) {
  // Initialize with empty values
  let imageInfo = {
    year: 0,
    month: 0,
    monthName: '',
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    fileName: '',
  };

  // All of the months so we can choose using the number
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  imageInfo.monthName = months[requestParams.substr(4, 2) - 1];
  imageInfo.year = requestParams.substr(0, 4);
  imageInfo.month = requestParams.substr(4, 2);
  imageInfo.day = requestParams.substr(6, 2);
  imageInfo.hour = requestParams.substr(8, 2);
  imageInfo.minute = requestParams.substr(10, 2);
  imageInfo.second = requestParams.substr(12, 2);
  imageInfo.fileName = requestParams.substr(8, 10);

  return imageInfo;
}
