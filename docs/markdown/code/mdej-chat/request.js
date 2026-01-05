import {decryptStr, encryptStr} from "./crypto_utils"

export function sendMsgToRobot(chat) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://yxchat.impc.com.cn/robot/sendMsgToRobot')
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      'robotCode': 'hn2twk',
      'channelCode': 'A',
      'sessQaType': 'QA',
      'fromUserName': chat.fromUserName,
      'questions': chat.text,
      'sessionId': chat.sessionId,
      'sendTime': chat.sendTime,
    }));
    xhr.onload = function () {
      let {code, result, msg} = JSON.parse(xhr.responseText)
      if (code == 10000) return resolve(result)
      else return reject(msg)
    }
    xhr.onerror = function () {
      setTimeout(() => {
        return reject("网络异常，发送失败！")
      }, 1000)
    }
  })
}

export function getHotTopicData() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('post', 'http://yxchat.impc.com.cn/robot/getHotTopic?robotCode=hn2twk&channelCode=A')
    xhr.withCredentials = false;
    xhr.onload = function () {
      let {result, code, msg} = JSON.parse(xhr.responseText)
      if (code !== 10001) return resolve(result)
      else return reject(msg)
    }
    xhr.send()
  })
}

export function getRobotWelcomeMsg(chat) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', 'http://yxchat.impc.com.cn/robot/getRobotWelcomeMsg?fromUserName=' + chat.fromUserName)
    xhr.withCredentials = false;
    xhr.onload = function () {
      let {data, code, msg} = JSON.parse(xhr.responseText)
      if (code == 0) return resolve(data)
      else return reject(msg)
    }
    xhr.send()
  })
}

export function queryChatRecords(chat) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', `http://yxchat.impc.com.cn/vuechat/queryChatRecords?username=${chat.fromUserName}&pageNum=1&pageSize=1000`)
    xhr.withCredentials = false;
    xhr.onload = function () {
      let {data, code, msg} = JSON.parse(xhr.responseText)
      if (code == 0) return resolve(data)
      else return reject(msg)
    }
    xhr.send()
  })
}

export function getChatRecordsData(chat) {
  chat.pageSize = 20 //todo 聊天分页的条数
  return new Promise(async (resolve, reject) => {
    let mMessageList = []
    let {dataList, msgList} = await queryChatRecords(chat)
    if (msgList && msgList.list) mMessageList = [...msgList.list]
    // dataList = [{rq: '20230422'}, {rq: '20230423'}, {rq: '20230424'}, {rq: '20230425'}]
    dataList.reverse()//将日期数组反序：[{rq: "20230423"}, {rq:"20230425"}]
    chat.dataList = dataList
    if (!dataList.length || mMessageList.length >= chat.pageSize) return resolve(mMessageList)
    if (dataList.length) mMessageList = getPreDaysRecords(chat, mMessageList)
    return resolve(mMessageList)
  })
}

export function getPreDaysRecords(chat, mMessageList = []) {
  console.log("getPreDaysRecords", chat.dataList)
  return new Promise(async (resolve, reject) => {
    try {
      let dataList = chat.dataList
      for (let i = 0; i < dataList.length; i++) {
        let jsonList = await downloadJson({...chat, date: dataList[i].rq})
        mMessageList = [...jsonList, ...mMessageList]
        if (mMessageList.length >= chat.pageSize || i == dataList.length - 1) {
          chat.dataList = dataList.slice(i + 1, dataList.length)
          return resolve(mMessageList)
        }
      }
      return resolve(mMessageList)
    } catch (e) {
      return reject(e)
    }
  })
}

import {chatData} from "./chatData"

export function downloadJsonTest({date}) {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(chatData[date])
    }, 1000)
  })
}

export function downloadJson(chat) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `http://yxchat.impc.com.cn/vuechat/queryChatRecordsBydate?username=${chat.fromUserName}&date=${chat.date}`);
    xhr.onload = function (e) {
      try {
        if (this.status == 200) {
          let {data, code, msg} = JSON.parse(xhr.responseText)
          if (code == 0) return resolve(data)
          else return reject(msg)
        }
      } catch (e) {
        reject(e)
      }
    };
    xhr.send()
  })
}

