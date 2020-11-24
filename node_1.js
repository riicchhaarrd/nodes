import node_t from "./node_t.js";

export default class node_1 extends node_t
{
	constructor()
	{
		super("constant 1");
		this.output.set_state(1);
		this.remove_all_inputs();
	}
	
	set_initial_value()
	{
		this.output.set_state(1);
	}
};
