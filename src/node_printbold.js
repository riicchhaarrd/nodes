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
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		console.log(this.inputs[1].get_state());
	}
};

export default node_printbold;
