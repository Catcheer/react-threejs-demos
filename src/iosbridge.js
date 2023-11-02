/**
 * @fileoverview iOS用bridge
 */
import $ from 'jquery';

var mdSmartios = mdSmartios || {};
(function(mdSmartios) {
    if (mdSmartios.bridge) {
        console.log("mdSmartios.bridge is already defined.");
        return;
    }
    mdSmartios.bridge = mdSmartios.bridge || {};

    mdSmartios.bridge.storage={};

    /*
        通用的接口，operation（string）表示功能类型，params（JSON）表示传参
    */
    mdSmartios.bridge.commandInterface = function(operation, params, callback, callbackFail) {
        var param = {};
        param.operation = operation;
        param.params = params;
        param.cammandId = Math.floor(Math.random() * 10000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('commandInterface', p);
        return commandId;
    };

    mdSmartios.bridge.popupGeneralList = (param) => {
        return new Promise((reslove, reject) => {
            mdSmartios.bridge.commandInterface('popupGeneralList', param, (res) => {
                reslove(res);
            }, (error) => {
                reslove(error);
            });
        })
    };

    /**
     * burialPoint埋点接口
     * @param
     * param = {
     *   "widget_version": '1.0.0',
     *   "action_type":'common',
     *   "widget_name": "AC_"+deviceBarCode,
     *   "page_ame":"controlpanelPage",
     *   "prev_page_name":"mideaHomePage",
     *   "sub_action":"page_view",
     *   "load_duration":time,
     *   "action_result": ''
        }
     */

    mdSmartios.bridge.burialPoint = function(param, callback, callbackFail) {
        mdSmartios.bridge.commandInterface('burialPoint', param, callback && callback, callbackFail && callbackFail);
    };

    /** 7.1埋点
     * @param
     * param: {
        "operation":"trackEvent",
        "event":"xxxxxxx",
        "eventParams": {
            "param_1":"xxxxx",
            "param_2":123456
            }
        }
     */
    mdSmartios.bridge.trackEvent = function(param, callback, callbackFail) {
        mdSmartios.bridge.commandInterface('trackEvent', param, callback && callback, callbackFail && callbackFail);
    };

    /*
      子设备透传接口
    */
    mdSmartios.bridge.startCmdV2Process = function(messageBody, callback, callbackFail) {
        var param = {};
        param.messageBody = messageBody;
        param.cammandId = Math.floor(Math.random() * 10000);
        // alert("startcmdprocessV2 cammandId: " + param.cammandId)
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('startCmdV2Process', p);
        return commandId;
    };

    /*
     *发送消息  2017-09-25 门锁
     * param = {
        type: "",  // 1 微信   2 QQ   3  短信
        msg: "",  //消息内容
        cammandId: ""
      }
     */
    mdSmartios.bridge.sendMessage = function(param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('sendMessage', p);

        return commandId;
    };

    /* H5调用原生拨打手机号
     * param = {
        phoneNumber: "", //手机号码
        cammandId: ""
     }
    */
    mdSmartios.bridge.makingCall = function(param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('makingCall', p);

        return commandId;
    };

    /* 跳转到子设备展示页面 2017-09-28
        applianceCode 子设备id
    */
    mdSmartios.bridge.jumpSubdevicePage = function(callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('jumpSubdevicePage', p);

        return commandId;
    };

    /* 获取zigbee设备子类型 */
    mdSmartios.bridge.getSubdeviceType = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 10000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getSubdeviceType', p);

        return commandId;
    };

    /* H5通过原生发送云端接口网络请求（mini网关） */
    /*  eg:
        params = {
            "url": "gateway/subdevice/list",
            "params": {
                "nodeId":xxx,
                "applianceId": xxx
            }
        }
    */
    mdSmartios.bridge.nativeNetService = function(param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        if (param.url == undefined) {
            param.url = "";
        }
        if (param.params == undefined) {
            param.params = {};
        }
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('nativeNetService', p);

        return commandId;
    };

    /*设置设备名称*/
    mdSmartios.bridge.setApplianceName = function(name, callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 100000);
        param.name = name;
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('setApplianceName', p);

        return commandId;
    };

    /*AES128解密*/
    mdSmartios.bridge.decodeAES128 = function(code, callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 100000);
        param.code = code;
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('decodeAES128', p);

        return commandId;
    };

    /**
     * H5 调用APP,取得家电SN
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getDeviceSN = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getDeviceSN', p);

        return commandId;
    };

    /**
     * H5 调用APP,取得家电id
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getApplianceID = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceID', p);

        return commandId;
    };

    /**
     * 存储数据到app内存中(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */

    mdSmartios.bridge.setterValToStorage = function(key,value) {
        var p={};
        p[key]=value;
        mdSmartios.bridge.storage[key]= value;
        return  mdSmartios.bridge.po._execObjcMethod('setterVal',JSON.stringify(p));
    };

    /**
     * 从app内存中取得数据(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getterValFromStorage = function(keyName, callback, callbackFail) {
        var param = {};
        param.keyName = keyName;
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getterVal', p);

        return commandId;
    };

    /**
     * 处理从app内存中取数据的回调(WebView>JS)
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */


    mdSmartios.bridge.putValueToStorage = function(keyName,value) {
        console.log("putValueToStorage: "+keyName+ " : "+value);
        mdSmartios.bridge.storage[keyName]=value;
    };

    mdSmartios.bridge.setValueToStorageValues = function(value){
        var jsLocalStorageJsonObj = JSON.parse(value);
        for(var key in jsLocalStorageJsonObj){
            mdSmartios.bridge.storage[key] = jsLocalStorageJsonObj[key];
        }
    }

    /**
     * H5 调用APP,取得家电子类型
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getApplianceSubtype = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceSubtype', p);

        return commandId;
    };

    /**
     * 启动/关闭语音识别模式
     */
    mdSmartios.bridge.setEnableVoice = function(onOff, callback, callbackFail) {
        var param = {};
        param.onOff = onOff;
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('setEnableVoice', p);

        return commandId;
    };

    /**
     * 判断是否开启语音识别模式
     */
    mdSmartios.bridge.getEnableVoice = function(callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getEnableVoice', p);

        return commandId;
    };

    /**
     *  H5 调用APP,开启播报语音
     * @param {String} message 需要播报的语音文本
     */
    mdSmartios.bridge.startSpeaking = function(message) {
        console.log("function:mdSmartios.bridge.startSpeaking");
        var p = JSON.stringify({
            message : message
        });
        mdSmartios.bridge.po._execObjcMethod('startSpeaking', p);
    };

    /**
     *  H5 调用APP,暂停语音播报
     */
    mdSmartios.bridge.pauseSpeaking = function() {
        console.log("function:mdSmartios.bridge.pauseSpeaking");
        mdSmartios.bridge.po._execObjcMethod('pauseSpeaking');
    };

    /**
     *  H5 调用APP,恢复语音播报
     */
    mdSmartios.bridge.resumeSpeaking = function() {
        console.log("function:mdSmartios.bridge.resumeSpeaking");
        mdSmartios.bridge.po._execObjcMethod('resumeSpeaking');
    };

    /**
     *  H5 调用APP,停止语音播报
     */
    mdSmartios.bridge.stopSpeaking = function() {
        console.log("function:mdSmartios.bridge.stopSpeaking");
        mdSmartios.bridge.po._execObjcMethod('stopSpeaking');
    };

    /**
     * 返回前页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                    -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.goBack = function() {
        console.log("function:mdSmartios.bridge.goBack");
        return mdSmartios.bridge.po._execObjcMethod('goBack');
    };

    /**
     * 显示家电信息页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.goInfoPage = function() {
        console.log("function:mdSmartios.bridge.goInfoPage");
        return mdSmartios.bridge.po._execObjcMethod('goInfoPage');
    };

    /**
     * 显示控制面板页(JS->WebView）
     * @param {json} pageParamers 控制面板页的启动参数,例如：{key1:value1,key2:value2}
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showControlPanelPage = function(pageParamers) {
        console.log("function:mdSmartios.bridge.showControlPanelPage");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        return mdSmartios.bridge.po._execObjcMethod('showControlPanelPage', p);
    };

    /**
     * 友盟分享(JS->WebView）
     * @param {json} pageParamers  分享的参数
     * @return {Number} 処理結果
     *                    0 : 分享成功
     *                   -1 : 分享失败
     *
     */
    mdSmartios.bridge.UMengshare = function (pageParamers, callback, callbackFail) {
        console.log("function:mdSmartios.bridge.UMengshare");
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        param.pageParameters = pageParamers
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        // var p = JSON.stringify({
        //     pageParameters: pageParamers
        // });

        return mdSmartios.bridge.po._execObjcMethod('UMengshare', p);
    };

    /**
     *  H5 调用APP,友盟打点
     * @param {String} eventLabel 事件标签，友盟限制最多1000个取值，不允许统计类似搜索关键词、网页链接等随机生成的字符串信息
     */
    mdSmartios.bridge.UMengevent = function(eventLabel) {
        console.log("function:mdSmartios.bridge.UMengevent");
        var p = JSON.stringify({
            eventLabel : eventLabel
        });
        mdSmartios.bridge.po._execObjcMethod('UMengevent', p);
    };

    //扫描小米手环
    mdSmartios.bridge.MiScan = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.MiScan");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setMiScanAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('MiScan', p);

    };

    //返回mac地址值 {key1:value1,key2:value2}
    mdSmartios.bridge.setMiScanAction = undefined;
    mdSmartios.bridge.setMiScanBack = function(message) {

        if ( typeof mdSmartios.bridge.setMiScanAction == "function") {

            mdSmartios.bridge.setMiScanAction(message);
        }
    };


    //授权登录
    mdSmartios.bridge.MiLogin = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.MiLogin");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setMiLoginAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('MiLogin', p);

    };

    //返回值  {key1:value1,key2:value2}
    mdSmartios.bridge.setMiLoginAction = undefined;
    mdSmartios.bridge.setMiLoginBack = function(message) {

        if ( typeof mdSmartios.bridge.setMiLoginAction == "function") {

            mdSmartios.bridge.setMiLoginAction(message);
        }
    };

    //删除手环
    mdSmartios.bridge.MiDelete = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.MiDelete");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });

        mdSmartios.bridge.setMiDeleteAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('MiDelete', p);

    };

    //返回值  {"result":@"YES"} YES成功 NO失败
    mdSmartios.bridge.setMiDeleteAction = undefined;
    mdSmartios.bridge.setMiDeleteBack = function(message) {

        if ( typeof mdSmartios.bridge.setMiDeleteAction == "function") {

            mdSmartios.bridge.setMiDeleteAction(message);
        }
    };

    //侧面小米手环
    mdSmartios.bridge.MiMenu = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.MiMenu");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setMiMenuAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('MiMenu', p);

    };

    //返回值 {"result":"YES","haveMac":"YES","haveMiLogin":"YES"} 有内容的时候加上具体的内容
    mdSmartios.bridge.setMiMenuAction = undefined;
    mdSmartios.bridge.setMiMenuBack = function(message) {

        if ( typeof mdSmartios.bridge.setMiMenuAction == "function") {

            mdSmartios.bridge.setMiMenuAction(message);
        }
    };

    //保存本地数据
    mdSmartios.bridge.MiSaveData = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.MiSaveData");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setMiSaveDataAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('MiSaveData', p);

    };

    //返回值  {"result":@"YES"} YES成功 NO失败
    mdSmartios.bridge.setMiSaveDataAction = undefined;
    mdSmartios.bridge.setMiSaveDataBack = function(message) {

        if ( typeof mdSmartios.bridge.setMiSaveDataAction == "function") {

            mdSmartios.bridge.setMiSaveDataAction(message);
        }
    };

    //蓝牙固件升级
    mdSmartios.bridge.FirmwareUpdate = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.FirmwareUpdate");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setFirmwareUpdateAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('FirmwareUpdate', p);

    };

    //返回值  {"result":@"YES"} YES成功 NO失败
    mdSmartios.bridge.setFirmwareUpdateAction = undefined;
    mdSmartios.bridge.setFirmwareUpdateBack = function(message) {

        if ( typeof mdSmartios.bridge.setFirmwareUpdateAction == "function") {

            mdSmartios.bridge.setFirmwareUpdateAction(message);
        }
    };


    //查询固件升级进度
    mdSmartios.bridge.MiUpgradeProgress = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.MiUpgradeProgress");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setMiUpgradeProgressAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('MiUpgradeProgress', p);

    };

    //返回值  {"result":@"YES","progress":"50"} YES成功 NO失败， progress 进度值
    mdSmartios.bridge.setMiUpgradeProgressAction = undefined;
    mdSmartios.bridge.setMiUpgradeProgressBack = function(message) {

        if ( typeof mdSmartios.bridge.setMiUpgradeProgressAction == "function") {

            mdSmartios.bridge.setMiUpgradeProgressAction(message);
        }
    };

    //获取当前语言
    mdSmartios.bridge.getLanguage = function(pageParamers,callback) {
        console.log("function:mdSmartios.bridge.getLanguage");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        mdSmartios.bridge.setLanguageAction =callback;
        return mdSmartios.bridge.po._execObjcMethod('getLanguage', p);

    };
    //Chinese English Japanese
    //返回当前语言 {"language":"English"}
    mdSmartios.bridge.setLanguageAction = undefined;
    mdSmartios.bridge.setLanguageBack = function(message) {

        if ( typeof mdSmartios.bridge.setLanguageAction == "function") {

            mdSmartios.bridge.setLanguageAction(message);
        }
    };

    /**
     * 取得显示控制面板页的参数(JS->WebView）
     * @return {json}
     */
    mdSmartios.bridge.getPageParameters = function() {
        console.log('function:mdSmartios.bridge.getPageParameters');
        var param = {};
        var p = JSON.stringify(param);
        var pageParameters = mdSmartios.bridge.po._execObjcMethod('getPageParameters', p);
        var jsonResult = JSON.parse(pageParameters);
        return jsonResult.pageParameters;
    };

    /**
     * 显示控制面板页(JS->WebView）
     * @param {String} controlPanelName 控制面板页的页面文件名，例如：controlPanel02
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showNamedControlPanelPage = function(controlPanelName) {
        console.log("function:mdSmartios.bridge.showNamedControlPanelPage");
        var p = JSON.stringify({
            controlPanelName : controlPanelName + '.html'
        });
        return mdSmartios.bridge.po._execObjcMethod('showControlPanelPage', p);
    };

    /**
     * 向iOS写log(JS->WebView）
     * @param {String} logContent log内容
     */
    mdSmartios.bridge.logToIOS = function(logContent) {
        console.log("function:mdSmartios.bridge.logToIOS");
        return mdSmartios.bridge.po._execObjcMethod('logToIOS', logContent);
    };

    /*
     * 取得网络类型
     * return LAN或WAN
     */
    mdSmartios.bridge.getNetType = function() {
        console.log("function:mdSmartios.bridge.getNetType");
        return mdSmartios.bridge.po._execObjcMethod('getCommunicationMethod');
    };

    /*
     * 取得卡片页在同类卡片中的顺序
     * return 0:第1、3、5...，1:第2、4、6...
     */
    mdSmartios.bridge.getCardOrder = function() {
        console.log("function:mdSmartios.bridge.getCardOrder");
        return mdSmartios.bridge.po._execObjcMethod('getCardOrder');
    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备SN
     * return 取得设备SN
     */
    mdSmartios.bridge.getCurrentDevSN = function() {
        console.log("function:mdSmartios.bridge.getCurrentDevSN");
        return mdSmartios.bridge.retSnValue || mdSmartios.bridge.po._execObjcMethod('getCurrentDevSN');
    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备SN
     * 设置sn
     */
    mdSmartios.bridge.setSnValue = function(retObjcValue) {

        mdSmartios.bridge.retSnValue = retObjcValue;

    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备子类型
     * 设置子类型
     */
    mdSmartios.bridge.setcurrentApplianceSubtype = function(retObjcValue) {

        mdSmartios.bridge.currentApplianceSubtype = retObjcValue;

    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备id
     * 设置设备id
     */
    mdSmartios.bridge.setApplicationIdValue = function(retObjcValue) {

        mdSmartios.bridge.applicationId = retObjcValue;

    };

    /**
     * 取家电协议版本(JS->WebView）
     * @return {Number} 家电协议版本
     */
    mdSmartios.bridge.getApplianceProtocolVersion = function() {
        console.log("function:mdSmartios.bridge.getApplianceProtocolVersion");
        return mdSmartios.bridge.po._execObjcMethod('getApplianceProtocolVersion');
    };

    /**
     * 显示家电信息入口页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showApplianceInfoEntryPage = function() {
        console.log("function:mdSmartios.bridge.showApplianceInfoEntryPage");
        return mdSmartios.bridge.po._execObjcMethod('showApplianceInfoEntryPage');
    };

    /**
     * 显示家电信息页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showApplianceInfoPage = function() {
        console.log("function:mdSmartios.bridge.showApplianceInfoPage");
        return mdSmartios.bridge.po._execObjcMethod('showApplianceInfoPage');
    };

    /**
     * 显示消息中心页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showInfoCenterPage = function() {
        console.log("function:mdSmartios.bridge.showInfoCenterPage");
        return mdSmartios.bridge.po._execObjcMethod('showInfoCenterPage');
    };

    /**
     * 开始异步处理的命令
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.startCmdProcess = function(messageBody, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcess: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }

        var commandId = mdSmartios.bridge.startCmdProcessGo(param);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

        var isQuery=true;
        switch(messageBody[2]){
            case 0xea:
            case 0xeb:
            case 0xec:
            case 0xed:
            case 0xef:
                if((messageBody[18]<<8|messageBody[17])==50002){
                    isQuery=true;
                }else{
                    isQuery=false;
                }
                break;
            default:
                if(messageBody[9]==3){
                    isQuery=true;
                }else{
                    isQuery=false;
                }
        }
//keane 指令失败函数自定义
//        if(!isQuery){
//            if(typeof callbackFail != "function"){
//                callbackFail=function(){};
//            }
//        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        }


        return commandId;
    };

    /**
     * 开始异步处理的命令 可自定义Loading是否显示
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @param {bool} isLoading 是否显示loading阻塞界面
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.startCmdProcessCustomLoading = function(messageBody,isLoading, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcess: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;

        }

        if(isLoading != undefined){
            param.isLoading = isLoading;
        }

        var commandId = mdSmartios.bridge.startCmdProcessGo(param);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

//        if(typeof callbackFail != "function"){
//            callbackFail=function(){};
//        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        }

        return commandId;
    };

    /**
     * 开始异步处理的命令 真实发送接口
     * @param {intArray} param 发送的数据
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */

    mdSmartios.bridge.startCmdProcessGo = function(param) {
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('startCmdProcess', p);
        return commandId;

    };


    /**
     * 针对管家插件 开始异步处理的命令
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} param 发送的数据
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1    : 处理失败
     */

    mdSmartios.bridge.startCmdProcessExt = function(messageBody, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcessExt: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('startCmdProcessExt', p);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

        if(typeof callbackFail != "function"){
            callbackFail=function(){};
        }
        mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        return commandId;
    };


    /**
     * 取消命令执行
     * @param {Number} commandId 命令ID
     * @return void
     * @note 不是处理中的时候,忽略
     */
    mdSmartios.bridge.stopCmdProcess = function(commandId) {
        console.log('function:mdSmartios.bridge.stopCmdProcess: commandId=' + commandId);
        var p = JSON.stringify({
            commandId : commandId
        });
        mdSmartios.bridge.po._execObjcMethod('stopCmdProcess', p);
    };

    /**
     * 取得命令执行状态
     * @param {Number} commandId 命令ID
     * @return {JSONObject} 命令执行状态
     *         {Number} .status 命令执行状态
     *                     0 : 未开始
     *                     1 : 进行中
     *                     2 : 结束
     *                    -1 : 异常
     *                    -2 : 取消
     *         {String} .errMessage 异常信息
     */
    mdSmartios.bridge.getCmdProcessInfo = function(commandId) {
        console.log('function:mdSmartios.bridge.getCmdProcessInfo: commandId=' + commandId);
        var p = JSON.stringify({
            commandId : commandId
        });
        return mdSmartios.bridge.po._execObjcMethod('getCmdProcessInfo', p);
    };

    /**
     * 取得卡片头部Tilte信息
     * @param {String} callback 处理成功后的回调函数
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getCardTitle = function(callback) {
        console.log('function:mdSmartios.bridge.getCardTitle: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.setCardTitleCBF = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getCardTitle', p);
        return commandId;
    };

    /**
     * 取得插件版本信息
     * @param {String} callback 处理成功后的回调函数
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getPlugVersion = function() {
        console.log('function:mdSmartios.bridge.getPlugVersion');
        var param = {};
        var p = JSON.stringify(param);
        var version = mdSmartios.bridge.po._execObjcMethod('getPlugVersion', p);
        return version;
    };

    //配置文件
    mdSmartios.bridge.getConfigInfo = function(cmdParamers,callback) {
        console.log('function:mdSmartios.bridge.getConfigInfo: callback=' + callback);
        //var param = {"fileName":"0xDB"};
        cmdParamers.cammandId = Math.floor(Math.random() * 10000000);
        var commandId = cmdParamers.cammandId;
        var p = JSON.stringify(cmdParamers);
        if ( typeof callback == "function") {
            mdSmartios.bridge.setConfigInfoCBF[commandId] = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getConfigInfo', p);
        return commandId;

    };

    mdSmartios.bridge.setConfigInfoCBF = {};
    mdSmartios.bridge.setConfigInfo = function(retObjcValue,message) {
        // var jsonResult = JSON.parse(message);
        var cbf = mdSmartios.bridge.setConfigInfoCBF[retObjcValue];

        if ( typeof cbf == "function") {
            //mdSmartios.bridge.setConfigInfoCBF(jsonResult.messageBody);
            cbf(message);
        }
        delete mdSmartios.bridge.setConfigInfoCBF[retObjcValue];
    };

    //配置文件排序
    mdSmartios.bridge.getSort = function(callback) {
        console.log('function:mdSmartios.bridge.getSort: callback=' + callback);
        var param = {
            "isWritestr":0,
            "fileName":"cycleArray"
        };
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.setSortCBF = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getSort', p);
        return commandId;
    };

    mdSmartios.bridge.setSortCBF = undefined;
    mdSmartios.bridge.setSort = function(message) {
        if ( typeof mdSmartios.bridge.setSortCBF == "function") {
            mdSmartios.bridge.setSortCBF(message);
        }
    };


    /**
     * 取得语言Code
     * @return {String} 语言Code
     *                    zh : 中国语
     *                    en : 英语
     */
    mdSmartios.bridge.getLangCode = function() {
        console.log('function:mdSmartios.bridge.getLangCode');
        var param = {};
        var p = JSON.stringify(param);

        var langCode = mdSmartios.bridge.po._execObjcMethod('getLangCode', p);

        if (langCode == undefined || langCode == 0 || langCode.length == 0) {
            langCode = "zh";
        }
        return langCode;
    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得当前家电id
     * return 取得当前家电id
     */
    mdSmartios.bridge.getCurrentApplianceID = function() {
        //var currentApplicanceID = mdSmartios.bridge.po._execObjcMethod('getCurrentApplianceID');

        return mdSmartios.bridge.applicationId || mdSmartios.bridge.po._execObjcMethod('getCurrentApplianceID');
    };

    /**
     * 取得当前家电子类型
     * @return {String}
     */
    mdSmartios.bridge.getCurrentApplianceSubtype = function() {

        return mdSmartios.bridge.currentApplianceSubtype;
    };

    /**
     * Clear WebView Cache
     * @return void
     */
    mdSmartios.bridge.clearWebViewCache = function() {
        console.log('function:mdSmartios.bridge.clearWebViewCache');
        mdSmartios.bridge.po._execObjcMethod('clearWebViewCache');
    };
    mdSmartios.bridge.callbackFunctions = {};
    mdSmartios.bridge.callbackFailFunctions = {};
    mdSmartios.bridge.setCardTitleCBF = undefined;
    //卡片的标题(IOS调用：回复getCardTitle)
    mdSmartios.bridge.setCardTitle = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.setCardTitleCBF == "function") {
            mdSmartios.bridge.setCardTitleCBF(jsonResult.messageBody);
        }
        $('#loadingPopup>span').html(jsonResult.messageBody);
    };
    //设备主动上报的消息(IOS调用：主动发起)
    //电控主动上报
    mdSmartios.bridge.recieveMessage = function(message) {
        var jsonResult = JSON.parse(message);
        if(jsonResult.deviceId) {
            $.event.trigger("recieveMessage", [jsonResult]);
        } else {
            $.event.trigger("recieveMessage", [jsonResult.messageBody]);
        }
    };

    /**
     * APP主动触发JS事件 - 2018/04/10
     * @return {JSONObject} message APP向JS传递的JSON对象
     *         {
     *              messageType: {string} H5用来判断消息类型，然后做相对应的处理
     *              messageBody: {....} APP传递的JSON对象
     *         }
     */
    mdSmartios.bridge.receiveMessageFromApp = function (message) {
        var jsonResult = message
        try {
            jsonResult = JSON.parse(jsonResult);
        } catch (error) {
        }
        $.event.trigger("receiveMessageFromApp", [jsonResult]);
    };

    //lua主动上报
    mdSmartios.bridge.luaRecieveMessage = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("luaRecieveMessage", [jsonResult.messageBody]);
    };

    //门锁 主动上报
    mdSmartios.bridge.recieveMessageV2 = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("recieveMessageV2", [jsonResult.messageBody]);
    };

    mdSmartios.bridge.recieveAPNS = function(message) {
        var jsonTemp = JSON.parse(message);
        var messageBody = JSON.stringify(jsonTemp.messageBody);
        $.event.trigger("recieveAPNS", messageBody);
    };

    //设备返回的消息(IOS调用：主动发起)
    mdSmartios.bridge.updateCard = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("updateCard", [jsonResult.messageBody]);
    };

    mdSmartios.bridge.update = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("updateCard", [jsonResult.messageBody]);
    };

    //更新界面时机(针对管家插件 单品跳转后返回时机)
    mdSmartios.bridge.updatePlug = function() {
        $.event.trigger("updatePlug");
    };

    //直接返回值(IOS赋值：回复JS所有类型请求（startCmdProcess：命令id，getLangCode：语言code）)
    mdSmartios.bridge.retObjcValue = 0;

    mdSmartios.bridge.retSnValue = "";

    mdSmartios.bridge.applicationId = "";

    mdSmartios.bridge.currentApplianceSubtype = "";

    /*
     *指定命令的回复电文(IOS调用：回复startCmdProcess)
     *@param (int) retObjcValue 命令id
     *       (String) result 回复
     *                result.messageBody 回复电文
     *                result.errCode 错误码
     *                             1 超时   -1 查询超时
     *                result.errMessage 错误信息
     */
    mdSmartios.bridge.callbackFunction = function(retObjcValue, result) {
        console.log('callbackFunction result', retObjcValue, result)
        var jsonResult = result;
        if (typeof jsonResult === 'string') {
            try {
                jsonResult = JSON.parse(jsonResult);
            } catch (error) {
                console.error('callbackFunction parse error', retObjcValue, error)
            }
        }
        var cbf = mdSmartios.bridge.callbackFunctions[retObjcValue];
        var cbff = mdSmartios.bridge.callbackFailFunctions[retObjcValue];
        if (jsonResult.errCode !== undefined && jsonResult.errMessage == 'TimeOut') {
            if(jsonResult.errCode==-1){
                if(window.location.href.indexOf('card')!=-1){
                   mdSmartios.bridge.logToIOS('Jump to cardDisconnect.html.');
                    window.location.href='cardDisconnect2.html';
                }
            }else{
                //keane 指令失败函数自定义 Mod S
                if (typeof cbff == "function") {
                    cbff(-1);//表示指令超时 －1
                }
                if(jsonResult.isAction == 1) {
                    // 控制超时才弹出提示
                   mdSmartios.bridge.popupTimeOut();
                }
                //keane 指令失败函数自定义 Mod E
            }
        } else {
            if ( typeof cbf == "function") {
                cbf(jsonResult.messageBody || jsonResult);
            }
        }
        delete mdSmartios.bridge.callbackFunctions[retObjcValue];
        delete mdSmartios.bridge.callbackFailFunctions[retObjcValue];
    };


    /**
     *  加载在线情况，显示和隐藏loading界面
     *
     */
    //var loadingDiv = document.createElement("DIV");
    //loadingDiv.id = 'loadingPopup';
    //var loadingSpan = document.createElement("SPAN");
    //loadingDiv.appendChild(loadingSpan);
    //var loadingP = document.createElement("P");
    //loadingDiv.appendChild(loadingP);
    ////var rotateImg=document.createElement('IMG');
    ////rotateImg.src='../common/images/icon_loading.png';
    ////loadingDiv.appendChild(rotateImg);
    //document.documentElement.appendChild(loadingDiv);
    //document.getElementById('loadingPopup').hide();



    //keane 指令失败函数自定义
    mdSmartios.bridge.popupTimeOut = function() {
        if(!document.getElementById("timeoutPopup")){
            var timeoutDiv = document.createElement("DIV");
            timeoutDiv.setAttribute('lottie-role', 'popup');
            timeoutDiv.id = 'timeoutPopup';
            var timeoutP = document.createElement("P");
            timeoutDiv.appendChild(timeoutP);
            document.documentElement.appendChild(timeoutDiv);
            $('#timeoutPopup').popup({
                afterclose: function( event, ui ) {
                    $('body').unbind('touchstart');}
            });
        }

        if (mdSmartios.bridge.getLangCode() == 'en') {
            $('#timeoutPopup>p').html('Network timeout, please retry.');
        } else {
            $('#timeoutPopup>p').html('网络繁忙，请重试');
        }
        $('#timeoutPopup').popup('open');
        $('body').bind('touchstart',function(e){
            e.preventDefault();
        });
        mdSmartios.timeoutId=setTimeout(function(){
            $('#timeoutPopup').popup('close');
            clearTimeout(mdSmartios.timeoutId);
        },2000);
    };


    mdSmartios.bridge.openLoading = function() {
        if(window.location.href.indexOf('cardDisconnect.html')==-1 || window.location.href.indexOf('cardDisconnect2.html')==-1){
            if (mdSmartios.bridge.getLangCode() == 'en') {
                $('#loadingPopup>p').html('Loading');
            } else {
                $('#loadingPopup>p').html('拼命为您连接中...');
            }
            $('#loadingPopup').show();
        }
    };

    mdSmartios.bridge.closeLoading = function() {
        $('#loadingPopup').hide();
    };

    mdSmartios.bridge.po = {
        _execObjcMethod : function(method, data) {
            try {
                var tmp = method;

                if (data != undefined && data != '') {
                    tmp = tmp + '?' + data;
                }
                console.log('Exec ' + tmp);
                var iframe = document.createElement("IFRAME");
                iframe.setAttribute("src", "iosbridge://" + tmp);
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            } catch(e) {
                console.log(method + ' exception');
            }
            //var value = mdSmartios.bridge.commandIds[id];
            //
            //delete mdSmartios.bridge.commandIds[id];

            //if(value != undefined){
            //if(value != undefined){
            //   mdSmartios.bridge.logToIOS("javaScript:mdSmartios.bridge.retObjcValue == " + value + " id " + id);
            //}else{
            //   mdSmartios.bridge.logToIOS("javaScript:mdSmartios.bridge.retObjcValue == undefined");
            //}
            return mdSmartios.bridge.retObjcValue;
        }
    };

    /**
     * 输出日志
     */
    mdSmartios.bridge.jsWindowOnError = function(obj, arg1, arg2, arg3) {
        var param = {
            obj : obj,
            arg1 : arg1,
            arg2 : arg2,
            arg3 : arg3
        };
        var p = JSON.stringify(param);
        console.log('mdSmartios.bridge.jsWindowOnError():' + p);
    };
    //IOS主动上报的消息-设备连接状态(IOS调用：主动发起)
    //pIsConnect 1:连接成功 0:断开连接
    mdSmartios.bridge.setApplianceConnnectStatus = function(pIsConnect) {
        mdSmartios.bridge.isApplianceConnected = parseInt(pIsConnect);
        if (0x01 == mdSmartios.bridge.isApplianceConnected) {
            for (var index in mdSmartios.bridge.applianceConnectedEvents) {
                var item = mdSmartios.bridge.applianceConnectedEvents[index];
                if ( typeof item == "object") {
                    item.fire();
                }
            }
        } else {
            for (var index in mdSmartios.bridge.applianceDisconnectedEvents) {
                var item = mdSmartios.bridge.applianceDisconnectedEvents[index];
                if ( typeof item == "object") {
                    item.fire();
                }
            }
        }
    };

    /**
     *  管家接口
     *
     */
    mdSmartios.bridge.callbackUserInfo = undefined;
    mdSmartios.bridge.callbackAppInfo = undefined;
    mdSmartios.bridge.callbackUserApplianceList = undefined;
    mdSmartios.bridge.callbackUserHomeInfo = undefined;
    mdSmartios.bridge.callbackRequestDataTransmit = {};
    mdSmartios.bridge.callbackFailRequestDataTransmit = {};
    mdSmartios.bridge.commandIds = {};
    mdSmartios.bridge.callbackGPSInfo = undefined;
    mdSmartios.bridge.callbackQrCode = undefined;
    mdSmartios.bridge.callbackJumpPlugin = undefined;
    mdSmartios.bridge.callbackLvmiDeviceInfo = undefined;

    //获取空调伴侣页面初始信息
    mdSmartios.bridge.getLvmiDeviceInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getLvmiDeviceInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackLvmiDeviceInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getLvmiDeviceInfo', p);
        return commandId;
    };

    mdSmartios.bridge.setLvmiDeviceInfo = function(message) {
        // alert(message);
        // var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackLvmiDeviceInfo == "function") {
            mdSmartios.bridge.callbackLvmiDeviceInfo(message);
        }
    };

    //GPS信息获取 JS－>iOS
    mdSmartios.bridge.getGPSInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getGPSInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackGPSInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getGPSInfo', p);
        return commandId;
    };

    //GPS信息能力(IOS调用：回复getGPSInfo)
    mdSmartios.bridge.setGPSInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackGPSInfo == "function") {
            mdSmartios.bridge.callbackGPSInfo(jsonResult.messageBody);
        }
    };

    //扫码功能 JS－>iOS
    mdSmartios.bridge.qrCodeScan = function(callback) {
        console.log('function:mdSmartios.bridge.qrCodeScan: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackQrCode = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('qrCodeScan', p);
        return commandId;
    };

    //扫码功能(IOS调用：回复qrCodeScan)
    mdSmartios.bridge.setQrCode = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackQrCode == "function") {
            mdSmartios.bridge.callbackQrCode(JSON.stringify(jsonResult.messageBody));
        }
    };

    //跳转功能 JS－>iOS
    mdSmartios.bridge.jumpOtherPlugin = function(cmdParamers,callback) {
        console.log('function:mdSmartios.bridge.jumpOtherPlugin');
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
        }
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackJumpPlugin = callback;
        }

        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('jumpOtherPlugin', p);
        return commandId;
    };

    //跳转功能(IOS调用：回复jumpOtherPlugin)
    mdSmartios.bridge.jumpOtherPluginCB = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackJumpPlugin == "function") {
            mdSmartios.bridge.callbackJumpPlugin(jsonResult.messageBody);
        }
    };

    /**
     * #define GetUserInfo @"getUserInfo" 获取用户信息能力
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getUserInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getUserInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackUserInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getUserInfo', p);
        return commandId;
    };

    //用户信息能力(IOS调用：回复getUserInfo)
    mdSmartios.bridge.setUserInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackUserInfo == "function") {
            mdSmartios.bridge.callbackUserInfo(jsonResult.messageBody);
        }
    };

    /**
     * #define GetAppInfo @"getAppInfo" 获取用户信息能力
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getAppInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getAppInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackAppInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getAppInfo', p);
        return commandId;
    };
    //用户信息能力(IOS调用：回复getAppInfo)
    mdSmartios.bridge.setAppInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackAppInfo == "function") {
            mdSmartios.bridge.callbackAppInfo(jsonResult.messageBody);
        }
    };
    /**
     * #define GetUserApplianceList @"getUserApplianceList" 获取用户家电列表
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getUserApplianceList = function(callback) {
        console.log('function:mdSmartios.bridge.getUserApplianceList: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackUserApplianceList = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getUserApplianceList', p);
        return commandId;
    };

    //用户家电列表(IOS调用：回复getUserApplianceList)
    mdSmartios.bridge.setUserApplianceList = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackUserApplianceList == "function") {
            mdSmartios.bridge.callbackUserApplianceList(jsonResult.messageBody);
        }
    };

    /**
     * #define GetUserHomeInfo @"getUserHomeInfo"  获取用户家庭信息
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getUserHomeInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getUserHomeInfo:callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackUserHomeInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getUserHomeInfo', p);
        return commandId;
    };

    //用户家庭信息(IOS调用：回复getUserHomeInfo)
    mdSmartios.bridge.setUserHomeInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackUserHomeInfo == "function") {
            mdSmartios.bridge.callbackUserHomeInfo(jsonResult.messageBody);
        }
    };

    //用户家庭信息(IOS调用：回复getUserHomeInfo)
    mdSmartios.bridge.setDataTransmit = function(retObjcValue, result) {
        var jsonResult = JSON.parse(result);
        var cbf = mdSmartios.bridge.callbackRequestDataTransmit[retObjcValue];
        var cbff = mdSmartios.bridge.callbackFailRequestDataTransmit[retObjcValue];
        {
            if ( typeof cbf == "function") {

                cbf(jsonResult.messageBody);
            }
        }
        delete mdSmartios.bridge.callbackRequestDataTransmit[retObjcValue];
        delete mdSmartios.bridge.callbackFailRequestDataTransmit[retObjcValue];
    };

    /**
     * 购买耗材(JS->WebView）
     * @param {json} pageParamers  参数
     * @return {Number} 处理結果
     *                    0 : 成功
     *                   -1 : 失败
     *
     */
    mdSmartios.bridge.buyConsumable = function(pageParamers) {
        console.log("function:mdSmartios.bridge.buyConsumable");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        return mdSmartios.bridge.po._execObjcMethod('buyConsumable', p);
    };


    /**
     * #define RequestDataTransmit @"requestDataTransmit" 请求通用数据接口能力
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.requestDataTransmit = function(cmdParamers, callback, callbackFail) {
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
        }
        param.cammandId = Math.floor(Math.random() * 10000000);
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('requestDataTransmit', p);
        //if (isAndroid) {
        commandId = param.cammandId;
        //}
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackRequestDataTransmit[commandId] = callback;
        }

        callbackFail=function(){};
        mdSmartios.bridge.callbackFailRequestDataTransmit[commandId] = callbackFail;
        return commandId;
    };

    /**
     * H5 调用APP,取得家电id
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getApplianceIDTX = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceIDTX', p);

        return commandId;
    };

    /**
     * 获取设备在线离线状态
     * @param {Object} deviceId
     * @param {Object} callback
     * @param {Object} callbackFail
     */
    mdSmartios.bridge.getDeviceOnlineStatus = function(deviceId,callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        param.deviceId = deviceId;
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getDeviceOnlineStatus', p);

        return commandId;
    };

    /**
     * H5 调用APP,取得套系列表
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getTXList = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getTXList', p);

        return commandId;
    };

    mdSmartios.bridge.getDeviceName = function(deviceId,callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        param.deviceId = deviceId;
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);


        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getDeviceName', p);

        return commandId;
    };

    mdSmartios.bridge.getApplianceSubtypeTX = function(deviceId,callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        param.deviceId = deviceId;
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);


        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceSubtypeTX', p);

        return commandId;
    };

    mdSmartios.bridge.getApplianceType = function(deviceId,callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        param.deviceId = deviceId;
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);


        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceType', p);

        return commandId;
    };

    mdSmartios.bridge.getDeviceSNTX = function(deviceId,callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        param.deviceId = deviceId;
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);


        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getDeviceSNTX', p);

        return commandId;
    };

    /**
     * 开始异步处理的命令
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.startCmdProcessTX = function(messageBody,deviceId, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcess: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }
        param.deviceId = deviceId;
        //param.cammandId = Math.floor(Math.random() * 1000);
        //var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.startCmdProcessGo(param);


        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

        var isQuery=true;
        switch(messageBody[2]){
            case 0xea:
            case 0xeb:
            case 0xec:
            case 0xed:
            case 0xef:
                if((messageBody[18]<<8|messageBody[17])==50002){
                    isQuery=true;
                }else{
                    isQuery=false;
                }
                break;
            default:
                if(messageBody[9]==3){
                    isQuery=true;
                }else{
                    isQuery=false;
                }
        }
//keane 指令失败函数自定义
//        if(!isQuery){
//            if(typeof callbackFail != "function"){
//                callbackFail=function(){};
//            }
//        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        }


        return commandId;
    };

    /**
     * #define RequestDataTransmitTX @"requestDataTransmitTX" 请求通用数据接口能力
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.requestDataTransmitTX = function(cmdParamers,deviceId, callback, callbackFail) {
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
            param.deviceId = deviceId;
        }
        param.cammandId = Math.floor(Math.random() * 10000000);
        var p = JSON.stringify(param);

        //if (isAndroid) {
        var commandIds = param.cammandId;
        //}
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackRequestDataTransmit[commandIds] = callback;
        }

        callbackFail=function(){};
        mdSmartios.bridge.callbackFailRequestDataTransmit[commandIds] = callbackFail;

        var commandId = mdSmartios.bridge.po._execObjcMethod('requestDataTransmit', p);
        return commandId;
    };

    /************ 家用空调定制接口Start *************/
    /**
     * 家用空调定制接口 - 图片选择及上传
     * @param {function} callback 处理成功后的回调函数
     * @param {function} callbackFail 后续处理异常时的回调函数
     * @return {JSONObject} messageBody 返回给回调的对象
     *         {
     *              status: 0/上传成功，1/上传失败，2/权限失败, 3/取消选择
     *              body: {....} 上传成功时，将服务器返回的结果放在body里
     *         }
     */
    mdSmartios.bridge.choosePhotosForHomeAir = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);
        var commandId = mdSmartios.bridge.po._execObjcMethod('choosePhotosForHomeAir', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    /**
     * 家用空调定制接口 - 图片选择及上传
     * @param {JSONObject} JSONObject 参数
     * @param {function} callback 处理成功后的回调函数
     * @param {function} callbackFail 后续处理异常时的回调函数
     * @return {JSONObject} messageBody 返回给回调的对象
     *         {
     *              status: 0/上传成功，1/上传失败，2/权限失败, 3/取消选择
     *              body: {....} 上传成功时，将服务器返回的结果放在body里
     *         }
     */
    mdSmartios.bridge.chooseMultiPhotosForHomeAir = function (param, callback, callbackFail) {
        if (!param) param = {}
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);
        var commandId = mdSmartios.bridge.po._execObjcMethod('chooseMultiPhotosForHomeAir', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };

    /**
     * 家用空调定制接口 - 开始录音
     * @param {function} callback 处理成功后的回调函数
     * @param {function} callbackFail 后续处理异常时的回调函数
     * @return {JSONObject} messageBody 返回给回调的对象
     *         {
     *              status: 1/开始录音，2/权限失败
     *         }
     */
    mdSmartios.bridge.startRecordAudioForHomeAir = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);
        var commandId = mdSmartios.bridge.po._execObjcMethod('startRecordAudioForHomeAir', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };

    /**
     * 家用空调定制接口 - 结束录音及上传
     * @param {function} callback 处理成功后的回调函数
     * @param {function} callbackFail 后续处理异常时的回调函数
     * @return {JSONObject} messageBody 返回给回调的对象
     *         {
     *              status: 0/上传成功，1/上传失败
     *              body: {....} 上传成功时，将服务器返回的结果放在body里
     *         }
     */
    mdSmartios.bridge.stopRecordAudioForHomeAir = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);
        var commandId = mdSmartios.bridge.po._execObjcMethod('stopRecordAudioForHomeAir', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    /************ 家用空调定制接口End *************/

    /**
     * JS通过APP接口调用第三方SDK接口(JS->APP->第三方SDK) 2018/04/11
     * @param {JSONObject} param JS传递的参数
     * @param {function} callback 处理成功后的回调函数
     * @param {function} callbackFail 后续处理异常时的回调函数
     * @return {JSONObject} messageBody 返回给回调的JSON对象，具体内容由第三方SDK实现
     */
    mdSmartios.bridge.interfaceForThirdParty = function (param, callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);
        var commandId = mdSmartios.bridge.po._execObjcMethod('interfaceForThirdParty', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };

    /**
     * 生成给第三方接入智慧云的验证Token，此Token在24小时内有效
     * @param {function} callback 处理成功后的回调函数
     * @param {function} callbackFail 后续处理异常时的回调函数
     * @return {JSONObject} messageBody 返回给回调的对象
     *         {
     *              status: 0/生成token成功，1/生成token失败
     *              token: {string} 成功时token以字符串返回
     *         }
     */
    mdSmartios.bridge.getAuthToken = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);
        var commandId = mdSmartios.bridge.po._execObjcMethod('getAuthToken', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };

    //蓝牙相关接口
    //开始扫描蓝牙
    /*  param:{duration: number //持续时间, 单位：秒}
        当扫描到的蓝牙设备（蓝牙信息），app-->插件:
        receiveMessageFromApp({messageType:"blueScanResult",messageBody:{name:"xxx", deviceKey:"xxxxx"}})
     */
    mdSmartios.bridge.startBlueScan = function (param, callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('startBlueScan', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    //停止蓝牙扫描
    /* 当扫描结束（停止或超时），app -> 插件:
    receiveMessageFromApp({ messageType: "blueScanStop", messageBody: {} })
    */
    mdSmartios.bridge.stopBlueScan = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('stopBlueScan', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    //保存蓝牙信息
    /* param:{deviceType:品类码, name:"xxx", deviceKey:"xxxxx"} */
    mdSmartios.bridge.addDeviceBlueInfo = function (param, callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('addDeviceBlueInfo', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    //获取之前保存的蓝牙信息
    /* param:{ deviceType: 品类码 }
       result:{status：0, //0: 执行成功, 1:执行失败, name:"xxx", deviceKey:"xxxxx"}
    */
    mdSmartios.bridge.getDeviceBlueInfo = function (param, callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('getDeviceBlueInfo', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    //根据蓝牙信息建立蓝牙连接
    /* param:{name:"xxx", deviceKey:"xxxxx"} */
    /* 当收到蓝牙数据，app -> 插件:
    receiveMessageFromApp({ messageType: "receiveBlueInfo", messageBody: { service: "uuid", charactristic: "uuid", lottie: "xxx" } })
    */
    mdSmartios.bridge.setupBlueConnection = function (param, callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('setupBlueConnection', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    // 向蓝牙设备传输数据
    /* param:{service:"uuid",charactristic:"uuid", lottie:"xxx"} */
    mdSmartios.bridge.uploadBlueInfo = function (param, callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('uploadBlueInfo', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    //断开当前蓝牙连接
    /* 若是蓝牙意外断开, app -> 插件:
       receiveMessageFromApp({ messageType: "blueConnectionBreak", messageBody: {} })
    */
    mdSmartios.bridge.disconnectBlueConnection = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('disconnectBlueConnection', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    //设置是否监控安卓手机物理返回键功能
    /* 若设置的监控返回键，用户按了返回键后通过, app -> 插件:
       receiveMessageFromApp({ messageType: "hardwareBackClick", messageBody: {} })
    */
    mdSmartios.bridge.setBackHandle = function (param,callback, callbackFail) {
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('setBackHandle', p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        return commandId;
    };
    /**
     * 获取当前家庭的信息(^5.2.0)
     * @param {Object} callback
     * @param {Object} callbackFail
     * @return {Object} {"messageBody":{
        "homeId": "123456",
        "homeName": "林首富之家",
        "isOwner": "1", //0表示非主人，1表示主人
        deviceList: [{
        "deviceId": "xxxxx", //设备ID
        "deviceName": "xxxxxx", //设备名
        "deviceType": "xxxx", //设备类型
        "deviceSubType": "xxxxx",//设备子类型
        "deviceSn": "xxxxxxxxx"//设备SN
        "isOnline": 1, //设备是否在线，1：在线，0：离线}]
        "isLocal": 0, //是否是本地家庭，1：是，0：否
        }}
     */
    mdSmartios.bridge.getCurrentHomeInfo = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if (typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getCurrentHomeInfo', p);

        return commandId;
    };

    //显示alert
    mdSmartios.bridge.showAlert = function(cmdParamers) {
        console.log('function:mdSmartios.bridge.showAlert');
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
        }

        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('showAlert', p);
        return commandId;
    };

    //loading 显示
    mdSmartios.bridge.showProgress = function() {
        console.log("function:mdSmartios.bridge.showProgress");
        return mdSmartios.bridge.po._execObjcMethod('showProgress');
    };

    //loading 取消
    mdSmartios.bridge.closeProgress = function() {
        console.log("function:mdSmartios.bridge.closeProgress");
        return mdSmartios.bridge.po._execObjcMethod('closeProgress');
    };

    //VoiceCube 启动
    mdSmartios.bridge.startVoice = function () {
        console.log("function:mdSmartios.bridge.startVoice");
        return mdSmartios.bridge.po._execObjcMethod('startVoice');
    }

    //VoiceCube 停止
    mdSmartios.bridge.stopVoice = function () {
        console.log("function:mdSmartios.bridge.stopVoice");
        return mdSmartios.bridge.po._execObjcMethod('stopVoice');
    }

    //VoiceCube 取消
    mdSmartios.bridge.cancelVoice = function () {
        console.log("function:mdSmartios.bridge.cancelVoice");
        return mdSmartios.bridge.po._execObjcMethod('cancelVoice');
    }

    //VoiceCube 音量变化, volumn 是int值
    mdSmartios.bridge.voiceChanged = function(volumn) {
        console.log("function:mdSmartios.bridge.voiceChanged");
        $.event.trigger("voiceChanged", volumn);
    };

    //VoiceCube 识别成功,  result是json object
    /**
     *示例：
     {"service":"cn.yunzhisheng.smartfridge","history":"cn.yunzhisheng.smartfridge","code":"PUT_IN","semantic":{"intent":{"foods":[{"number":"1","unit":"个","food":"苹果"}]}},"rc":0,"text":"苹果一个","responseId":"c2323537ecbe475a88f20d9b3e7f7423"}
     **/
    mdSmartios.bridge.voiceResult = function(result) {
        console.log("function:mdSmartios.bridge.voiceResult");
        $.event.trigger("voiceResult", result);
    };

    //VoiceCube 识别失败, error 失败原因String
    mdSmartios.bridge.voiceFailed = function(error) {
        console.log("function:mdSmartios.bridge.voiceFailed");
        $.event.trigger("voiceFailed", error);
    };

    //打开网页， cmdParamers为网页url，如http://www.baidu.com
    mdSmartios.bridge.openWeb = function(url) {
        console.log('function:mdSmartios.bridge.openWeb');
        var param = {};
        if (url != undefined) {
            param.cmdParamers = url;
        }

        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('openWeb', p);
        return commandId;
    };

    /**
     * 跳转App页面
     * @param: type: 跳转类型, 跳转原生页，为”jumpNative”, 跳转插件页，为“jumpPlugin”, 跳转weex，为“jumpWeex”,  跳转webview则为“jumpWebview”
     * @param: param: 详细信息字典 内部具体信息如下
     *                  跳转webview，参数有url等
     *                  跳转插件页，参数有deviceId等
     *                 跳转原生页，参数有pageName等
     *                  跳转weex，参数有url等
     *                  需不需要带导航栏字段 如needNavigation。1为需要0为不需要
     *                 需不需要带底部导航 如needTabbar
     * http://confluence.msmart.com/pages/viewpage.action?pageId=21498414
     */
    mdSmartios.bridge.goToMeijuPage = function (type, param) {
        console.log('function:mdSmartios.bridge.goToMeijuPage');
        type = type || 'jumpNative';
        param = param || {
            pageName: 'service_home',
            needNavigation: '1',
            needTabbar: '1'
        };
        var params = {};
        params.type = type;
        params.param = param;
        var p = JSON.stringify(params);
        var commandId = mdSmartios.bridge.po._execObjcMethod('goToMeijuPage', p);
        return commandId;
    }
    /*
  *IoT通用透传网络请求接口
  * param = {
          url: 'gateway/subdevice/search', //云端api 接口
          params: {} //请求参数
          cammandId: "232"
  }
  */
    mdSmartios.bridge.sendMCloudRequest = function (param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('sendMCloudRequest', p);

        return commandId;
    };

    /*
     *美居5.0 移动中台通用透传网络请求接口
     *param : {
     url: 'gateway/subdevice/search', //请求接口路径,
     method: 'POST', //POST/GET, 默认POST
     headers: {}, //请求header
     lottie: {} //请求参数
     }
     */
    mdSmartios.bridge.sendCentralCloundRequest = function (param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('sendCentralCloundRequest', p);

        return commandId;
    };
    /*
     *美居5.0 获取状态栏信息
     result: {
        isDisplay: true/false, //当前APP端是否控制了状态栏区域。true:状态栏高度属于APP控制，false:状态栏高度属于H5，即全屏满屏为H5区域
        height: xx， //状态栏高度，单位px，用于插件适配状态栏
        }
     */
    mdSmartios.bridge.getStatusBar = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getStatusBar', p);

        return commandId;
    };
    /*
     *美居5.0 设置状态栏
     param:{
        isDisplay: true/false, //选填参数，设置是否显示状态栏，true:状态栏高度属于APP控制，false:状态栏高度属于H5
        bgColor: "#ffffff", //选填参数，设置状态栏背景颜色
        colorMode: "1", //选填参数，设置状态栏字体颜色模式，1：黑色字体色系模式，2：白色字体色系模式
        }
     */
    mdSmartios.bridge.setStatusBar = function (param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('setStatusBar', p);

        return commandId;
    };
    /*
     美居5.0 设置底部安全区域（iOS）
     param:{
         isDisplay: true/false, //选填参数，设置是否显示下面安全区域，true:下面安全区域高度属于APP控制，false:下面安全区域高度属于H5
           bgColor: "#ffffff", //选填参数，设置下面安全区域背景颜色
        }
     */
    mdSmartios.bridge.setBottomStatusBar = function (param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('setBottomStatusBar', p);

        return commandId;
    };
    /*
     城市定位接口：获取GPS定位所在城市名、ID以入经纬度和所选择的天气城市的信息。
     */
    mdSmartios.bridge.cityLocation = function (callback, callbackFail) {
        var param = {};
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('cityLocation', p);

        return commandId;
    };
    /*
     *设置活动页右上角菜单项
     *param{
     *   items:[{
     *     key: string, //菜单标示
     *     icon: url, //菜单icon的在线URL
     *     desc: string, //菜单描述，若没有配置icon则显示描述
     *  }]
     * }
     *  参数items为数组：最前面的排最右边
     *   当参数items为空数组时，则隐藏菜单
     * receiveMessageFromApp({ messageType: "menuItemClick", messageBody: { key: "xxxx" } }) //xxx为传入的菜单项key
     */
    mdSmartios.bridge.setupMenu = function (param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('setupMenu', p);

        return commandId;
    };

    /**
     * 打开分享窗口(JS->WebView）
     * @param {json} param  分享的参数
     * {
        "types": ["wx","wxTimeline"], //分享类型数组，wx表示微信分享，qq表示qq分享，sms表示短信分享，weibo表示新浪微博，qzone表示QQ空间，wxTimeline表示微信朋友圈
        "title": "xxxxxx", //分享的标题
        "desc": "xxxxxx",//分享的文本内容
        "imgUrl": "xxxxxx",//分享的图片链接
        "link": "xxxxxx", //分享的跳转链接
        }
     * @return {Number} 処理結果
     *                    0 : 打开成功
     *                   -1 : 打开失败
     *
     当收点击某个分享项时，app -> 插件:
     receiveMessageFromApp({ messageType: "shareItemClick", messageBody: { type: "xxxx" } }) //xxx为传入的菜单项types之一
     *
     */
    mdSmartios.bridge.showSharePanel = function (param, callback, callbackFail) {
        if (param == undefined || param == "") {
            param = {};
        }
        param.cammandId = Math.floor(Math.random() * 100000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        if (typeof callback == "function") {
           mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if (typeof callbackFail == "function") {
           mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('showSharePanel', p);

        return commandId;
    };

    //JS监听设备的连接状态
    //eventType   "connected"   :连接
    //            "disconnected":断开连接
    mdSmartios.bridge.isApplianceConnected = 0x01;
    mdSmartios.bridge.applianceConnectedEvents = [];
    mdSmartios.bridge.applianceDisconnectedEvents = [];
    mdSmartios.bridge.appliance = function() {
        function commonEvent() {
            // this.handler
        };
        commonEvent.prototype = {
            addHandler : function(handler) {
                this.handler = handler;
            },
            fire : function() {
                this.handler();
            },
            removeHandler : function() {
                this.handler = null;
            }
        };
        //eventType-connected
        var _connectedEvent = new commonEvent();
        //eventType-disconnected
        var _disconnectedEvent = new commonEvent();
        return {
            bind : function(eventType, handler) {
                if (eventType == "connected") {
                    for (var i in mdSmartios.bridge.applianceConnectedEvents) {
                        if (mdSmartios.bridge.applianceConnectedEvents[i] == _connectedEvent) {
                            delete mdSmartios.bridge.applianceConnectedEvents[i];
                        }
                    }
                    _connectedEvent.addHandler(handler);
                    mdSmartios.bridge.applianceConnectedEvents.push(_connectedEvent);
                }
                if (eventType == "disconnected") {
                    for (var i in mdSmartios.bridge.applianceDisconnectedEvents) {
                        if (mdSmartios.bridge.applianceDisconnectedEvents[i] == _disconnectedEvent) {
                            delete mdSmartios.bridge.applianceDisconnectedEvents[i];
                        }
                    }
                    _disconnectedEvent.addHandler(handler);
                    mdSmartios.bridge.applianceDisconnectedEvents.push(_disconnectedEvent);
                }
            },
            unbind : function(eventType) {
                if (eventType == "connected" || eventType == undefined) {
                    for (var i in mdSmartios.bridge.applianceConnectedEvents) {
                        if (mdSmartios.bridge.applianceConnectedEvents[i] == _connectedEvent) {
                            delete mdSmartios.bridge.applianceConnectedEvents[i];
                        }
                    }
                }
                if (eventType == "disconnected" || eventType == undefined) {
                    for (var i in mdSmartios.bridge.applianceDisconnectedEvents) {
                        if (mdSmartios.bridge.applianceDisconnectedEvents[i] == _disconnectedEvent) {
                            delete mdSmartios.bridge.applianceDisconnectedEvents[i];
                        }
                    }
                }
            },
            request : function() {
                mdSmartios.bridge.setApplianceConnnectStatus(mdSmartios.bridge.isApplianceConnected);
            }
        };
    };

    /**

     * 判断是否为安卓系统
     * @author Jun
     */
    if (!mdSmartios.bridge.isAndroid) {
        var u = navigator.userAgent;
        mdSmartios.bridge.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    }

})(mdSmartios);

(function(window, mdSmartios) {
    console.log('--iPhone bridge--');
    // iPhone log
    if (window.navigator.userAgent.indexOf('DEBUG_LOG') != -1) {
        console = new Object();
        console.log = function(log) {
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", "ios-log:#iOS#" + log);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        };
        console.warn = function(log) {
            console.log(log);
        };
        console.debug = function(log) {
            console.log(log);
        };
        console.error = function(log) {
            console.log(log);
        };
        console.info = function(log) {
            console.log(log);
        };
        console.trace = function(log) {
            console.log(log);
        };
    }
    window.bridge = mdSmartios.bridge;
    window.mdSmartios = mdSmartios
    mdSmartios.bridge.retObjcValue = 0;

  /*bridge.po._execObjcMethod('getCurrentDevSN');
    bridge.po._execObjcMethod('getCurrentApplianceID');
    bridge.po._execObjcMethod('getCurrentApplianceSubtype');*/
})(window,mdSmartios);