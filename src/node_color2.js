import node_t from "./node_t.js";

/**
 * 
 */

class node_color2 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("color2");
		this.input = this.addInput("input");
		this.output = this.addOutput("output");
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		let v = this.input.get_state();
		if(typeof v == "object" && v.constructor.name == "vec3")
		{
			this.color = "rgb("+(v.x*255)+","+(v.y*255)+","+(v.z*255)+")";
			this.output.set_state(v);
		}
	}
};

export default node_color2;
