import node_t from "./node_t.js";

/**
 * 
 */

class node_characters extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("Characters");
		this.input = this.addInput("string");
		this.output = this.addOutput("list");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		this.output.set_state([]);
	}

	/**
	 * 
	 */
	value_changed() {
		var o;
		let input = this.input.get_state();
		if (typeof input == "string") {
			o = input.split("");
		}
		this.output.set_state(o)
	}
};

export default node_characters;
