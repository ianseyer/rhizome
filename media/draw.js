var canvas = Snap("svg");
var color_palette=['#FF0000', '#0000FF', '#FFFF00'];
var alphabet='abcdefghijklmnopqrstuvwxyz';
var window_padding = 100;

/* 
mini documentation of snavsvg:
var t1 = paper.line(50, 50, 100, 100);
paper.circle(50, 50, 40).attr({
    fill: g
});
*/
var struct = function(num_points, color){
	/* structs are a JSON array of: {color: val, label:val, coords:[coord,coord]}
		they are the schema for connecting the points. internally, all points are connected to all other points. */

	var coords = $.map(alphabet.slice(1, num), function(single_letter){return {single_letter: [Math.random(window.width-window_padding), 
		Math.random(window.height-window_padding)]}})

	return {color: coords}
};

var generate_the_structs = function(num_structs){
	var the_structs = [];

	for(var index = 0; index<num_structs; index++){
		the_structs.append(struct(Math.random(10), color_palette[Math.random(0, color_palette.length - 1)]))
	}

	return the_structs
};

var draw = function(num_structs){
	/* structs are the source
	of point data. */
	var the_structs = generate_the_structs(num_structs);

	$.map(the_structs, function(struct){
		//draw the points
		canvas.circle(struct['coords'][0], struct['coords'][1])
			.attr(stroke:struct['color'], strokeWidth: 1, fill:'#FF0000', fillOpacity:0)
	});
};

$(document).ready(function(){
	console.log(color_palette)
	draw(3);
});