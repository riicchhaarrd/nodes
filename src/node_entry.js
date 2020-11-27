import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

/**
 * 
 */

class node_entry extends node_t
{
	constructor()
	{
		super("entry point / main");
		this.addOutput("output");
		this.output = new signal_proxy(this,"output",function(){});
	}
};

export default node_entry;
