$(document).ready(() => {
  let stateMachine = {
    currentWindow: "none",
    currentCommand: "",
    firstLine: true
  };
  let windows = ["console", "text-file"]
  let charIndex = 0
  let zIndexCounter = 1;
  function typeWriter(string, i, speed) {
    console.log(string.length)
    if (charIndex < string.length) {
      $(".text-output").append(string.charAt(charIndex));
      charIndex++;
      setTimeout(function() {
        typeWriter(string, charIndex, speed)
      })
    } else {
      charIndex = 0;
    }

  }
  
  $(".draggable").draggable({
    cancel: "div.non-draggable",
    containment: "body",
  });

  $("div").on("click", function () {
    if ($(this).hasClass("console")) {
      
      stateMachine.currentWindow = "console";
      $(".console").css("z-index", zIndexCounter)
      zIndexCounter++
      
    } else if ($(this).hasClass("text-file")) {
    
      stateMachine.currentWindow = "text-file"
      $(".text-file").css("z-index", zIndexCounter)
      zIndexCounter++

    }
  });
  $(".icon").dblclick( function() {
    if ($(this).hasClass("console-icon")){
    $(".console").fadeIn("fast");
    stateMachine.currentWindow = "console";
    }
    if($(this).hasClass("help-icon")) {
      
      $(".text-file").fadeIn("fast");
      stateMachine.currentWindow = "text-file"

    }
  });
  $(".close-button").on("click", function (e) {
    let appType = $(this).attr("app-type");
    if (appType == "console") {
      $(".console").fadeOut("fast");
      $(".text-input").empty();
    } else if (appType == "text-file") {
      $(".text-file").fadeOut("fast");
    }
    stateMachine.currentWindow = "none";
  });
  $(".console").resizable();
  $(document).on("keydown", (e) => {
    console.log(`Keycode : ${e.keyCode} Key: ${e.key}`);

    let currentCommand = $(".text-input").text();
    if (stateMachine.currentWindow == "console") {
      if (e.keyCode == 8) {
        $(".text-input").text((_, txt) => {
          return txt.slice(0, -1);
        });
      }
      if (e.keyCode == 13) {
        if (currentCommand == "help") {
          // $(".text-output").empty();
          if (!stateMachine.firstLine) {
            $(".text-output").append("<br /><br />")

          } 
          stateMachine.firstLine =false; 
          let helpString = "this is the response for the help input"
          typeWriter(helpString, 0, 100);

          charIndex = 0;
          
     
          $(".text-input").empty();
          $(".io")
            .stop()
            .animate(
              {
                scrollTop: $(".io")[0].scrollHeight,
              },
              800
            );
        }
      }
      if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 32) {
        $(".text-input").append(e.key);
      }
    }
  });
});
