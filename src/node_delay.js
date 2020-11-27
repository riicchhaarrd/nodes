import node_stmt from "./node_stmt.js";

/**
 *
 */

class node_delay extends node_stmt
{
	/**
	 * 
	 */
	constructor()
	{
		super("delay", "wait", {seconds:''});
		this.output = this.addOutput("exec");
	}
};

export default node_delay;
