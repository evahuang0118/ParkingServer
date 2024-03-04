// stream.js 2023-09-01 add by steven
// 用來給 APS 以及 LPR 做串流影像撥放

var players = {}

function flv_load(streamID, streamDeviceInfo) {
  var key = `video-element-[${streamID}]`
  var mediaDataSource = { 
    type: 'flv',
    isLive : true,
    withCredentials : false,
    hasAudio : false,
    hasVideo : true 
  };

  const currentURL = window.location.href;

  if (currentURL.includes("127.0.0.1") || currentURL.includes("localhost") || currentURL.includes("192.168")) {
    console.log("Localhost detected.");
    mediaDataSource['url'] = streamDeviceInfo.LANStreamURL
  } else {
    // Code to execute for other URLs
    console.log("Not on localhost.");
    mediaDataSource['url'] = streamDeviceInfo.WANStreamURL
  }

  // console.log('MediaDataSource', mediaDataSource);

  flv_load_mds(mediaDataSource, streamID);

  var videoElement = document.getElementsByName(`video-element-[${streamID}]`)[0];

  videoElement.addEventListener("progress", () => {
    let end = players[key].buffered.end(0); //获取当前buffered值(缓冲区末尾)
    let delta = end - players[key].currentTime; //获取buffered与当前播放位置的差值
    // 延迟过大，通过跳帧的方式更新视频

    var videoElementLive = document.getElementById(`video-element-[${streamID}]-live`);
      // console.log(`live element =>  ${videoElementLive}`)

    if (videoElementLive.checked == true){ // 開啟即時串流
      // console.log("live 有開啟")
      if (delta > 10 || delta < 0) {
        players[key].currentTime = players[key].buffered.end(0) - 1;
        return;
      }
      // 追帧
      if (delta > 1) {
        videoElement.playbackRate = 1.1;
      } else {
        videoElement.playbackRate = 1;
      }
    } else {

      // console.log("live 未開啟")
      // console.log(`video-elemnet-[${streamID}] ${videoElementLive.checked}`)


    }

  });

  // 点击播放按钮后，更新视频
  videoElement.addEventListener("play", () => {
    let end = players[key].buffered.end(0) - 1;
    players[key].currentTime = end;
  });

  // 网页重新激活后，更新视频
  // window.onfocus = () => {
  //   let end = players[key].buffered.end(-1) - 1;
  //   players[key].currentTime = end;
  // };
}


function flv_load_mds(mediaDataSource, streamID) {
  var key = `video-element-[${streamID}]`
  var element = document.getElementsByName(`video-element-[${streamID}]`)[0];
  if (typeof players[key] !== "undefined") {
    if (players[key] != null) {
      players[key].unload();
      players[key].detachMediaElement();
      players[key].destroy();
      players[key] = null;
    }
  }
  players[key] = flvjs.createPlayer(mediaDataSource, {
    enableStashBuffer : false,
    isLive : true,
    lazyLoad : false,
    stashInitialSize : 128,
    autoCleanupSourceBuffer : true,
    autoCleanupMinBackwardDuration : 5,
    autoCleanupMinBackwardDuration : 5,
    seekType : 'range',
  });
  players[key].attachMediaElement(element);
  players[key].load();


  players[key].on(flvjs.Events.ERROR, function (e) {
  // destroy
    players[key].pause();
    players[key].unload();
    players[key].detachMediaElement();
    players[key].destroy();
    players[key] = null;
    // 进行重建的逻辑，这里不再展开
    flv_load_mds(mediaDataSource, streamID)

  });
}


