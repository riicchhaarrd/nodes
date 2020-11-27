import node_stmt from "./node_stmt.js";

/**
 * 
 */

class node_printbold extends node_stmt
{
	/**
	 * 
	 */
	constructor()
	{
		super("iprintlnbold", "iprintlnbold", {message:''});
		this.input = this.addInput("input");
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		console.log(this.input.get_state());
	}
};

export default node_printbold;
