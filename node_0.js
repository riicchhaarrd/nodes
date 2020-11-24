import node_t from "./node_t.js";

export default class node_0 extends node_t
{
	constructor(x,y)
	{
		super("constant 0");
		this.remove_all_inputs();
	}
	
	set_initial_value()
	{
		this.output.set_state(0);
	}
};
