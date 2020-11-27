import node_t from "./node_t.js";

/**
 * 
 */

class node_rand extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("random");
		this.output.set_state(Math.random());
		this.remove_all_inputs();
	}
};

export default node_rand;