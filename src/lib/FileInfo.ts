export default class FileInfo {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  extension: string;
  isVideo: boolean;

  constructor(ext: string, fullFileName?: string) {
    if (fullFileName !== undefined) {
      this.year = fullFileName.substring(0, 4);
      this.month = fullFileName.substring(4, 6);
      this.day = fullFileName.substring(6, 8);
      this.hour = fullFileName.substring(8, 10);
      this.minute = fullFileName.substring(10, 12);
      this.second = fullFileName.substring(12, 14);
    } else {
      let d = new Date();

      this.year = d.getFullYear().toString();
      this.month = ('0' + d.getMonth() + 1).slice(-2);
      this.day = ('0' + d.getDate()).slice(-2);

      this.hour = ('0' + d.getHours()).slice(-2);
      this.minute = ('0' + d.getMinutes()).slice(-2);
      this.second = ('0' + d.getSeconds()).slice(-2);
    }

    this.extension = ext;

    let videoExtensions = [
      '3g2',
      '3gp',
      'aaf',
      'asf',
      'avchd',
      'avi',
      'drc',
      'flv',
      'm2v',
      'm3u8',
      'm4p',
      'm4v',
      'mkv',
      'mng',
      'mov',
      'mp2',
      'mp4',
      'mpe',
      'mpeg',
      'mpg',
      'mpv',
      'mxf',
      'nsv',
      'ogg',
      'ogv',
      'qt',
      'rm',
      'rmvb',
      'roq',
      'svi',
      'vob',
      'webm',
      'wmv',
      'yuv',
    ];

    this.isVideo = videoExtensions.includes(ext);
  }

  /**
   * montName
   * @returns Name of the month for the file
   */
  public monthName(): string {
    const months = [
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

    return months[parseInt(this.month) - 1];
  }

  /**
   * fullFileName
   * @returns Name of the file/suburl
   */
  public fullFileName(): string {
    return `${this.year}${this.month}${this.day}${this.fileName()}`;
  }

  /**
   * fileName
   * @returns the name of the file in the directory
   */
  public fileName(): string {
    return `${this.hour}${this.minute}${this.second}.${this.extension}`;
  }

  /**
   * rawPath
   * @returns the raw path to the image in "public"
   */
  public rawPath(): string {
    return `/raw/${this.year}/${this.month}/${this.day}/${this.fileName()}`;
  }
}
