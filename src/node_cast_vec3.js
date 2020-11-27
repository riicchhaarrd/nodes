import node_t from "./node_t.js";
import vec3 from "./vec3.js";

/**
 * 
 */

class node_cast_vec3 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("cast vec3");
		this.remove_all_inputs();
		this.add_signal("input");
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		let v = this.inputs[0].get_state();
		if(!isNaN(v))
		{
			this.output.set_state(new vec3(v,v,v));
		}
	}
};

export default node_cast_vec3;
