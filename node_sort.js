import node_t from "./node_t.js";

export default class node_sort extends node_t
{
	constructor()
	{
		super("Sort");
		this.remove_all_inputs();
		this.add_signal("input", "List");
	}
	
	set_initial_value()
	{
		this.output.set_state("todo");
	}
};
