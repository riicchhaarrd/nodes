import node_t from "./node_t.js";

/**
 * 
 */

class node_0 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("constant 0");
		this.output = this.addOutput("constant");
	}

	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state(0);
	}
};

export default node_0;
