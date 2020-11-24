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
  $(".command-prompt").dblclick(()=> {
    $(".console").fadeIn("fast")
    stateMachine.currentWindow = "console";
  })
  $(".close-button").on("click", () => {
    $(".console").fadeOut("fast");
    $(".text-input").empty();
    stateMachine.currentWindow = "none";
  })
  $(document).on("keydown", (e) => {
    console.log(`Keycode : ${e.keyCode} Key: ${e.key}`)
 
    let currentCommand = $(".text-input").text();
    if (stateMachine.currentWindow == "console") {
      if (e.keyCode == 8) {
        let newString = currentCommand.slice(0, -1);
      
        $(".text-input").text(newString);
        textCounter--;
      }
      if (e.keyCode == 13) {
        if (currentCommand == "help"){
    
        $(".text-input").append("<br />List of Commands: <br /> Hello <br/>")
        }
        

      }
      if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 32) {
        if (textCounter > 75) {
          console.log("called");
          $(".text-input").append("<br />");
          textCounter = 0;
        }

        $(".text-input").append(e.key);
        textCounter++;
      }


    }
  });
});
