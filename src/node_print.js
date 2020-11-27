import node_stmt from "./node_stmt.js";

/**
 * 
 */

class node_print extends node_stmt
{
	/**
	 * 
	 */
	constructor()
	{
		super("iprintln", "iprintln", {message:''});
		this.input = this.addInput("input")
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		console.log(this.input.get_state());
	}
};

export default node_print;
