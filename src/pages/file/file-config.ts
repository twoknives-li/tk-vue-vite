/**
 * 证件公共类 MIMEtypes
 * 支持jpg jpeg gif png bmp pdf格式
 * 下载映射
 */
export const CardMIMEtypes = [
  {
    type: '.png',
    mime: 'image/png'
  },
  {
    type: '.PNG',
    mime: 'image/png'
  },
  {
    type: '.JPG',
    mime: 'image/jpeg'
  },
  {
    type: '.jpg',
    mime: 'image/jpeg'
  },
  {
    type: '.JPEG',
    mime: 'image/jpeg'
  },
  {
    type: '.jpeg',
    mime: 'image/jpeg'
  },
  {
    type: '.gif',
    mime: 'image/gif'
  },
  {
    type: '.bmp',
    mime: 'image/bmp'
  },
  {
    type: '.pdf',
    mime: 'application/pdf'
  },
  {
    type: '.PDF',
    mime: 'application/pdf'
  }
];
/**
 * 证件公共类 accept可接收类型
 * 支持jpg jpeg gif png bmp pdf格式
 * 上传文件选择
 */
export const CardAccept = '.png, .PNG, .jpg, .JPG, .jpeg, .JPEG, .gif, .bmp, .pdf, .PDF';

/**
 * 证件公共类 accept可接收类型
 * 支持jpg jpeg gif png bmp pdf格式
 * 上传文件选择
 */
export const CardAcceptd = '.png, .PNG, .jpg, .JPG, .jpeg, .JPEG, .gif, .bmp, .pdf, .PDF, .ofd, .OFD';
/**
 * 证件公共类 上传文字提示
 */
export const Cardstr = '证件上传支持JPG、PDF、BMP、PDF等格式图片 最大不超过100MB';

/**
 * 证据公共类
 * 支持图片 .png, .jpg, .jpeg, .gif, .bmp
 * 支持文档类 .pdf .doc, .docx, .xls, .xlsx, .ppt, .pptx
 * 支持压缩包类 .7z, .rar, .zip
 * 支持音频类 .mp3, .m4a, .wma
 * 支持视频类 .mp4, .rm, .rmvb, .avi, .wmv, .flv, .mprg, .m4v
 * 下载映射
 */
export const EvidenceMIMEtypes = [
  {
    type: '.png',
    mime: 'image/png'
  },
  {
    type: '.PNG',
    mime: 'image/png'
  },
  {
    type: '.JPG',
    mime: 'image/jpeg'
  },
  {
    type: '.jpg',
    mime: 'image/jpeg'
  },
  {
    type: '.JPEG',
    mime: 'image/jpeg'
  },
  {
    type: '.jpeg',
    mime: 'image/jpeg'
  },
  {
    type: '.gif',
    mime: 'image/gif'
  },
  {
    type: '.bmp',
    mime: 'image/bmp'
  },
  {
    type: '.pdf',
    mime: 'application/pdf'
  },
  {
    type: '.PDF',
    mime: 'application/pdf'
  },
  {
    type: '.doc',
    mime: 'application/vnd.ms-word'
  },
  {
    type: '.docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    type: '.xls',
    mime: 'application/vnd.ms-excel'
  },
  {
    type: '.xlsx',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  },
  {
    type: '.ppt',
    mime: 'application/vnd.ms-powerpoint'
  },
  {
    type: '.pptx',
    mime: 'application/vnd.openxmlformats-officedocument.p resentationml.presentation'
  },
  {
    type: '.7z',
    mime: 'application/octet-stream'
  },
  {
    type: '.7Z',
    mime: 'application/octet-stream'
  },
  {
    type: '.rar',
    mime: 'application/octet-stream'
  },
  {
    type: '.RAR',
    mime: 'application/octet-stream'
  },
  {
    type: '.zip',
    mime: 'application/zip'
  },
  {
    type: '.ZIP',
    mime: 'application/zip'
  },
  {
    type: '.mp3',
    mime: 'application/octet-stream'
  },
  {
    type: '.MP3',
    mime: 'application/octet-stream'
  },
  {
    type: '.m4a',
    mime: 'application/octet-stream'
  },
  {
    type: '.M4A',
    mime: 'application/octet-stream'
  },
  {
    type: '.wma',
    mime: 'application/octet-stream'
  },
  {
    type: '.WMA',
    mime: 'application/octet-stream'
  },
  {
    type: '.mp4',
    mime: 'application/octet-stream'
  },
  {
    type: '.MP4',
    mime: 'application/octet-stream'
  },
  {
    type: '.rm',
    mime: 'application/octet-stream'
  },
  {
    type: '.RM',
    mime: 'application/octet-stream'
  },
  {
    type: '.rmvb',
    mime: 'application/octet-stream'
  },
  {
    type: '.RMVB',
    mime: 'application/octet-stream'
  },
  {
    type: '.avi',
    mime: 'application/octet-stream'
  },
  {
    type: '.AVI',
    mime: 'application/octet-stream'
  },
  {
    type: '.wmv',
    mime: 'application/octet-stream'
  },
  {
    type: '.WMV',
    mime: 'application/octet-stream'
  },
  {
    type: '.flv',
    mime: 'application/octet-stream'
  },
  {
    type: '.FLV',
    mime: 'application/octet-stream'
  },
  {
    type: '.mprg',
    mime: 'application/octet-stream'
  },
  {
    type: '.MPRG',
    mime: 'application/octet-stream'
  },
  {
    type: '.m4v',
    mime: 'application/octet-stream'
  },
  {
    type: '.M4V',
    mime: 'application/octet-stream'
  },
  {
    type: '.ofd',
    mime: 'application/octet-stream'
  },
  {
    type: '.OFD',
    mime: 'application/octet-stream'
  }
];