export function sendMsgTokfRecycle(chat) {
  return new Promise((resolve, reject) => {
    let keyStr = `${chat.fromUserName};${chat.sendTime};${chat.text}`
    keyStr = encryptStr(keyStr)
    let value = decryptStr(keyStr)
    let xhr = new XMLHttpRequest();
    // xhr.open('post', 'http://yxchat.impc.com.cn/vuechat/sendMsgTokf')
    xhr.open('post', 'http://yxchat.impc.com.cn/vuechat/sendMsgTokfAsnc')
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false
    xhr.send(JSON.stringify({
      'fromUserName': chat.fromUserName,
      'nickName': chat.nickName,
      'channel': 'A',
      'content': chat.text,
      'filePath': chat.filePath,
      'sendTime': chat.sendTime,
      'sessionId': chat.sessionId,
      'msgType': chat.msgType,
      'code': keyStr,
      // 'value':value
    }));
    // xhr.timeout = 3000
    // 设置超时以后的处理函数
    xhr.ontimeout = function () {
      console.log('请求超时！');
      return resolve(false)
    }
    xhr.onload = function () {
      console.log(xhr.responseText)
      let data = JSON.parse(xhr.responseText)
      let code = data && data.list && data.list.code
      if (code == keyStr) return resolve(true);
      return resolve(false)
    }
    xhr.onerror = function () {
      return resolve(false)
    }
  })
}

//循环发送消息给客服
export async function sendMsgTokf(chat) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < 3; i++) {
      let result = await sendMsgTokfRecycle(chat)
      if (result) return resolve({num: i, result: true})
    }
    return resolve({result: false})
  })
}

//断开连接
export function endSession(chat){
  return new Promise((resolve, reject) => {
    let url = 'http://yxchat.impc.com.cn/vuechat/endSession'
    let xhr = new XMLHttpRequest();
    xhr.open('post', url)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false
    xhr.send(JSON.stringify({
      'fromUserName': chat.fromUserName,
    }));
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText)
      return resolve(data)
    }
    xhr.ontimeout = function () {
      console.log('请求超时！');
      return reject(false)
    }
    xhr.onerror = function () {
      return reject(false)
    }
  })
}

export function getConnection(chat) {
  if (!chat.timeId) chat.timeId = '20230302180000'
  return new Promise((resolve, reject) => {
    let url = 'http://yxchat.impc.com.cn/vuechat/getConnection?' +
        'channel=A' +
        '&sex=' +
        chat.sex +
        '&nickName=' +
        chat.nickName +
        '&fromUserName=' +
        chat.fromUserName+
        '&rgkfFlag='+
        chat.rgkfFlag
    let xhr = new XMLHttpRequest();
    xhr.open('get', url)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false
    xhr.send();
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText)
      return resolve(data)
    }
  })
}

export function queryHistoryPrefix(chat) {
  // chat.timeId = '20230302171100'
  return new Promise((resolve, reject) => {
    let url = 'http://yxchat.impc.com.cn/vuechat/queryHistoryPrefix?' +
        'channel=A' +
        '&sex=' +
        chat.sex +
        '&nickName=' +
        chat.nickName +
        '&timeId=' +
        chat.timeId +
        '&fromUserName=' +
        chat.fromUserName;
    let xhr = new XMLHttpRequest();
    xhr.open('get', url)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false
    xhr.send();
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText)
      return resolve(data)
    }
    xhr.onerror = function () {
      setTimeout(() => {
        return resolve("请求失败！")
      }, 3000)
    }
  })
}

const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear()
  let mm = time.getMonth() + 1
  mm = mm < 10 ? '0' + mm : mm
  let dd = time.getDate()
  dd = dd < 10 ? '0' + dd : dd
  let hh = time.getHours()
  let mf = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  let ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  let timeStr = `${year}${mm}${dd}${hh}${mf}${ss}`
  return timeStr
}
