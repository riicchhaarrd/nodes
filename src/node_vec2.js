import node_t from "./node_t.js";
import vec2 from "./vec2.js";
import {prompt_proxy} from "./nodes.js";

/**
 * 
 */

class node_vec2 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("vec2");
		this.output = this.addOutput("vec2");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state(
			new vec2(
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
			y: state.y
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
				new vec2(tmp.x, tmp.y)
			);
		}
		super.thaw(o);
	}
};

export default node_vec2;
