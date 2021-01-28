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
    $("#output").append('<pre>Solving...</pre>');
		clingon.groundAndSolve (code.value, useResults);
	});

}


/* Callback function to pass to groundAndSolve that gets called when it has finished,
 * recieving the solutions as a parameter
 */
function useResults (results) {
   console.log(results);
	 $("#output").append('<pre>'+results.Result+'<br>'+
	   'Models: '+results.Models.Number+'<br>'+
     'Time: '+results.Time.Total+'s</pre>');
   for(let i=0; i<results.Models.Number; i++){
     $("#output").append('<pre>Answer:'+(i+1)+'<br>'+results.Witnesses[i].Value+'</pre>');
   }
}


/* Wait for jQuery to load before starting */
$(document).ready(function() {

	// Load the ASP code from graph.lp and call useASP function when it's done
	//clingon.loadASP ("graph.lp", useASP);
	useASP(code.value);

});
