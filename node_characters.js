import node_t from "./node_t.js";

export default class node_characters extends node_t
{
	constructor()
	{
		super("Characters");
		this.remove_all_inputs();
		this.add_signal("input", "string")
	}
	
	set_initial_value()
	{
		this.output.set_state("todo");
	}
};
