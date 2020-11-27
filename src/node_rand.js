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
		this.output = this.addOutput("number");
	}

	/**
	 * 
	 */
	set_initial_value() {
		this.output.set_state(Math.random());
	}
};

export default node_rand;