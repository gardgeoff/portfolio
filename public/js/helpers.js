let charIndex = 0;



export default function typeWriter(string, speed) {
    if (charIndex < string.length) {
      if (string.charAt(charIndex) == '*' ) {
        
        //makes sure to parse and line break at <br />
        $(".text-output").append("<br />");
        charIndex++;
       
      }
      $(".text-output").append(string.charAt(charIndex));
      charIndex++;

      setTimeout(function () {
        typeWriter(string, speed);
      }, speed);
    } else {
    
      charIndex = 0;
    }
  }
  
