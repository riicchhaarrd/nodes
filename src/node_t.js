import {
    ctx,
    mouse_x,
    mouse_y,
    selected_signal
} from "./nodes.js";
import signal from "./signal.js";

class node_t
{
	/**
	 * 
	 * @param {string} text 
	 */
	constructor(text)
	{
		this.x = 0;
		this.y = 0;
		this.color = "rgb(255,255,255)";
		ctx.font="24px arial";
		let m = ctx.measureText(text);
		this.width = m.width * 2;
		this.height = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) * 3;
		this.text = text;
		/**
		 * @type {signal|null}
		 */
		this.link = null;
		this.io_radius = this.height / 8;
		/**
		 * @type {signal[]}
		 */
		this.signals = [];
		/**
		 * @type {signal[]}
		 */
		this.inputs = [];
		/**
		 * @type {signal[]}
		 */
		this.outputs=[];
	}
	
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	set_position(x, y)
	{
		this.x=x;
		this.y=y;
	}
	
	/**
	 * @returns {string}
	 */
	get_label()
	{
		return this.text;
		//this.output.state.constructor.name
	}

	/**
	 * 
	 */
	
	set_initial_value()
	{
	}
	
	/**
	 * 
	 */

	freeze()
	{
		return {
			_classname: this.constructor.name,
			x: this.x,
			y: this.y
		};
	}
	
	/**
	 * 
	 * @param {object} o 
	 */

	thaw(o)
	{
		//load data from o
		this.x = o.x;
		this.y = o.y;
	}

	/**
	 * 
	 */
	remove_all_inputs()
	{
		for(let i = this.signals.length - 1; i>=0; i--)
		{
			if(this.signals[i].type=="input")
				this.signals.splice(i, 1);
		}
		this.inputs = [];
	}
	
	/**
	 * 
	 */
	remove_all_outputs()
	{
		for(let i = this.signals.length - 1; i>=0; i--)
		{
			if(this.signals[i].type=="output")
				this.signals.splice(i, 1);
		}
		this.outputs = [];
		this.output = null;
	}
	
	/**
	 * 
	 */
	value_changed()
	{
	}
	
	/**
	 * 
	 * @param {string} type 
	 * @param {string} label
	 * @returns {signal}
	 */
	add_signal(type, label)
	{
		if(type == "input")
		{
			let sig = new signal(this, label, "input", 0,(this.inputs.length+1)*this.io_radius*3-this.io_radius/2,this.io_radius);
			this.height+=(this.signals.length)*this.io_radius*3-this.io_radius/2;
			this.inputs.push(sig);
			this.signals.push(
				sig
			);
			return sig;
		} else if(type == "output")
		{
			let sig = new signal(this, label, "output", this.width,(this.outputs.length+1)*this.io_radius*3-this.io_radius/2,this.io_radius);
			this.output = sig;
			this.signals.push(
				sig
			);
			this.outputs.push(sig);
			return sig;
		}
	}

	/**
	 * 
	 * @param {string} label 
	 * @returns {signal}
	 */

	addInput(label) {
		return this.add_signal("input", label);
	}
		
	/**
	 * 
	 * @param {string} label
	 * @returns {signal}
	 */

	addOutput(label) {
		return this.add_signal("output", label);
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	move_absolute(x,y)
	{
		let dx = x-this.x;
		let dy = y-this.y;

		this.x += dx;
		this.y += dy;
		/*
		for(let inp in this.signals)
		{
			this.signals[inp].move_relative(dx,dy);
		}
		*/
	}
	
	/**
	 * 
	 */
	remove()
	{
		for(let itx in this.signals)
		{
			let sig = this.signals[itx];
			if(sig.link != null)
			{
				sig.link.link = null;
				sig.link.node.value_changed();
			}
		}
	}
	
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	get_selected_signal(x,y)
	{
		for(let inp in this.signals)
		{
			if(this.signals[inp].in_bounds(x,y))
				return this.signals[inp];
		}
		return null;
	}
	
	/**
	 * 
	 * @param {boolean} selected 
	 */
	draw(selected)
	{
		/*
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.closePath();
		ctx.stroke();
		*/
		
		let rad=10;
		ctx.save();
		
		ctx.save();
			//ctx.fillStyle="#aaa";
			let angle = 90 * (Math.PI / 180);
			let f = 0.9;
			let grd = ctx.createLinearGradient(this.x,this.y+this.height*f,this.x+Math.cos(angle)*this.width,this.y+Math.sin(angle)*this.height);
			grd.addColorStop(0, this.color);
			grd.addColorStop(1, "#aaa");

			// Fill with gradient
			ctx.fillStyle = grd;
			ctx.roundRect(this.x,this.y,this.width,this.height,rad).fill();
			//ctx.fillStyle="#ccc";
			//ctx.roundRect(this.x,this.y,this.width,this.height*f,rad).fill();
		ctx.restore();
		
		if(selected)
			ctx.lineWidth = 4;
		ctx.strokeStyle="#333";
		ctx.roundRect(this.x,this.y,this.width,this.height,rad).stroke();
		ctx.restore();
		ctx.fillText(this.text, this.x + this.width * (0.25), this.y + this.height - this.height * (1/3));
		
		// Write type of this.output
		if (this.output) {
			ctx.save();
			ctx.font="12px arial";
			ctx.fillText(this.output.state==null?"null":this.output.state.constructor.name, this.x + this.width * (0.25), this.y + this.height - 5);		
			ctx.restore();
		}

		for(let signal of this.signals)
		{
			let selected = signal.in_bounds(mouse_x,mouse_y);
			signal.draw(this.x,this.y,selected || selected_signal == signal);
		}
	}
	
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	in_bounds(x, y)
	{
		let v = 30;
		let tx = this.x - v;
		let ty = this.y - v;
		let tw = this.width + v * 2;
		let th = this.height + v * 2;
		return x >= tx && x <= tx + tw && y >= ty && y <= ty + th;
	}

	/**
	 * @returns {string}
	 */
	hash() {
		return this.x + "-" + this.y;
	}
};

export default node_t;
