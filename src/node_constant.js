import {prompt_proxy} from "./nodes.js";
import node_t from "./node_t.js";

/**
 * 
 */

class node_constant extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("constant");
		this.output = this.addOutput("number");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state(parseFloat(prompt_proxy()));
	}

	/**
	 * 
	 */
	freeze()
	{
		var frozenfood = super.freeze();
		frozenfood.constant = this.output.get_state();
		return frozenfood;
	}
	
	/**
	 * 
	 * @param {object} o 
	 */
	thaw(o)
	{
		this.output.set_state(o.constant);
		super.thaw(o);
	}
};

export default node_constant;
