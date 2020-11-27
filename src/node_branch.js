import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

/**
 * 
 */

class node_branch extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("branch");
		this.addInput("in");
		this.addOutput("a");
		this.addOutput("b");
		this.output = new signal_proxy(this,"output",function(){});
	}
	
	/**
	 * 
	 */
	value_changed()
	{
	}
};

export default node_branch;
