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
		this.remove_all_inputs();
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state(parseFloat(prompt_proxy()));
	}
};

export default node_constant;
