var express = require("express");
var router = express.Router();
const https = require("https");
const http = require("http");
const querystring = require("querystring");
const moment = require("moment");
const qs = require("qs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
////bff.gds.org.cn/gds/searching-api/ProductService/ProductInfoByGTIN?gtin=06922868221219&id=UfDJ8CsTLrJ-r9NNoHBsMNwTT85PZpnLclFp7A2i9W6_gtCDWtLADJbNrqhrehHq_Ob_6pdqV3U3pWDzxo9c0JNWaybrd-8ruz6d_YiiFawfnbC1-LH0k19hU78NOcjnzpdOWG4lphOOFm_nmn3ANTyrgxawYcDwslywu7WmwVARSG8MfeUFNyHAzD3RaHXGkAfnY8ebEwgn1NNA6vIhEV6IcNC

router.get("/gs1", function (req, ress, next) {
  try {
    const options = {
      hostname: "bff.gds.org.cn", //"219.232.126.12", //"bff.gds.org.cn",
      port: 443, //https:443,http:80
      //path: "/gds/searching-api/ProductService/ProductInfoByGTIN?gtin=06922868221219&id=UfDJ8CsTLrJ-r9NNoHBsMNwTT85PZpnLclFp7A2i9W6_gtCDWtLADJbNrqhrehHq_Ob_6pdqV3U3pWDzxo9c0JNWaybrd-8ruz6d_YiiFawfnbC1-LH0k19hU78NOcjnzpdOWG4lphOOFm_nmn3ANTyrgxawYcDwslywu7WmwVARSG8MfeUFNyHAzD3RaHXGkAfnY8ebEwgn1NNA6vIhEV6IcNC",
      path: "/gds/searching-api/ProductService/ProductListByGTIN?PageSize=30&PageIndex=1&SearchItem=06922868221219",
      method: "GET",
      rejectUnauthorized: false,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Connection: "keep-alive",
        Host: "bff.gds.org.cn",
        Origin: "https://www.gds.org.cn",
        Referer: "https://www.gds.org.cn/",
        "Sec-Ch-Ua":
          '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkNFOTk2QzBDQzg1MzQ4MkEzMzQxNkVBOUUxQ0E3NkVERjYzMUJCODNSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6InpwbHNETWhUU0NvelFXNnA0Y3AyN2ZZeHU0TSJ9.eyJuYmYiOjE2ODcwMjM5MTQsImV4cCI6MTY4NzAzMTExNCwiaXNzIjoiaHR0cHM6Ly9wYXNzcG9ydC5nZHMub3JnLmNuIiwiY2xpZW50X2lkIjoidnVlanNfY29kZV9jbGllbnQiLCJzdWIiOiIyMDc4ODczIiwiYXV0aF90aW1lIjoxNjg3MDIzOTA3LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJNaW5lIiwiVXNlckluZm8iOiJ7XCJVc2VyTmFtZVwiOm51bGwsXCJCcmFuZE93bmVySWRcIjowLFwiQnJhbmRPd25lck5hbWVcIjpudWxsLFwiR2NwQ29kZVwiOm51bGwsXCJVc2VyQ2FyZE5vXCI6XCLmmoLml6Dkv6Hmga9cIixcIklzUGFpZFwiOmZhbHNlLFwiQ29tcGFueU5hbWVFTlwiOm51bGwsXCJDb21wYW55QWRkcmVzc0NOXCI6bnVsbCxcIkNvbnRhY3RcIjpudWxsLFwiQ29udGFjdFRlbE5vXCI6bnVsbCxcIkdjcExpY2Vuc2VIb2xkZXJUeXBlXCI6bnVsbCxcIkxlZ2FsUmVwcmVzZW50YXRpdmVcIjpudWxsLFwiVW5pZmllZFNvY2lhbENyZWRpdENvZGVcIjpudWxsfSIsIlY0VXNlckluZm8iOiJ7XCJVc2VyTmFtZVwiOlwi5ZWG5rW35rWu5rKJNjY2XCIsXCJFbWFpbFwiOm51bGwsXCJQaG9uZVwiOlwiMTkxNTAwMjQ0MjNcIixcIkNhcmROb1wiOlwiXCJ9IiwianRpIjoiNzBGNDVCNzlDQ0ZFODBBOUVFRTJGMDUxNUZCNEVEMEMiLCJzaWQiOiI5Q0ExQTBBQTlDNTI5NzBCM0FCOUIyRTkxMDgyN0JEMSIsImlhdCI6MTY4NzAyMzkxNCwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.NzYbwVRQsRzILvajRH7X8AB_ORdWYlTqHrNdZ3YRBLv_29w9DIIpwai-B3pHn5vtBAdWHN-iNcV12_YO_C0HnIqebvUjfrD5Bp0qgs_ME5Hce8Qn5JEOgwz4ma4ahNZp8zUmF71Y7QxcitKCehLkwq0_UFJQmR92r-pfkpQzw2bVUiGA0VF7MOyEDWO-MAiZ5ajS8ZgF_uWaESK3nj5BOhRRUN_xwJqSxE4m4EdPhj_Zh1_5TKwSyfstX2cNglo0qeC51YIoGQJxp8NR9DpipRXIoa6pwsOxvOLQKH_TzuYwC7j2aCu3jEzqTwIT1fCLZ7qfKPTr0mEtPcQpuDA_Rw",
      },
    };
    const reqq = https.request(options, (res) => {
      // console.log(res);
      // console.log(`状态码：${res.statusCode}`);
      let ret = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        ret += chunk;
        console.log(`响应主体：${chunk}`);
      });
      res.on("end", () => {
        console.log("响应中已无数据。");
        return ress.send(ret);
      });
    });
    reqq.on("error", (error) => {
      console.error("An error occurred:", error);
    });
    reqq.end();
  } catch (e) {
    console.log(e.message);
  }
});

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function accessToken() {
  const data = JSON.stringify({
    partnerID: "WM3N1MOLD",
    secret: "C2nvtO4BBEbJNtT5UIizsuwmRG8664f2",
    grantType: "password",
  });
  const options = {
    hostname: "sfapi.sf-express.com",
    port: 443, //https:443,http:80
    path: "/oauth2/accessToken?" + querystring.stringify(JSON.parse(data)),
    method: "POST",
    rejectUnauthorized: false,
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Chrome/59.0.3071.115",
      "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  };
  return new Promise((resolve, reject) => {
    const reqq = https.request(options, (res) => {
      res.setEncoding("utf8");
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
        console.log(`响应主体：${chunk}`);
      });
      res.on("end", () => {
        console.log(data);
        resolve(data);
        console.log("响应中已无数据。");
      });
    });
    // 发送请求参数数据
    reqq.write(data);
    reqq.on("error", (error) => {
      reject(error);
      console.error("An error occurred:", error);
    });
    reqq.end();
  });
}

