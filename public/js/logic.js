$(document).ready(() => {
  //state machine for handling which files are considered active
  //also stores the most recent command from the console
  let stateMachine = {
    currentWindow: "none",
    currentCommand: "",
    currentProject: null,
  };

  let video = document.getElementById("vid");

  //global variable declarations
  let help =
    "> command list:  * help  * list projects  * start [project-name]  * clear";
  let projectsList = `> list of Projects:  *  ecobourne   *  trivia battler   *  hellcrawl `;
  let errorMsg = `> error - not recognized as internal or external command`;
  let noProj = `> error - no project currently selected`;
  let bootEco = `> starting ecobourne...`;
  let newTab = `> opening in new tab...`;
  let ecoDesc =
    " * > ecobourne is an animal life cycle simulation that puts a variety of animals in a digital environment to see how they develop and ineract with each other.  * Additional Options:  * > show video eco  * > github   * > exit";
  let hCDesc =
    " * > hellcrawl is an html5 game built on the canvas element to render everything. * The game had a simple setup for account creation which was set up with a MySql using sequelize as the ORM on the backend. The graphics were animated sprites that could be controlled by the user. * > Additional Options:  * > show video hellcrawl * > github *> exit";
  let triviaDesc =
    "  *  > the trivia game was my first full project in which two users could battle each other in a trivia game. In order to create a seperate session for each user local storage kept track of which player was which. The game then offered them a choice of category supplied by an existing trivia api that would pull varying amounts of questions based on what one player selected. Once both players had loaded in the game proceeded to test their knowledge, and congradulated the winner at the end with a gif from the giphy api.  *> Additional Options:  *> show video trivia   *> github  *> exit";
  let commandList = [
    "help",
    "list projects",
    "start ecobourne",
    "start hellcrawl",
    "start trivia",
    "clear",
    "github",
    "exit",
    "show video eco",
    "show video hellcrawl",
    "show video trivia",
  ];
  let windows = ["console", "text-file"];
  let zIndexCounter = 1;
  let charIndex = 0;

  function typeWriter(string, speed) {
    if (charIndex < string.length) {
      if (string.charAt(charIndex) == "*") {
        //makes sure to parse and line break at <br />
        $(".text-output").append("<br />");
        charIndex++;
      }
      jumpToBottom();
      $(".text-output").append(string.charAt(charIndex));
      charIndex++;

      setTimeout(function () {
        typeWriter(string, speed);
      }, speed);
    } else {
      charIndex = 0;
    }
  }

  function jumpToBottom() {
    $(".io")
      .stop()
      .animate(
        {
          scrollTop: $(".io")[0].scrollHeight,
        },
        800
      );
  }
  let homeDir = "C:\\Users\\Geoff";
  let addedDir = ">";

  //function that tests the input string to see if it is a valid command
  function testString(string) {
    $(".text-output").append(`<br />command: ${string}<br />`);

    if (commandList.includes(string)) {
      if (string == "help") {
        typeWriter(help, 0, 100);
      }

      if (string == "list projects") {
        typeWriter(projectsList, 0, 100);
      }
      if (string == "start ecobourne") {
        typeWriter(bootEco, 0, 100);
        addedDir = "\\ecobourne>";
        setTimeout(function () {
          stateMachine.currentProject = "eco";
          typeWriter(ecoDesc, 0, 100);
        }, 1000);
      }
      if (string == "start hellcrawl") {
        typeWriter(`> starting hellcrawl...`, 0, 100);
        addedDir = "\\hellcrawl>";
        setTimeout(function () {
          stateMachine.currentProject = "hellcrawl";
          typeWriter(hCDesc, 0, 100);
        }, 1000);
      }
      if (string == "start trivia") {
        typeWriter(`> starting trivia game...`, 0, 100);
        addedDir = "\\trivia>";
        setTimeout(function () {
          stateMachine.currentProject = "trivia";
          typeWriter(triviaDesc, 0, 100);
        }, 1000);
      }

      if (string === "exit" && stateMachine.currentProject) {
        stateMachine.currentProject = null;
        addedDir = ">";
        $(".text-output").empty();
      }
      $(".dir").html(homeDir + addedDir);

      // $(".text-output").empty();
      if (stateMachine.currentProject) {
        if (stateMachine.currentProject == "eco") {
          if (string === "github") {
            window.open("https://github.com/gardgeoff95/ecobourne-game-client");
          } else if (string === "show video eco") {
            $(".video-player").fadeIn();
            zIndexCounter++;
            $(".video-player").css("zindex", zIndexCounter);
            let videoplayer = document.getElementById("vid");
            video.requestFullscreen();
            videoplayer.play();
            video.addEventListener("ended", myHandler, false);

            function myHandler(e) {
              $(".video-player").fadeOut("fast");
            }
          }
        } else if (stateMachine.currentProject == "hellcrawl") {
          if (string === "github") {
            window.open("https://github.com/aznchronos/Project-2");
          } else if (string === " show video hellcrawl") {
            
          }
        } else if (stateMachine.currentProject == "trivia") {
          window.open("https://github.com/gardgeoff95/project-1");
        }
      }
    } else {
      typeWriter(errorMsg, 0, 100);
    }
    $(".text-input").empty();
    //auto scroll the console chatbox as you type
    jumpToBottom();
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
    } else if ($(this).hasClass("video-player")) {
      stateMachine.currentWindow = "video-player";
      $(".video-player").css("z-index", zIndexCounter);
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
    } else if (appType == "video-player") {
      $(".video-player").fadeOut("fast");
      video.pause();
      video.currentTime = 0;
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
        jumpToBottom();
      }
      //check for only alphabet keypressesh
      if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 32) {
        $(".text-input").append(e.key);
      }
    }
  });
});
