import node_t from "./node_t.js";

export default class node_rand extends node_t
{
	constructor()
	{
		super("random");
		this.output.set_state(Math.random());
		this.remove_all_inputs();
	}
};
