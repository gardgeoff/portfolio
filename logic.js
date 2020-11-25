$(document).ready(() => {
  let stateMachine = {
    currentWindow: "none",
    currentCommand: "",
  };
  let textCounter = 0;
  $(".draggable").draggable({
    cancel: "div.non-draggable",
    containment: "body",
  });
  $(".console").on("click", () => {
    if (stateMachine.currentWindow != "console") {
      stateMachine.currentWindow = "console";
      console.log(stateMachine.currentWindow);
    }
  });
  $(".command-prompt").dblclick(() => {
    $(".console").fadeIn("fast");
    stateMachine.currentWindow = "console";
  });
  $(".close-button").on("click", () => {
    $(".console").fadeOut("fast");
    $(".text-input").empty();
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

        })
      }
      if (e.keyCode == 13) {
        if (currentCommand == "help") {
          $(".text-output").append(`${currentCommand} <br />List of Commands: <br /> Hello <br/>`);
          $(".text-input").empty()
          $('.io').stop().animate({
            scrollTop: $('.io')[0].scrollHeight
          }, 800);
        }
      }
      if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 32) {
 
          $(".text-input").append(e.key);
        
      }
    }
  });
});
