import node_t from "./node_t.js";
import vec3 from "./vec3.js";
import {prompt_proxy} from "./nodes.js";

/**
 * 
 */

class node_vec3 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("vec3");
		this.output = this.addOutput("vec3");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state(
			new vec3(
				parseFloat(prompt_proxy()),
				parseFloat(prompt_proxy()),
				parseFloat(prompt_proxy())
			)
		);
	}

	/**
	 * 
	 */
	freeze()
	{
		var frozenfood = super.freeze();
		var state = this.output.get_state();
		frozenfood.extra = {
			x: state.x,
			y: state.y,
			z: state.z
		}
		return frozenfood;
	}
	
	/**
	 * 
	 * @param {object} o 
	 */
	thaw(o)
	{
		var tmp = o.extra;
		if (tmp) {
			this.output.set_state(
				new vec3(tmp.x, tmp.y, tmp.z)
			);
		}
		super.thaw(o);
	}
};

export default node_vec3;
