import node_stmt from "./node_stmt.js";

export default class node_print extends node_stmt
{
	constructor()
	{
		super("iprintln", "iprintln", {message:''});
	}
	
	value_changed()
	{
		console.log(this.inputs[1].get_state());
	}
};