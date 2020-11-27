/**
 * @type {CanvasRenderingContext2D}
 */
export var ctx = null;
/**
 * @type {HTMLCanvasElement}
 */
export var canvas = null;
export var dummy = true;
export var nodes = [];
/**
 * @type {node_t}
 */
export var main_node = null;
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
import node_text from "./node_text.js";
import node_color from "./node_color.js";
import node_constant from "./node_constant.js";
import node_entry from "./node_entry.js";
import node_cast_vec3 from "./node_cast_vec3.js";
import node_characters from "./node_characters.js";
import node_print from "./node_print.js";
import node_printbold from "./node_printbold.js";
import node_repeat from "./node_repeat.js";
import node_reverse from "./node_reverse.js";
import node_sort from "./node_sort.js";
import node_stringjoin from "./node_stringjoin.js";
import node_branch from "./node_branch.js";
import node_delay from "./node_delay.js";
import node_exit from "./node_exit.js";
import node_color2 from "./node_color2.js";
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
import node_tally from "./node_tally.js";
import node_vec3 from "./node_vec3.js";

/**
 * @function
 */

export function prompt_proxy()
{
	if(dummy)
		return;
	return prompt();
}

/**
 * 
 */

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
		load_nodes: function()
		{
			let tmp = window.localStorage.getItem("nodes");
			if(tmp != null)
			{
				let list = JSON.parse(tmp);
				for(let i = 0; i < list.length; ++i)
				{
					let inst = eval("new "+list[i]._classname+"()");
					//console.log(inst.constructor.name);
					inst.set_initial_value();
					inst.thaw(list[i]);
					nodes.push(inst);
				}
				return true;
			}
			return false;
		},
		add_node: function(n)
		{
			this.closeMenu();
			let o = new (n.constructor)();
			o.set_position(mouse_x, mouse_y);
			o.set_initial_value();
			nodes.push(o);
			
			this.save_nodes();
		},
		save_nodes: function()
		{
			let serializable_nodes = [];
			for(let i = 0; i < nodes.length; ++i)
			{
				let n = nodes[i];
				let serializable_node_data = n.freeze();
				serializable_nodes.push(serializable_node_data);
			}
			window.localStorage.setItem("nodes", JSON.stringify(serializable_nodes));
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

/**
 * @function
 */

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

/**
 * @function
 */

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

/**
 * @function
 */

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
		return false;
	}
	
	window.onkeyup=(ev)=>
	{
		if(ev.key==" ")
		{
			app.openMenu({
				clientX: mouse_x,
				clientY: mouse_y
			});
		} else if(ev.key == "q")
		{
			let gsc="main()\n{";
			//walk backwards from main_node
			let cur = main_node;
			for(;;)
			{
				console.log(cur);
				if(typeof cur.get_script==="function")
				gsc+=cur.get_script()+"\n";
				if(cur.outputs.length==0)
					break;
				if(cur.outputs[0].link==null)
					break;
				cur = cur.outputs[0].link.node;
			}
			gsc+="\n}";
			console.log(gsc);
		} else if(ev.key == "s")
		{
			app.save_nodes();
		}
		return false;
	};

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
	
	app.register_node(new node_text());
	app.register_node(new node_color2());
	app.register_node(new node_cast_vec3());
	app.register_node(new node_printbold());
	app.register_node(new node_print());
	app.register_node(new node_delay());
	app.register_node(new node_exit());
	app.register_node(new node_branch());
	app.register_node(new node_entry());
	app.register_node(new node_repeat());

	app.register_node(new node_reverse());
	app.register_node(new node_sort());
	app.register_node(new node_stringjoin());
	app.register_node(new node_tally());
	app.register_node(new node_characters());

	main_node = new node_entry();
	if(!app.load_nodes())
		nodes.push(main_node);
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
