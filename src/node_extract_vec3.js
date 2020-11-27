import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

/**
 * 
 */

class node_extract_vec3 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("vec3 to 3-floats");
		this.input = this.addInput("input");
		this.outputX = this.addOutput("x");
		this.outputY = this.addOutput("y");
		this.outputZ = this.addOutput("z");
		this.output = new signal_proxy(this, "output");
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		let a = this.input.get_state();
		if(typeof a == "object" && a.constructor.name == "vec3")
		{
			this.outputX.set_state(a.x);
			this.outputY.set_state(a.y);
			this.outputZ.set_state(a.z);
		} else
		{
			this.outputX.set_state(a);
			this.outputY.set_state(a);
			this.outputZ.set_state(a);
		}
	}
};

export default node_extract_vec3;