router.get("/sf", async function (req, ress, next) {
  const dt = JSON.parse(await accessToken());

  const msgData = JSON.stringify({
    language: "0",
    trackingType: "1",
    trackingNumber: ["SF1404957385785"],
    methodType: "1",
    checkPhoneNo: "4424",
    key: "C2nvtO4BBEbJNtT5UIizsuwmRG8664f2",
  });
  const data = JSON.stringify({
    partnerID: "WM3N1MOLD",
    requestID: guid(),
    serviceCode: "EXP_RECE_SEARCH_ROUTES",
    timestamp: Date.now(),
    accessToken: dt.accessToken,
    msgData,
  });
  const options = {
    hostname: "bspgw.sf-express.com",
    port: 443, //https:443,http:80
    path:
      "/std/service/EXP_RECE_SEARCH_ROUTES?" +
      querystring.stringify(JSON.parse(data)),
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      Accept: "application/json, text/plain, */*",
      Connection: "",
      "User-Agent": "Chrome/59.0.3071.115",
      "Content-type": "application/x-www-form-urlencoded",
    },
  };
  /*
  const data = JSON.stringify({
    language: "0",
    trackingType: "1",
    trackingNumber: ["SF1404957385785"],
    methodType: "1",
  });
  */
  const reqq = https.request(options, (res) => {
    res.setEncoding("utf8");
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
      console.log(`响应主体：${chunk}`);
    });
    res.on("end", () => {
      ress.send(data);
      console.log("响应中已无数据。");
    });
  });
  // 发送请求参数数据
  reqq.write(data);
  reqq.on("error", (error) => {
    console.error("An error occurred:", error);
  });
  reqq.end();
});

