import typeWriter from "./helpers.js"
$(document).ready(() => {
 
  //state machine for handling which files are considered active
  //also stores the most recent command from the console
  let stateMachine = {
    currentWindow: "none",
    currentCommand: "",
  };
  
  //global variable declarations
  let help = "output: this is the response for the help input";
  let projectsList = `output: List of Projects:<br /> ecobourne <br /> trivia battler <br /> hellcrawl `;
  let errorMsg = `output: error - not recognized as internal or external command`;
  let bootEco = `starting ecobourne...`
  let ecoOne = "<br /> Ecobourne is an animal life cycle simulation that puts a variety of animals in a digital environment to see how they develop and ineract with each other."
  let commandList = ["help", "list projects", "start ecobourne"];
  let windows = ["console", "text-file"];
  
  let zIndexCounter = 1;

  //function to create console typewriter effect

  //function that tests the input string to see if it is a valid command
  function testString(string) {
    $(".text-output").append(`<br />command: ${string}<br />`);

    if (commandList.includes(string)) {
      switch (string) {
        case "help":
          typeWriter(help, 0, 100);
          break;
        case "list projects":
          typeWriter(projectsList, 0, 100);
          break;
        case "start ecobourne":
          typeWriter(bootEco, 0, 100);
          setTimeout(function() {
            typeWriter(ecoOne, 0, 100)
          }, 1000)
      }

      // $(".text-output").empty();
    } else {
      //display an error message if not a valid command
      typeWriter(errorMsg, 0, 100);
    }
    $(".text-input").empty();
    //auto scroll the console chatbox as you type
    $(".io")
      .stop()
      .animate(
        {
          scrollTop: $(".io")[0].scrollHeight,
        },
        800
      );
  }
  //setting up application window functionlity
  //each window is draggable and can be closed which updates the state
  $(".draggable").draggable({
    cancel: "div.non-draggable",
    containment: "body",
  });

  $("div").on("click", function () {
    if ($(this).hasClass("console")) {
      stateMachine.currentWindow = "console";
      $(".console").css("z-index", zIndexCounter);
      zIndexCounter++;
    } else if ($(this).hasClass("text-file")) {
      stateMachine.currentWindow = "text-file";
      $(".text-file").css("z-index", zIndexCounter);
      zIndexCounter++;
    }
  });
  $(".icon").dblclick(function () {
    if ($(this).hasClass("console-icon")) {
      $(".console").fadeIn("fast");
      stateMachine.currentWindow = "console";
    }
    if ($(this).hasClass("help-icon")) {
      $(".text-file").fadeIn("fast");
      stateMachine.currentWindow = "text-file";
    }
  });
  $(".close-button").on("click", function (e) {
    let appType = $(this).attr("app-type");
    if (appType == "console") {
      $(".console").fadeOut("fast");
      $(".text-input").empty();
      $(".text-output").empty();
    } else if (appType == "text-file") {
      $(".text-file").fadeOut("fast");
    }
    stateMachine.currentWindow = "none";
  });
  $(".console").resizable();
  //event listeners for console input
  $(document).on("keydown", (e) => {
    let currentCommand = $(".text-input").text();
    if (stateMachine.currentWindow == "console") {
      if (e.keyCode == 8) {
        //delete key can remove text
        $(".text-input").text((_, txt) => {
          return txt.slice(0, -1);
        });
      }
      //check for enter key and run test function 
      if (e.keyCode == 13) {
        testString(currentCommand);
      }
      //check for only alphabet keypressesh
      if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 32) {
        $(".text-input").append(e.key);
      }
    }
  });
});
