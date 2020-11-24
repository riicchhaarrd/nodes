import node_t from "./node_t.js";

export default class node_tally extends node_t
{
	constructor()
	{
		super("Tally");
		this.remove_all_inputs();
		this.add_signal("input", "string")
	}
	
	set_initial_value()
	{
		this.output.set_state("todo");
	}
};
