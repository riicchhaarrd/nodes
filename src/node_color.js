import node_t from "./node_t.js";
import vec3 from "./vec3.js";

/**
 * 
 */

class node_color extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("color");
		this.r = this.addInput("r");
		this.g = this.addInput("g");
		this.b = this.addInput("b");
		this.output = this.addOutput("vec3");
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		let r = this.r.get_state();
		let g = this.g.get_state();
		let b = this.b.get_state();
		if(!isNaN(r) && !isNaN(g) && !isNaN(b))
		{
			this.color = "rgb("+(r*255)+","+(g*255)+","+(b*255)+")";
		}
		this.output.set_state(new vec3(r,g,b));
	}

	/**
	 * 
	 */
	freeze()
	{
		var frozenfood = super.freeze();
		frozenfood.r = this.r.get_state();
		frozenfood.g = this.g.get_state();
		frozenfood.b = this.b.get_state();
		return frozenfood;
	}
	
	/**
	 * 
	 * @param {object} o 
	 */
	thaw(o)
	{
		this.r.set_state(o.r);
		this.g.set_state(o.g);
		this.b.set_state(o.b);
		super.thaw(o);
	}
};

export default node_color;