router.get("/sf1", function (req, ress, next) {
  const timestamp = Date.now();
  console.log(timestamp);
  const data = JSON.stringify({
    lang: "sc",
    region: "cn",
    translate: "",
    timestamp: timestamp,
  });
  const no = "SF1439919779302";
  const options = {
    hostname: "www.sf-express.com",
    port: 443, //https:443,http:80
    path:
      `/sf-service-core-web/service/waybillRoute/${no}/routesForNoLogin?` +
      querystring.stringify(JSON.parse(data)),
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      Connection: "",
      "User-Agent": "Chrome/59.0.3071.115",
      "Content-type": "application/x-www-form-urlencoded",
      Referer:
        "https://www.sf-express.com/we/ow/chn/sc/waybill/waybill-detail/SF1439919779302",
      "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
      Cookie:
        "tgw_l7_route=a730579da1dace945c7cb8269a8c9c1b; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22191****4423%22%2C%22first_id%22%3A%221889fdee69b12ef-01e118eecaf953f-26031a51-7372800-1889fdee69c12ac%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E9%A1%BA%E4%B8%B0%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A2%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Fs%22%2C%22_latest_activeIndex%22%3A%22149495%22%2C%22_latest_level3%22%3A%22146%22%2C%22_latest_interName%22%3A%22%E8%B7%AF%E7%94%B1%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3-EXP_RECE_SEARCH_ROUTES%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfbG9naW5faWQiOiIxOTEqKioqNDQyMyIsIiRpZGVudGl0eV9jb29raWVfaWQiOiIxODg5ZmRlZTY5YjEyZWYtMDFlMTE4ZWVjYWY5NTNmLTI2MDMxYTUxLTczNzI4MDAtMTg4OWZkZWU2OWMxMmFjIn0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22191****4423%22%7D%2C%22%24device_id%22%3A%221889fdee69b12ef-01e118eecaf953f-26031a51-7372800-1889fdee69c12ac%22%7D; OWFSESSION=cebc6958c12a451b879cbc7117edc89a",
      "X-Tc-Randstr": "@P7u",
      "X-Tc-Ticket":
        "Xc72VEsw9uGlrj15Q6MnX9zwWblMgt7PQaobga6FwnOfEUcEHtkQOEveVTnGFOKMcqReHpXP54nsz9xPlvTArj4opLDmSpFXqMIOYRA3Tzw**",
      "X-Tc-Version": "DescribeCaptchaResult",
    },
  };
  /*
  const data = JSON.stringify({
    language: "0",
    trackingType: "1",
    trackingNumber: ["SF1404957385785"],
    methodType: "1",
  });
  */
  const reqq = https.request(options, (res) => {
    res.setEncoding("utf8");
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
      console.log(`响应主体：${chunk}`);
    });
    res.on("end", () => {
      ress.send(data);
      console.log("响应中已无数据。");
    });
  });
  // 发送请求参数数据
  reqq.write(data);
  reqq.on("error", (error) => {
    console.error("An error occurred:", error);
  });
  reqq.end();
});

