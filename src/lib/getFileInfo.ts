export default function getFileInfo(requestParams: any) {
  // Initialize with empty values
  let fileInfo = {
    year: 0,
    month: 0,
    monthName: '',
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    fileName: '',
    extension: '',
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

  fileInfo.monthName = months[requestParams.substr(4, 2) - 1];
  fileInfo.year = requestParams.substr(0, 4);
  fileInfo.month = requestParams.substr(4, 2);
  fileInfo.day = requestParams.substr(6, 2);
  fileInfo.hour = requestParams.substr(8, 2);
  fileInfo.minute = requestParams.substr(10, 2);
  fileInfo.second = requestParams.substr(12, 2);
  fileInfo.fileName = requestParams.substr(8, 6);
  fileInfo.extension = requestParams.substr(15, 4);

  return fileInfo;
}
