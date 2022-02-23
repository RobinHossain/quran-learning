$("#video_call").click(function(e) {
    e.preventDefault();
  if (call != null) {
    call.close();
  }
  if (window.localStream != null && window.localStream.getVideoTracks().length > 0) {
    $("#video_call").hide();
    $("#cancel_video_call").show();
    if (window.localStream.getVideoTracks().length > 0) {
      window.localStream.getVideoTracks()[0].enabled = true;
    }
    call = peer.call(connection.peer, window.localStream, {metadata: 'video'});
    call.on('stream', function(stream) {
      window.remoteStream = stream;
      $("#cancel_video_call").hide();
        setVideoObjectSrc(document.getElementById('my-their-video'), stream)
        setVideoObjectSrc(document.getElementById('their-video-smaller'), stream)
 // $('#their-video').prop('srcObject', window.URL.createObjectURL(stream));
 //      $('#their-video-smaller').prop('srcObject', window.URL.createObjectURL(stream));
      $("#end_video_call").show();
      $("#voice_call").hide();});
    call.on('close', function() {
      $("#end_video_call").hide();
      $("#video_call").show();
      $("#cancel_video_call").hide();
    });
  }
  else {
    get_cam();
    $("#setPromptHeader").text("Camera inactive");
    $("#setPromptContent").html("<p>Your browser is asking you to activate your camera.Please activate your camera and try again.</p>");
    $('.ui.prompt.modal')
    .modal({
      closable  : false,
      onApprove : function() {
        console.log("Done");
      }
    })
    .modal('show')
    ;
  }
});


function get_cam(){
  navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
  if (navigator.getUserMedia){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
      window.localStream = stream;
      $('my-video').show();
      setVideoObjectSrc(document.getElementById('my-video'), stream)
    },function(){
      console.log("Video not granted");
    });
  }
  }


  $("#end_video_call").click(function(e) {
    e.preventDefault();
    if (call) {
      call.close();
    }
    $("#their-video").hide();
    $("#my-video").hide();
    send('{"call_status": "hang_up_video"}');
  });
  $("#cancel_video_call").click(function(e) {
    e.preventDefault();
    $("#cancel_video_call").hide();
    $("#video_call").show();
    send('{"call_status": "hang_up_video"}');
  });
