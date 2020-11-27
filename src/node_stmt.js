import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

/**
 * 
 */

class node_stmt extends node_t
{
	/**
	 * 
	 * @param {string} n 
	 * @param {string} func_name 
	 * @param {object} parms 
	 */
	constructor(n, func_name, parms)
	{
		super(n);
		this.func_name = func_name;
		this.parms = [];
		this.addInput("exec");
		for(let itx in parms)
			this.add_signal("input", itx);
		this.output = new signal_proxy(this,"output",function(){});
	}
	
	/**
	 * 
	 */
	value_changed()
	{
	}
	
	/**
	 * 
	 */
	get_script()
	{
		//first arg is a exec input
		let args=[];
		for(let i = 1; i < this.inputs.length; ++i)
		{
			let arg = this.inputs[i].get_state();
			if(typeof arg === "string")
				args.push("\""+arg+"\"");
			else
				args.push(arg);
		}
		return this.func_name+"("+args.join(",")+");";
	}
};

export default node_stmt;
