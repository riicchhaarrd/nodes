export var ctx = null;
export var canvas = null;
export var dummy=true;
export var nodes = [];
export var node_candidate = null;
export var signal_candidate = null;
export var moving = false;
export var selected_node = null;
export var selected_signal = null;

export var mouse_x = 0;
export var mouse_y = 0;

import signal_proxy from "./signal_proxy.js";
import node_0 from "./node_0.js";
import node_1 from "./node_1.js";
import node_color from "./node_color.js";
import node_constant from "./node_constant.js";
import node_extract_vec3 from "./node_extract_vec3.js";
import {
    node_mathop,
    node_mathop_mul,
    node_mathop_sub,
    node_mathop_div,
    node_mathop_add
} from "./node_mathops.js";
import node_normalize from "./node_normalize.js";
import node_rand from "./node_rand.js";
import node_t from "./node_t.js";
import node_vec3 from "./node_vec3.js";

export function prompt_proxy()
{
	if(dummy)
		return;
	return prompt();
}

var app = new Vue({
	el: "#app",
	data: function()
	{
		return {
			registered_nodes: []
		};
	},
	mounted: function()
	{
	},
	methods:
	{
		add_node: function(n)
		{
			this.closeMenu();
			let o = new (n.constructor)();
			o.set_position(mouse_x, mouse_y);
			o.set_initial_value();
			nodes.push(o);
		},
		register_node: function(n)
		{
			this.registered_nodes.push(n);
		},
		closeMenu: function()
		{
			let menu = document.getElementById("menu");
			menu.style.display="none";
		},
		openMenu: function(ev)
		{
			let menu = document.getElementById("menu");
			menu.style.left = ev.clientX;
			menu.style.top = ev.clientY;
			menu.style.display="block";
		}
	}
});

function get_selected_node()
{
	for(let itx in nodes)
	{
		let node = nodes[itx];
		if(node.in_bounds(mouse_x,mouse_y))
			return node;
	}
	return null;
}

function draw()
{
	if(ctx==null)return;
	if(selected_node != null && moving)
	{
		selected_node.move_absolute(mouse_x,mouse_y);
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let itx in nodes)
	{
		let node = nodes[itx];
		let selected = node.in_bounds(mouse_x,mouse_y);
		node.draw(node_candidate == node || selected || node == selected_node);
		
		if(node.link != null)
		{
			ctx.beginPath();
			ctx.moveTo(node.x,node.y);
			ctx.lineTo(node.link.x,node.link.y);
			ctx.closePath();
			ctx.stroke();
		}
	}
	window.requestAnimationFrame(draw);
}

function init()
{
	//https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	  if (w < 2 * r) r = w / 2;
	  if (h < 2 * r) r = h / 2;
	  this.beginPath();
	  this.moveTo(x+r, y);
	  this.arcTo(x+w, y,   x+w, y+h, r);
	  this.arcTo(x+w, y+h, x,   y+h, r);
	  this.arcTo(x,   y+h, x,   y,   r);
	  this.arcTo(x,   y,   x+w, y,   r);
	  this.closePath();
	  return this;
	}
	canvas = document.getElementsByTagName("canvas")[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	
	window.onmouseup=(ev)=>
	{
		moving=false;
		selected_node=null;
	};

	window.oncontextmenu=(ev)=>
	{
		app.openMenu(ev);
		return false;
	}

	window.onmousedown=(ev)=>
	{
		if(ev.buttons!=1)
		{
			let node_index = null;
			for(let itx in nodes)
			{
				let node = nodes[itx];
				if(node.in_bounds(ev.clientX,ev.clientY))
				{
					node_index = itx;
					break;
				}
			}
			if(node_index != null)
			{
				nodes[node_index].remove();
				nodes.splice(node_index, 1);
			}
			return false;
		}
		let node = get_selected_node();
		selected_node=node;
		if(node!=null)
		{
			let sig = node.get_selected_signal(mouse_x, mouse_y);
			if(sig == null)
				moving=true;
		}
	};

	window.onmousemove=(ev)=>
	{
		mouse_x = ev.clientX; mouse_y = ev.clientY;
		
		//get current elements under mouse

		node_candidate = get_selected_node();
	};

	window.onkeydown=(ev)=>
	{
	};

	window.onclick=(ev)=>
	{
		app.closeMenu();
		let node = get_selected_node();
		if(node!=null)
		{
			let inp = node.get_selected_signal(ev.clientX, ev.clientY);
			if(inp != null)
			{
				if(selected_signal != null && inp != selected_signal && inp.type != selected_signal.type)
				{			
					if(selected_signal.link!=null&&selected_signal.type!="output")
						selected_signal.link.link=null;
					if(inp.link!=null&&inp.link.link!=null)
						inp.link.link=null;
					selected_signal.link = inp;
					inp.link=selected_signal;
					selected_signal=null;
					node.value_changed();
				} else
					selected_signal = inp;
			}
		}
	};
	
	app.register_node(new node_rand());
	app.register_node(new node_color());
	app.register_node(new node_0());
	app.register_node(new node_1());
	app.register_node(new node_mathop_mul());
	app.register_node(new node_mathop_div());
	app.register_node(new node_mathop_add());
	app.register_node(new node_mathop_sub());
	app.register_node(new node_normalize());
	app.register_node(new node_extract_vec3());
	app.register_node(new node_constant());
	app.register_node(new node_vec3());
}

window.requestAnimationFrame(()=>
{
	//ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
	init();
	window.requestAnimationFrame(draw);
	dummy=false;
});

export default {
    a: 1,
    b: 2,
    c: 3
};