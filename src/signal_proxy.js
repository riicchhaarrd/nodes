import node_t from "./node_t.js";
import signal from "./signal.js";

/**
 * 
 */

class signal_proxy extends signal
{
	/**
	 * 
	 * @param {node_t} node 
	 * @param {string} type 
	 * @param {any} [initial_value]
	 */
	constructor(node,type,initial_value)
	{
		super(node,"",type,0,0,0);
		this.state = initial_value;
	}
};

export default signal_proxy;
