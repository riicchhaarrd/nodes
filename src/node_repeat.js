import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

/**
 * 
 */

class node_repeat extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("repeater");
		this.addOutput("output");
		this.output = new signal_proxy(this,"output",function(){});
	}
	
	/**
	 * 
	 */
	value_changed()
	{
	}
};

export default node_repeat;
