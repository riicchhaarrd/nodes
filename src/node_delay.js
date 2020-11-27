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
		this.add_signal("output", "exec");
	}
};

export default node_delay;
