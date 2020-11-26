import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

export default class node_branch extends node_t
{
	constructor()
	{
		super("branch");
		this.remove_all_inputs();
		this.add_signal("input");
		this.remove_all_outputs();
		this.add_signal("output");
		this.add_signal("output");
		this.output = new signal_proxy(this,"output",function(){});
	}
	
	value_changed()
	{
	}
};