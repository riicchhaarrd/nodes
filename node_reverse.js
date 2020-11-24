import node_t from "./node_t.js";

export default class node_reverse extends node_t
{
	constructor()
	{
		super("Reverse");
		this.remove_all_inputs();
		this.add_signal("input", "List|String")
	}
	
	set_initial_value()
	{
		this.output.set_state("todo");
	}
};
