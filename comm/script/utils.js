const charts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateUserName(n) {
  var userName = ''
  for (var i = 0; i < n; i++) {
    undefined
    var id = Math.ceil(Math.random() * 35)
    userName += charts[id]
  }
  return userName
}

function checkDate(property) {
  return function (startTime, endTime) {
    //日期格式化
    var start_date = new Date(startTime[property].replace(/-/g, "/"));
    var end_date = new Date(endTime[property].replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    return end_date.getTime() - start_date.getTime();
  }
}

module.exports = {
  generateUserName: generateUserName,
  checkDate: checkDate,
}

