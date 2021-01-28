/*
 * An example main program that calls and uses clingon functions
 *
 * Uses jQuery
 */

/* Callback function to pass to loadASP that gets called when it has finished
 */
function useASP () {

  // Enable "run" button
  $("#run").attr("disabled", false);

  $("#run").click( function() {
    $("#output").empty();
    $("#output").append('<p>Solving...</p>');
    clingon.groundAndSolve (code.value, useResults);
  });

}


/* Callback function to pass to groundAndSolve that gets called when it has finished,
 * recieving the solutions as a parameter
 */
function useResults (results) {
   console.log(results);
   $("#output").append('<p>'+results.Result+'<br>'+
     'Models: '+results.Models.Number+'<br>'+
     'Time: '+results.Time.Total+'s</p>');
   for(let i=0; i<results.Models.Number; i++){
     $("#output").append('<p>Answer: '+(i+1)+'<br>'+results.Witnesses[i].Value+'</p>');
   }
}


/* Wait for jQuery to load before starting */
$(document).ready(function() {

  // Load the ASP code from graph.lp and call useASP function when it's done
  //clingon.loadASP ("graph.lp", useASP);
  useASP(code.value);

});
