export default function imagePath() {
  let d = new Date();

  let fileInfo = {
    year: '',
    month: '',
    day: '',
    fileName: '',
  };
  fileInfo.year = d.getFullYear().toString();
  fileInfo.month = ('0' + (d.getMonth() + 1)).slice(-2);
  fileInfo.day = ('0' + d.getDate()).slice(-2);

  let hour = ('0' + d.getHours()).slice(-2);
  let minute = ('0' + d.getMinutes()).slice(-2);
  let seconds = ('0' + d.getSeconds()).slice(-2);

  fileInfo.fileName = `${hour}${minute}${seconds}`;

  return fileInfo;
}
