// 接口域名管理
const region = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")).region : "";
const base = {
  hanlei: 'http://10.10.10.95:8680/api',
  lin: 'http://10.10.10.95:8680/api',
  wang: 'http://10.10.10.95:8680/api',
  entrustamend: 'http://10.10.10.95:8680/api',
  systemgenre: 'http://10.10.10.95:8680/api',
  systemcachetimg: 'http://10.10.10.95:8680/api',
  baseUrl: 'http://10.10.10.95:8680/api',
  lxtbaseUrl: 'http://10.10.10.95:8680/api',
  systemPublicationpage: 'http://10.10.10.95:8680/api',
  baseImgUrl: location.protocol + "//" + location.host + '/',
  baseImgTable: location.protocol + "//" + location.host + '/',
}
export default base;
