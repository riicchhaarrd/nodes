import node_t from "./node_t.js";

/**
 * 
 */

class node_stringjoin extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("StringJoin");
		this.input = this.addInput("list of chars");
		this.output = this.addOutput("out");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state("");
	}
	
	/**
	 * 
	 */
	value_changed() {
		var o;
		let input = this.input.get_state();
		if (input instanceof Array) {
			o = input.join("");
		}
		this.output.set_state(o);
	}
};

export default node_stringjoin;
