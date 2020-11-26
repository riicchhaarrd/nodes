import node_t from "./node_t.js";
import signal_proxy from "./signal_proxy.js";

export default class node_extract_vec3 extends node_t
{
	constructor()
	{
		super("vec3 to 3-floats");
		this.remove_all_inputs();
		this.remove_all_outputs();
		this.add_signal("input");
		this.add_signal("output");
		this.add_signal("output");
		this.add_signal("output");
		
		this.output = new signal_proxy(this,"output");
	}
	
	value_changed()
	{
		let a = this.inputs[0].get_state();
		if(typeof a == "object" && a.constructor.name == "vec3")
		{
			this.outputs[0].set_state(a.x);
			this.outputs[1].set_state(a.y);
			this.outputs[2].set_state(a.z);
		} else
		{
			this.outputs[0].set_state(a);
			this.outputs[1].set_state(a);
			this.outputs[2].set_state(a);
		}
	}
};
