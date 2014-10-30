var canvas = Snap("svg");
var color_palette=['#655643', '#80BCA3', '#F6F7BD', '#E6AC27', '#BF4D28'];
var alphabet="We are the hollow men We are the stuffed men Leaning together Headpiece filled with straw. Alas! Our dried voices, when We whisper together Are quiet and meaningless As wind in dry grass Or rats' feet over broken glass In our dry cellar".split(" ");
var padding = 30;

/* 
mini documentation of snavsvg:
var t1 = paper.line(50, 50, 100, 100);
paper.circle(50, 50, 40).attr({
    fill: g
});
*/
var random_range = function(min, max){return Math.round(Math.random() * (max-min) + min)}
console.log('width: '+$(window).width())
console.log('height: '+$(window).height())
function struct(num_points, the_color){
	/* structs are a JSON array of: {the_color: val, label:val, coords:[coord,coord]}
		they are the schema for connecting the points. internally, all points are connected to all other points. */


	var points = [];
	for(var index = 0; index<num_points-1; index++){
		var point = {"color":the_color, "label":alphabet[index], "coords":[random_range(padding, $(window).width()-padding), random_range(padding, $(window).height()-padding)]}
		points.push(point)
	}
	return points
};
function generate_the_structs(num_structs){
	var list_of_structs = [];

	for(var index = 0; index<num_structs; index++){
		individual_struct = struct(7, color_palette[random_range(0, color_palette.length)])
		list_of_structs.push(individual_struct);
	}
	return list_of_structs;
};

function line_to_polygon(one, two, three, color, opacity){
	canvas.polygon(one[0], one[1], two[0], two[1], three[0], three[1]).attr({fill:color, fillOpacity: opacity})
}

function draw_lines(struct){
	/*
	connect every point to every other point via a line.
	origin_point is the point index (within the struct) from which to draw the lines
	*/

	for(var index = 0; index<struct.length-1; index++){
		origin = struct[index]
		for(var index2 = 0; index2<struct.length-1; index2++){
			if(struct[index2] != origin){
				canvas.line(origin['coords'][0], origin['coords'][1], 
							struct[index2]['coords'][0], struct[index2]['coords'][1])
							.attr({stroke:origin['color'], strokeWidth: 1, strokeOpacity: .2})
			}
		}
		for(var index3 = 0; index3<struct.length-3; index3+=3){
			line_to_polygon([struct[index3]['coords'][0], struct[index3]['coords'][1]], 
							[struct[index3+1]['coords'][0], struct[index3+1]['coords'][1]],
							[struct[index3+2]['coords'][0], struct[index3+2]['coords'][1]],
							origin['color'], Math.random()-.75)
		}
	}
}
function draw_text(struct){
	for(var index = 0; index<struct.length-1; index++){
		canvas.text(struct[index]['coords'][0], struct[index]['coords'][1], struct[index]['label'])
			.attr({fill:'black', fillOpacity: .8})
	}
}
function draw(num_structs){
	var canvas = Snap("svg");
	var the_structs = generate_the_structs(num_structs);
	console.log(the_structs)
	for(var index = 0; index<num_structs; index++){
		/*for(var point_index = 0; point_index<the_structs[index].length; point_index++){
			canvas.circle(the_structs[index][point_index]['coords'][0], the_structs[index][point_index]['coords'][1], 2).
			attr({fill:'#FF0000', fillOpacity:0, stroke:the_structs[index][point_index]['color'], strokeWidth: 1})
		}*/
		console.log(the_structs[index])
		draw_lines(the_structs[index])
		draw_text(the_structs[index])
	}
};

$(document).ready(function(){
	draw(random_range(1,1));
});