router.get("/yd", function (req, ress, next) {
  const data = JSON.stringify({
    query_from_srcid: 4004,
    isBaiduBoxApp: 10002,
    isWisePc: 10020,
    tokenV2: "q_oiNiunNHyW__SojtDOGItIei7oRzawqG7MqphsVeFY3r3cs37rF1QQiY5VRNBH",
    cb: "jQuery110208575700227150085_1687162815136",
    appid: 4001,
    com: "yunda",
    nu: 433281444086905,
    vcode: "",
    token: "",
    qid: "9971134d00070e1a",
  });
  const options = {
    hostname: "express.baidu.com",
    port: 443, //https:443,http:80
    path: "/express/api/express?" + querystring.stringify(JSON.parse(data)),
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      Accept: "application/json, text/plain, */*",
      Connection: "",
      "User-Agent": "Chrome/59.0.3071.115",
      "Content-type": "application/x-www-form-urlencoded",
      Cookie:
        "PSTM=1667336116; BIDUPSID=93A9B0F56E0B526AA730BC8CF867DD97; BDUSS=ZBQTdzSmhnWGo3TUlzWFZSSHp1U2E1VVh-cUpVR2gtempDMS0tR21ZVnNjRlprSVFBQUFBJCQAAAAAAAAAAAEAAAD~6KIYR1RfbW9uc3RlcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGzjLmRs4y5kbG; BDUSS_BFESS=ZBQTdzSmhnWGo3TUlzWFZSSHp1U2E1VVh-cUpVR2gtempDMS0tR21ZVnNjRlprSVFBQUFBJCQAAAAAAAAAAAEAAAD~6KIYR1RfbW9uc3RlcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGzjLmRs4y5kbG; BAIDUID=BF77FA17DC10302988E93CD340623819:SL=0:NR=10:FG=1; BDSFRCVID=zUPOJeC626bokvRfi_nmMPt-5j_FGS5TH6aojnoyVKs-hnhfPOTxEG0Pnx8g0KFMcUJuogKKXgOTHw0F_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF=JnAq_D0atKI3Hn7gMtTJq4FDhUn2etJyaR3kapjvWJ5TMC_CDJ6nKTKEMJnXQfrTbPDtKn0ayCo_ShPC-tnzybjDyJ7IyMFH-goCWRoz3l02VM59e-t2yU_I-noZ-4RMW23v0h7mWP02sxA45J7cM4IseboJLfT-0bc4KKJxbnLWeIJIjjCMDT5BjN_eq6n2aKn0WJ082R6oDn8k-PnVenIA0-nZKxtqtJcaWbvKLJQE_nrzXq3MqjLqBPjxQ5QnWncKWbc8a-T4OP8zM-Tsbl8g3h7405OTaj-O0KJc3q6jSqcGhPJvypksXnO7-5OlXbrtXp7_2J0WStbKy4oTjxL1Db3JKjvMtIFtVJO-KKCaMC8xjM5; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BA_HECTOR=25810ga50l0h202ka4a0212g1i8ulhc1o; delPer=0; PSINO=7; BAIDUID_BFESS=BF77FA17DC10302988E93CD340623819:SL=0:NR=10:FG=1; BDSFRCVID_BFESS=zUPOJeC626bokvRfi_nmMPt-5j_FGS5TH6aojnoyVKs-hnhfPOTxEG0Pnx8g0KFMcUJuogKKXgOTHw0F_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF_BFESS=JnAq_D0atKI3Hn7gMtTJq4FDhUn2etJyaR3kapjvWJ5TMC_CDJ6nKTKEMJnXQfrTbPDtKn0ayCo_ShPC-tnzybjDyJ7IyMFH-goCWRoz3l02VM59e-t2yU_I-noZ-4RMW23v0h7mWP02sxA45J7cM4IseboJLfT-0bc4KKJxbnLWeIJIjjCMDT5BjN_eq6n2aKn0WJ082R6oDn8k-PnVenIA0-nZKxtqtJcaWbvKLJQE_nrzXq3MqjLqBPjxQ5QnWncKWbc8a-T4OP8zM-Tsbl8g3h7405OTaj-O0KJc3q6jSqcGhPJvypksXnO7-5OlXbrtXp7_2J0WStbKy4oTjxL1Db3JKjvMtIFtVJO-KKCaMC8xjM5; ZFY=snfHXCSZg9vBps:A3orXugDlO9j5ij643e18b:BcXy:B6s:C; H_PS_PSSID=38515_36542_38686_38881_38796_38793_38831_38582_38486_38812_38823_38838_38638_26350; BDRCVFR[feWj1Vr5u3D]=mk3SLVN4HKm",
    },
  };
  const reqq = https.request(options, (res) => {
    res.setEncoding("utf8");
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
      console.log(`响应主体：${chunk}`);
    });
    res.on("end", () => {
      ress.send(data);
      console.log("响应中已无数据。");
    });
  });
  // 发送请求参数数据
  reqq.write(data);
  reqq.on("error", (error) => {
    console.error("An error occurred:", error);
  });
  reqq.end();
});

function generateRandomHex(length) {
  const characters = "0123456789ABCDEF";
  let hex = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hex += characters[randomIndex];
  }

  return hex;
}

router.get("/wx", function (req, res, next) {
  const randomString = generateRandomHex(32);
  const timestamp = Math.floor(Date.now() / 1000);
  const mchid = "1643537592";
  const data = JSON.stringify({
    mchid: mchid,
    out_trade_no: "1217752501201407033233368018",
    appid: "wx6b3307311465f68a",
    description: "拎哒在线购物",
    notify_url: "https://weixin.qq.com/",
    amount: {
      total: 1,
      currency: "CNY",
    },
  });
  const signString =
    "POST\n" +
    "/v3/pay/transactions/native\n" +
    timestamp +
    "\n" +
    randomString +
    "\n" +
    data +
    "\n";

  console.log(data);

  const fs = require("fs");
  const crypto = require("crypto");

  // 从 PEM 文件中读取私钥
  const privateKey = fs.readFileSync("D://apiclient_key.pem", "utf8");
  // console.log("key:", privateKey);

  // 创建一个 Sign 对象，并使用私钥进行初始化
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signString);
  const signature = sign.sign(privateKey, "base64");

  console.log("Signature:", signature);
  const serial_no = "5384DC53C5B83F52F9E7D1E60DC27242776B291D";
  const authString = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${randomString}",signature="${signature}",timestamp="${timestamp}",serial_no="${serial_no}"`;

  console.log(authString);

  const options = {
    hostname: "api.mch.weixin.qq.com",
    port: 443, //https:443,http:80
    path: "/v3/pay/transactions/native",
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/65.0.3325.181 Mobile Safari/537.36 MicroMessenger/7.0.5.1440(0x27000538) Process/appbrand0 NetType/WIFI Language/zh_CN",
      Authorization: authString,
    },
  };

  const reqq = https.request(options, (ress) => {
    ress.setEncoding("utf8");
    let data = "";
    ress.on("data", (chunk) => {
      data += chunk;
      console.log(`响应主体：${chunk}`);
    });
    ress.on("end", () => {
      res.send(data);
      console.log("响应中已无数据。");
    });
  });
  reqq.on("error", (error) => {
    console.error("An error occurred:", error);
  });
  reqq.write(data);
  reqq.end();
});

