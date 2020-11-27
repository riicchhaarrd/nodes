import node_t from "./node_t.js";

/**
 * 
 */

class node_1 extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("constant 1");
		this.output = this.addOutput("number");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state(1);
	}
};

export default node_1;
