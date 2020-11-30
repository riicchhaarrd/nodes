import {ctx} from "./nodes.js";
import node_t from "./node_t.js";

/**
 * 
 */

class signal {
	/**
	 * 
	 * @param {node_t} node 
	 * @param {string} label 
	 * @param {string} type 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} rad 
	 */
	constructor(node,label,type,x,y,rad)
	{
		this.node=node;
		this.label=label;
		this.type=type;
		this.x=x;
		this.y=y;
		this.radius = rad;
		/** @type {any} */
		this.state = "?";
		this.link = null;
	}
	
	/**
	 * 
	 * @param {object} v 
	 */
	set_state(v)
	{
		this.state = v;
		if(this.type == "output")
		{
			if(this.link != null)
			{
				this.link.set_state(v);
				this.link.node.value_changed();
			}
		}
	}
	
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	in_bounds(x, y)
	{
		let dx = x-(this.x+this.node.x);
		let dy = y-(this.y+this.node.y);
		let dist = dx*dx+dy*dy;
		return dist < this.radius*2;
	}
	
	/**
	 * 
	 */
	get_state()
	{
		if(this.type=="input")
		{
			if(this.link==null)
				return "?";
			return this.link.get_state();
		}
		return this.state;
	}
	
	/**
	 * 
	 */
	get_state_text()
	{
		if(typeof this.get_state() == "number" && !Number.isSafeInteger(this.get_state()))
		{
			return this.get_state().toFixed(2);
		}
		return this.get_state();
	}
	
	/**
	 * 
	 * @param {number} dx 
	 * @param {number} dy 
	 */
	move_relative(dx,dy)
	{
		this.x+=dx;
		this.y+=dy;
	}
	
	/**
	 * 
	 * @param {number} abs_x 
	 * @param {number} abs_y 
	 * @param {boolean} selected 
	 */
	draw(abs_x, abs_y, selected)
	{
		ctx.save();
		ctx.fillStyle="#fff";
		ctx.beginPath();
		ctx.arc(abs_x + this.x, abs_y + this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
		ctx.save();
		ctx.font="14px arial";
		ctx.strokeStyle=this.type=="input"?"green":"red";
		ctx.fillStyle=this.type=="input"?"green":"red";
		ctx.beginPath();
		ctx.arc(abs_x + this.x, abs_y + this.y, this.radius, 0, 2 * Math.PI);
		if(selected)
		ctx.fill();
		else
		ctx.stroke();
		
		ctx.fillText(this.get_state_text(), abs_x + this.x + 10, abs_y + this.y);
		
		ctx.save();
		ctx.fillText(this.label, abs_x+this.x+25,abs_y+this.y);
		ctx.restore();
		
		
		if(this.link != null)
		{
			ctx.beginPath();
			ctx.moveTo(abs_x + this.x,abs_y + this.y);
			let dx = this.link.x + this.link.node.x;
			let dy = this.link.y + this.link.node.y;
			ctx.bezierCurveTo(
				(abs_x + this.x + dx) / 2, abs_y + this.y,
				(abs_x + this.x + dx) / 2, dy,
				dx,dy
			);
			//ctx.lineTo(this.link.x,this.link.y);
			//ctx.closePath();
			ctx.stroke();
		}
		ctx.restore();
	}
}

export default signal;
