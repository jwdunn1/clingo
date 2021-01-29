/*
 * Interfacing with clingo.js
 * Engineer: jWilliam Dunn
 * Based on code by potassco.org
 * January 2021
 *
 */

function useASP () {
  // Enable "run" button
  $("#run").attr("disabled", false);

  $("#run").click( function() {
    $("#out").empty();
    //$("#out").append('<p>Solving...</p>');
    main.launchSolver(code.value, useResults);
  });
}

function useResults (results) {
   $("#out").empty();
   $("#out").append(results);
   /*$("#output").append('<p>'+results.Result+'<br>'+
     'Models: '+results.Models.Number+'<br>'+
     'Time: '+results.Time.Total+'s</p>');
   for(let i=0; i<results.Models.Number; i++){
     $("#output").append('<p>Answer: '+(i+1)+'<br>'+results.Witnesses[i].Value+'</p>');
   }*/
}


/* Wait for jQuery to load before starting */
$(document).ready(function() {
  useASP(code.value);
});


var output = "";
Module = {
  preRun: [],
  postRun: [],
  print: (function() {
    return function(text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      output += text + "<br>";
      useResults(output);
    };
  })(),
  printErr: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    if (text == "Calling stub instead of signal()") { return; }
    var prefix = "pre-main prep time: ";
    if (typeof text=="string" && prefix == text.slice(0, prefix.length)) { text = "Ready to go!" }
    output += text + "<br>";
    useResults(output);
  },
  setStatus: function(text) {
    if (text == "") { run.disabled = false; }
    else {
      output += text + "<br>";
      useResults(output);
    }
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  }
};

var main = (function () {
    function launchSolver(code, callback) {
        output = "";
        Module.ccall('run', 'number', ['string', 'string'], [code, " --opt-mode=optN 0"]);
    };
    return {
        launchSolver : launchSolver
    }
})();