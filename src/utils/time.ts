// 封装一个函数，获取时间
export const getTime = () => {
  let message = ''
  const hours = new Date().getHours()
  if (hours >= 0 && hours < 6) {
    message = '凌晨'
  } else if (hours >= 6 && hours < 9) {
    message = '早上'
  } else if (hours >= 9 && hours < 12) {
    message = '上午'
  } else if (hours >= 13 && hours < 18) {
    message = '下午'
  } else {
    message = '晚上'
  }

  return message
}
