// 获取数组的随机项
export function getRandomArrayElements (arr, count) {
  let shuffled = arr.slice(0);
  let i = arr.length;
  let min = i - count;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

// 数据的统计展示规范
export function formatCount (num) {
  if (num > 10000) {
    return (num / 10000).toFixed(1) + '万';
  } else {
    return num;
  }
}
// 秒数转换时间格式 00:00
export function formatTime (num) {
  let second = '';
  let minutes = '';
  if (num > 60) {
    second = num % 60;
    second = second >= 10 ? second : '0' + second;
    minutes = Math.floor(num / 60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
  } else {
    if (num < 10) {
      second = '0' + num;
    } else {
      second = num;
    }
    minutes = '00';
  }
  return minutes + ':' + second;
}

// 毫秒转换完成时间 0000-00-00
export function getFormatTime (times) {
  let YY = new Date(times).getFullYear();
  let MM = new Date(times).getMonth() + 1;
  let DD = new Date(times).getDate();
  MM = MM < 10 ? '0' + MM : MM;
  DD = DD < 10 ? '0' + DD : DD;
  return `${YY}-${MM}-${DD}`;
}
