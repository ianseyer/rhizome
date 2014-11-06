var canvas = Snap("svg");
var color_palettes=[['#000000', '#0A0A0A', '#A0A0A0'],
					['#F1DF91', '#BEC38D', '#7B9D88', '#387782', '#055B7E'],
					['#ABC84B', '#F8F5E7']];
var alphabet="We are the hollow men We are the stuffed men Leaning together Headpiece filled with straw. Alas! Our dried voices, when We whisper together Are quiet and meaningless As wind in dry grass Or rats' feet over broken glass In our dry cellar".split(" ");
var padding = 20;
var color_palette = color_palettes[2]

document.body.style.backgroundColor = color_palette[0];
/* 
mini documentation of snavsvg:
var t1 = paper.line(50, 50, 100, 100);
paper.circle(50, 50, 40).attr({
    fill: g
});
*/

// H E L P E R S
function generate_opacity(){random = Math.random(); if(random-.2 > 0){return random-.2} else {return random}}
function random_range(min, max){return Math.round(Math.random() * (max-min) + min)}



console.log('width: '+$(window).width())
console.log('height: '+$(window).height())

function struct(num_points, the_color){
	/* structs are a JSON array of: {the_color: val, label:val, coords:[coord,coord]}
		they are the schema for connecting the points. internally, all points are connected to all other points. */


	var points = [];
	for(var index = 0; index<num_points-1; index++){
		var point = {"color":the_color, "label":"", "coords":[random_range(padding, $(window).width()-padding), random_range(padding, $(window).height()-padding)]}
		point['label'] = alphabet[index]
		points.push(point)
	}
	return points
};

function generate_the_structs(num_structs){
	var list_of_structs = [];

	for(var index = 0; index<num_structs; index++){
		individual_struct = struct(12, color_palette[random_range(0, color_palette.length)])
		list_of_structs.push(individual_struct);
	}
	return list_of_structs;
};

function line_to_polygon(one, two, three, color, opacity){
	canvas.polygon(one[0], one[1], two[0], two[1], three[0], three[1]).attr({fill:color, fillOpacity:opacity})
}

function draw_lines(struct){
	/*
	connect every point to every other point via a line.
	origin_point is the point index (within the struct) from which to draw the lines
	*/

	for(var index = 0; index<struct.length-1; index++){
		origin = struct[index]
		for(var index2 = 0; index2<struct.length-4; index2++){
			if(struct[index2] != origin){
				canvas.line(origin['coords'][0], origin['coords'][1], 
							struct[index2]['coords'][0], struct[index2]['coords'][1])
							.attr({stroke:origin['color'], strokeWidth: 1, strokeOpacity: .3})
			}
		}
	}
}
function draw_faces(struct){
	for(var index = 0; index<struct.length-1; index++){
		origin = struct[index]
		for(var index3 = 0; index3<struct.length-1; index3+=1){
			line_to_polygon([struct[index3]['coords'][0], struct[index3]['coords'][1]], 
							[struct[index3+1]['coords'][0], struct[index3+1]['coords'][1]],
							[struct[index3+2]['coords'][0], struct[index3+2]['coords'][1]],
							origin['color'], .05)
		}
	}
}
function draw_text(struct){
	for(var index = 0; index<struct.length-1; index++){
		canvas.text(struct[index]['coords'][0], struct[index]['coords'][1], struct[index]['label'])
			.attr({fill:'black', fillOpacity:.9})
	}
}
function draw_circles(struct){
	for(var index = 0; index<struct.length-1; index++){
		for(var point_index = 0; point_index<struct[index].length; point_index++){
			console.log(struct[point_index])
			canvas.circle(struct[point_index]['coords'][0], struct[point_index]['coords'][1], 2).
			attr({fill:'#FF0000', fillOpacity:0, stroke:struct[point_index]['color'], strokeWidth: 1})
		}
	}
}
function draw_structs(num_structs){
	var canvas = Snap("svg");
	var the_structs = generate_the_structs(num_structs);
	console.log(the_structs)
	console.log(generate_opacity)
	for(var index = 0; index<num_structs; index++){
		draw_lines(the_structs[index])
		draw_text(the_structs[index])
		draw_faces(the_structs[index])
	}
};

function randomize_color_palette_selection(){
	if(color_palette){
		color_palette = color_palettes[random_range(0, color_palettes.length)];
	}
}
function randomize_background_color(){
	var color = window.color_palette[random_range(0, color_palette.length)]
	document.body.style.backgroundColor = color;
}
function draw(){

	//empty the current svg container
	$(".svg").empty();
	//randomize_color_palette_selection();
	//randomize_background_color();
	console.log(generate_opacity())
	//randomize_color_palette_selection();
	//document.body.style.backgroundColor = background_color;

	//redraw
	draw_structs(random_range(1,1))
	var svg = $('svg')/*new Walkway('.svg', {});

	svg.draw(function() {
	  console.log('Animation finished');
	});*/
}
$(document).ready(function(){
	/*$(document).on('click', function(){
		draw();
	})*/
	 window.clearInterval();
	$(document).on('click', function(){
		window.clearInterval(window.interval)
		var time_in_between = 0; //in seconds
		window.interval = window.setInterval(function(){
			time_in_between += .001
		}, 1)
		$(document).on('click', function(){
				window.clearInterval(window.interval)
				window.interval = window.setInterval(function(){
					window.clearInterval();
					draw()
				}, (60/time_in_between))
			})
		//window.location.reload()
	})
});