router.get("/zfb", async function (req, res, next) {
  const AlipaySdk = require("alipay-sdk").default;
  const AlipayFormData = require("alipay-sdk/lib/form").default;
  const alipaySdk = new AlipaySdk({
    /** 支付宝网关 **/
    gateway: "https://openapi.alipay.com/gateway.do",

    /** 应用id，如何获取请参考：https://opensupport.alipay.com/support/helpcenter/190/201602493024 **/
    appId: "2021004108634061",

    /** 应用私钥，密钥格式为pkcs1，如何获取私钥请参考：https://opensupport.alipay.com/support/helpcenter/207/201602469554  **/
    privateKey:
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCAM8MhsVW2Gl23NAJ/1WWryTZUQbhI/SNsELDjLxmO0kwryTJATB4T1WWdvoRmwrrJ3XKs/8d0aBd9+q6PE13/n1SvSyWh4/UNO+74isOa5v+dWTIfhKBgBTGHsZeFRbJI5Xnf+BTIxUOee18Jr3KjOqX3lF/UwpMxfg21PtL6SUsL/qYvk7XchZtFJ9txC3TQveN3xJL0ic5DDV8EnY00o/HtRSjJcRxryamfnlZJkmnCH49XJrMG706iRDTyLe38qoZqHBXudmaf9VVArMlDbgNVWi8yqGMF1pL0cLcHoslcVGiyXFe68zm45na6HjdJtPFE5z8DXhdJKqTS+JozAgMBAAECggEALZW6MZXDu0+euRDGPrwbPbz7E3SW2WUhHkDFFNLfjJgcO4l70779BuJfEnr2yy88iaCzMO519l840zO6s+cYCleWHgpjZDARJ1aDP17f9IlkpIddujVHbT0LgotULDA/F4p5DnlAsq7pv0Vw4pm+8mldMC5S8O0Kt5NxvluLWzEHaIU7CLzI2dBBrK++19+IyeU+Gfnx/WwLeQGnKprBhucKXHj146PH/tXppyvElp8iZNdHtub7sg67VpMEbeJdW4MkbYoXYAkU7kMdiPmomnExlyX0YX7fVn/9hrLiftx+CAZH/1A+JngVEwWPljk3r1JmzdzYONLh5R5KtqRTYQKBgQDaTsxF1WLmQoOJJfIHfodAtfBZEMwSdn6N1lfRKD1QyvXsDc9QK1lZ9VbJJ01sajrR0jO+R21w3ZaemN8ew/lV8LYtqaz5cwgWJdUYvCpQdH/dOMdPiIjemmcDZOEv6xXFHTLKLXYzvPn9pMfwbUzIS0NgX4JT+rS3oRA+GC/JwwKBgQCWVkwvy7rfdVj7/1BrIwlBU6dSRhnYC1/uQD+nUqjwHu1A+GqU8zEV77LzfD6MUFge4sv8JTcMmxDZBWGVCJe3IGpVeHBgJEmI2hi5cjSQ3azh5cgxSI5l2nQp28ZmNk0uB9NpZY3atabvTF69ieD6txn5vaQKgvQRjyncKud20QKBgGzsIfm55TWT/EMivqbEl8FOxdP6kIepva0RRBGkrSsxiRA1N7n9VwCOa7XDuVqdiimEYrLOuqk0tmD9T13vU+lwR8Vywk5X+bHrQG6t+8LWzbFYEgH50qiWi01jOQQKnHsT/XJoynA4GtdWLzgjoMrS2pQsMz+peB+i6hLBSJ63AoGBAIKOeyde0/DPZfGiLeJ80MLMtRg8DKGUb0DmxuC2ZkPxd7TehyDHea9FNLFDCsar13srFl7oqr/lwmHVzIKyrZ65Jd8H8v9rQ/j2/lW+GmxcNpEPDiXOjuthJVRcqhWFvszkuvJi4Sg4bLqQJg6QOLNCY+qAiH8gbnj5TS8Ii26hAoGAIGjoK3djUE0JUHs0xV7oSjhJvCncz3GRi1RIFCAvQ7cpTN/sequs4p/xPol8n0mf6jEwRnHqtJov9iOJUzDFzRiLYRJwpSV1Bw2mlhrTVBLROFJkk5zFhuouPaI1AMaE4ByNuiaFg20vX+n3yooVN1pCxaIqinSqlpWK1I2lzNI=",

    /** 支付宝公钥，如何获取请参考：https://opensupport.alipay.com/support/helpcenter/207/201602487431 **/
    alipayPublicKey:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAygcR+lhNG8oCUmQm3DY9YOiW1nR1lTscOF9MTUEm7Z6PNMB16NkOefCjZ58o9YHM0i+FJ5zmrIG43PjCaa1TdnKkpQ/kCw2g74xgU3G1iTsitIbum6iTCXVQu84Ho/HpaZHBTMpbxJsIlcFGLUIkgHYFHleljMAKt6x6h+IY9Sj879+CfcrPko3J15xEiFRtUh3d/nKjn+OIMcBfCAkjvMEEhdB5agScgyI9YxzgGI62jyT3+ZRFN/cenTq8vcVOK20seq+PbH8278bKBceeVf+llJhLK3N30dvAsfrS2Qnz4Q/SqnJwdLSkcpX1cAAfaXOueyiphRl9fx+SLwGhkwIDAQAB",

    /** 签名算法类型 **/
    signType: "RSA2",
  });
  const formData = new AlipayFormData();

  /** 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url;调用setMethod 并传入post，则返回from表单（不调用setMethod默认为post） **/
  formData.setMethod("get");
  formData.addField("bizContent", {
    /** 商户订单号,商户自定义，需保证在商户端不重复，如：20200612000001 **/
    OutTradeNo: "20200612000001",

    /** 销售产品码，固定值 FAST_INSTANT_TRADE_PAY **/
    ProductCode: "FAST_INSTANT_TRADE_PAY",

    /** 订单标题 **/
    Subject: "你买的到底是个啥",

    /** 订单金额，精确到小数点后两位 **/
    TotalAmount: "0.01",

    /** 订单描述 **/
    Body: "订单描述",

    //extendParams:{
    /** 系统商编号，填写服务商的PID用于获取返佣，返佣参数传值前提：传值账号需要签约返佣协议，用于isv商户。 **/
    //SysServiceProviderId: '2088****000',

    /** 花呗参数传值前提：必须有该接口花呗收款准入条件，且需签约花呗分期 **/
    /** 指定可选期数，只支持3/6/12期，还款期数越长手续费越高 **/
    // HbFqNum: '3',

    /** 指定手续费承担方式，手续费可以由用户全承担（该值为0），也可以商户全承担（该值为100），但不可以共同承担，即不可取0和100外的其他值。 **/
    // HbFqSellerPercent: '0',
    //},
  });
  formData.addField("returnUrl", "");
  formData.addField("notifyUrl", "http://localhost:3000/zfb_ret");

  const result = alipaySdk
    .exec("alipay.trade.page.pay", {}, { formData: formData })
    .then((result) => {
      /** 获取接口调用结果，如果调用失败，可根据返回错误信息到该文档寻找排查方案：https://opensupport.alipay.com/support/helpcenter/84 **/
      console.log(result);
      res.send(result);
    });
  /*
  const AlipaySdk = require("alipay-sdk").default;
  const alipaySdk = new AlipaySdk({
    appId: "2021004108634061",
    // keyType: 'PKCS1', // 默认值。请与生成的密钥格式保持一致，参考平台配置一节
    privateKey:
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCAM8MhsVW2Gl23NAJ/1WWryTZUQbhI/SNsELDjLxmO0kwryTJATB4T1WWdvoRmwrrJ3XKs/8d0aBd9+q6PE13/n1SvSyWh4/UNO+74isOa5v+dWTIfhKBgBTGHsZeFRbJI5Xnf+BTIxUOee18Jr3KjOqX3lF/UwpMxfg21PtL6SUsL/qYvk7XchZtFJ9txC3TQveN3xJL0ic5DDV8EnY00o/HtRSjJcRxryamfnlZJkmnCH49XJrMG706iRDTyLe38qoZqHBXudmaf9VVArMlDbgNVWi8yqGMF1pL0cLcHoslcVGiyXFe68zm45na6HjdJtPFE5z8DXhdJKqTS+JozAgMBAAECggEALZW6MZXDu0+euRDGPrwbPbz7E3SW2WUhHkDFFNLfjJgcO4l70779BuJfEnr2yy88iaCzMO519l840zO6s+cYCleWHgpjZDARJ1aDP17f9IlkpIddujVHbT0LgotULDA/F4p5DnlAsq7pv0Vw4pm+8mldMC5S8O0Kt5NxvluLWzEHaIU7CLzI2dBBrK++19+IyeU+Gfnx/WwLeQGnKprBhucKXHj146PH/tXppyvElp8iZNdHtub7sg67VpMEbeJdW4MkbYoXYAkU7kMdiPmomnExlyX0YX7fVn/9hrLiftx+CAZH/1A+JngVEwWPljk3r1JmzdzYONLh5R5KtqRTYQKBgQDaTsxF1WLmQoOJJfIHfodAtfBZEMwSdn6N1lfRKD1QyvXsDc9QK1lZ9VbJJ01sajrR0jO+R21w3ZaemN8ew/lV8LYtqaz5cwgWJdUYvCpQdH/dOMdPiIjemmcDZOEv6xXFHTLKLXYzvPn9pMfwbUzIS0NgX4JT+rS3oRA+GC/JwwKBgQCWVkwvy7rfdVj7/1BrIwlBU6dSRhnYC1/uQD+nUqjwHu1A+GqU8zEV77LzfD6MUFge4sv8JTcMmxDZBWGVCJe3IGpVeHBgJEmI2hi5cjSQ3azh5cgxSI5l2nQp28ZmNk0uB9NpZY3atabvTF69ieD6txn5vaQKgvQRjyncKud20QKBgGzsIfm55TWT/EMivqbEl8FOxdP6kIepva0RRBGkrSsxiRA1N7n9VwCOa7XDuVqdiimEYrLOuqk0tmD9T13vU+lwR8Vywk5X+bHrQG6t+8LWzbFYEgH50qiWi01jOQQKnHsT/XJoynA4GtdWLzgjoMrS2pQsMz+peB+i6hLBSJ63AoGBAIKOeyde0/DPZfGiLeJ80MLMtRg8DKGUb0DmxuC2ZkPxd7TehyDHea9FNLFDCsar13srFl7oqr/lwmHVzIKyrZ65Jd8H8v9rQ/j2/lW+GmxcNpEPDiXOjuthJVRcqhWFvszkuvJi4Sg4bLqQJg6QOLNCY+qAiH8gbnj5TS8Ii26hAoGAIGjoK3djUE0JUHs0xV7oSjhJvCncz3GRi1RIFCAvQ7cpTN/sequs4p/xPol8n0mf6jEwRnHqtJov9iOJUzDFzRiLYRJwpSV1Bw2mlhrTVBLROFJkk5zFhuouPaI1AMaE4ByNuiaFg20vX+n3yooVN1pCxaIqinSqlpWK1I2lzNI=",
    alipayPublicKey:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAygcR+lhNG8oCUmQm3DY9YOiW1nR1lTscOF9MTUEm7Z6PNMB16NkOefCjZ58o9YHM0i+FJ5zmrIG43PjCaa1TdnKkpQ/kCw2g74xgU3G1iTsitIbum6iTCXVQu84Ho/HpaZHBTMpbxJsIlcFGLUIkgHYFHleljMAKt6x6h+IY9Sj879+CfcrPko3J15xEiFRtUh3d/nKjn+OIMcBfCAkjvMEEhdB5agScgyI9YxzgGI62jyT3+ZRFN/cenTq8vcVOK20seq+PbH8278bKBceeVf+llJhLK3N30dvAsfrS2Qnz4Q/SqnJwdLSkcpX1cAAfaXOueyiphRl9fx+SLwGhkwIDAQAB",
  });
  const result = await alipaySdk.exec("alipay.trade.page.pay"); //("alipay.open.public.qrcode.create");
  console.log(result);
  */
  /*
  const crypto = require("crypto");

  const privateKey =
    "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCAM8MhsVW2Gl23NAJ/1WWryTZUQbhI/SNsELDjLxmO0kwryTJATB4T1WWdvoRmwrrJ3XKs/8d0aBd9+q6PE13/n1SvSyWh4/UNO+74isOa5v+dWTIfhKBgBTGHsZeFRbJI5Xnf+BTIxUOee18Jr3KjOqX3lF/UwpMxfg21PtL6SUsL/qYvk7XchZtFJ9txC3TQveN3xJL0ic5DDV8EnY00o/HtRSjJcRxryamfnlZJkmnCH49XJrMG706iRDTyLe38qoZqHBXudmaf9VVArMlDbgNVWi8yqGMF1pL0cLcHoslcVGiyXFe68zm45na6HjdJtPFE5z8DXhdJKqTS+JozAgMBAAECggEALZW6MZXDu0+euRDGPrwbPbz7E3SW2WUhHkDFFNLfjJgcO4l70779BuJfEnr2yy88iaCzMO519l840zO6s+cYCleWHgpjZDARJ1aDP17f9IlkpIddujVHbT0LgotULDA/F4p5DnlAsq7pv0Vw4pm+8mldMC5S8O0Kt5NxvluLWzEHaIU7CLzI2dBBrK++19+IyeU+Gfnx/WwLeQGnKprBhucKXHj146PH/tXppyvElp8iZNdHtub7sg67VpMEbeJdW4MkbYoXYAkU7kMdiPmomnExlyX0YX7fVn/9hrLiftx+CAZH/1A+JngVEwWPljk3r1JmzdzYONLh5R5KtqRTYQKBgQDaTsxF1WLmQoOJJfIHfodAtfBZEMwSdn6N1lfRKD1QyvXsDc9QK1lZ9VbJJ01sajrR0jO+R21w3ZaemN8ew/lV8LYtqaz5cwgWJdUYvCpQdH/dOMdPiIjemmcDZOEv6xXFHTLKLXYzvPn9pMfwbUzIS0NgX4JT+rS3oRA+GC/JwwKBgQCWVkwvy7rfdVj7/1BrIwlBU6dSRhnYC1/uQD+nUqjwHu1A+GqU8zEV77LzfD6MUFge4sv8JTcMmxDZBWGVCJe3IGpVeHBgJEmI2hi5cjSQ3azh5cgxSI5l2nQp28ZmNk0uB9NpZY3atabvTF69ieD6txn5vaQKgvQRjyncKud20QKBgGzsIfm55TWT/EMivqbEl8FOxdP6kIepva0RRBGkrSsxiRA1N7n9VwCOa7XDuVqdiimEYrLOuqk0tmD9T13vU+lwR8Vywk5X+bHrQG6t+8LWzbFYEgH50qiWi01jOQQKnHsT/XJoynA4GtdWLzgjoMrS2pQsMz+peB+i6hLBSJ63AoGBAIKOeyde0/DPZfGiLeJ80MLMtRg8DKGUb0DmxuC2ZkPxd7TehyDHea9FNLFDCsar13srFl7oqr/lwmHVzIKyrZ65Jd8H8v9rQ/j2/lW+GmxcNpEPDiXOjuthJVRcqhWFvszkuvJi4Sg4bLqQJg6QOLNCY+qAiH8gbnj5TS8Ii26hAoGAIGjoK3djUE0JUHs0xV7oSjhJvCncz3GRi1RIFCAvQ7cpTN/sequs4p/xPol8n0mf6jEwRnHqtJov9iOJUzDFzRiLYRJwpSV1Bw2mlhrTVBLROFJkk5zFhuouPaI1AMaE4ByNuiaFg20vX+n3yooVN1pCxaIqinSqlpWK1I2lzNI=";
  const signParam = {
    timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    method: "alipay.trade.create",
    app_id: "2021004108634061",
    sign_type: "RSA2",
    biz_content: JSON.stringify({
      total_amount: "10.08",
      buyer_id: "2088123456781234",
      discount_amount: "",
    }),
  };
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(qs.stringify(signParam));
  const signature = sign.sign(privateKey, "base64");

  const bizContent = JSON.stringify({
    out_trade_no: "20150320010101001",
    total_amount: "88.88",
    subject: "商品名称",
    product_code: "FAST_INSTANT_TRADE_PAY",
  });
  const param = {
    app_id: "2021004108634061",
    method: "alipay.trade.page.pay",
    charset: "utf-8",
    sign_type: "RSA2",
    sign: signature,
    timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    version: "1.0",
    biz_content: bizContent,
  };

  const options = {
    hostname: "openapi.alipay.com",
    port: 443, //https:443,http:80
    path: "/gateway.do?" + qs.stringify(param),
    method: "GET",
  };

  const reqq = https.request(options, (ress) => {
    ress.setEncoding("utf8");
    let data = "";
    ress.on("data", (chunk) => {
      data += chunk;
      console.log(`响应主体：${chunk}`);
    });
    ress.on("end", () => {
      res.send(data);
      console.log("响应中已无数据。");
    });
  });
  reqq.on("error", (error) => {
    console.error("An error occurred:", error);
  });
  reqq.write(param);
  reqq.end();
  */
});

router.get("/zfb_ret", function (req, res, next) {
  console.log("支付成功");
  console.log(req);
});

router.get("/test", function (req, res, next) {
  const options = {
    hostname: "192.168.101.101",
    port: 3000, //https:443,http:80
    path: "/test",
    method: "GET",
  };
  const reqq = http.request(options, (ress) => {
    ress.setEncoding("utf8");
    let data = "";
    ress.on("data", (chunk) => {
      data += chunk;
      console.log(`响应主体：${chunk}`);
    });
    ress.on("end", () => {
      res.send(data);
      console.log("响应中已无数据。");
    });
  });
  reqq.on("error", (error) => {
    console.error("An error occurred:", error);
  });
  reqq.end();
});

module.exports = router;