/**
 * 证据公共类 accept可接收类型
 * 支持图片 .png, .jpg, .jpeg, .gif, .bmp
 * 支持文档类 .pdf .doc, .docx, .xls, .xlsx, .ppt, .pptx
 * 支持压缩包类 .7z, .rar, .zip
 * 支持音频类 .mp3, .m4a, .wma
 * 支持视频类 .mp4, .rm, .rmvb, .avi, .wmv, .flv, .mprg, .m4v
 * 上传文件选择
 */
export const EvidenceAccpet =
  '.png, .jpg, .jpeg, .gif, .bmp, .pdf, .doc, .docx, .xls, .xlsx , .ppt, .pptx, .ppt, .7z, .rar, .zip, .mp3, .m4a, .wma, .mp4, .rm, .rmvb, .avi, .wmv, .flv, .mprg, .m4v';

/**
 * 证据公共类 上传文字提示
 */
export const Evidencestr =
  '证据上传支持JPG、PDF、DOC、7Z、RAR、MP4、RM、RMVB、AVI、WMV、MP3、M4A、WMA格式的文件、文件最大100M';

/**
 * 可支持在线播放的格式
 * 支持音频类 .mp3, .m4a
 * 下载映射
 */
export const EvidenceAcceptAudioMIMEtypes = [
  {
    type: '.mp3',
    mime: 'application/octet-stream'
  },
  {
    type: '.m4a',
    mime: 'application/octet-stream'
  }
];
/**
 * 可支持在线播放的格式
 * 支持视频类 .mp4, .m4v, .rtmp, .webm, .ogv
 * 不过.rtmp, .webm, .ogv是流格式 不提供服务接口
 * 下载映射
 */
export const EvidenceAcceptVideoMIMEtypes = [
  {
    type: '.mp4',
    mime: 'application/octet-stream'
  },
  {
    type: '.MP4',
    mime: 'application/octet-stream'
  },
  {
    type: '.m4v',
    mime: 'application/octet-stream'
  }
];

/**
 * 禁止浏览的格式 （现有技术暂不支持Web浏览）
 * jfif
 * rar zip 7z
 * avi wmv rm rmvb flv wma
 * exe
 */
export const BanEvidenceAccept = ['jfif', 'rar', 'zip', '7z', 'avi', 'wmv', 'rm', 'rmvb', 'flv', 'wma', 'exe'];

/**
 * 可访问文档格式
 * OFFICE 三件套格式 后端提供数据转换接口访问
 */
export const TransEvidenceAccpet = [
  'doc',
  'DOC',
  'docx',
  'DOCX',
  'xls',
  'XLS',
  'xlsx',
  'XLSX',
  'ppt',
  'PPT',
  'pptx',
  'PPTX'
];
/**
 * 可访问图片格式
 * jpg png bmp gif
 */
export const PicAccept = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'bmp', 'gif'];
/**
 * 可直接访问文档格式
 */
export const PDFAccept = ['pdf', 'PDF'];
/**
 * 可访问音频格式
 * mp3 m4a
 */
export const AudioAccept = ['mp3', 'MP3', 'm4a', 'M4A'];
/**
 * 可访问 视频格式
 * mp4 m4v rtmp webm ogv
 */
export const VideoAccept = ['mp4', 'MP4', 'm4v', 'M4V', 'rtmp', 'webm', 'ogv'];
