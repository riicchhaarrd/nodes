import node_t from "./node_t.js";

/**
 * 
 */

class node_reverse extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("Reverse");
		this.input = this.addInput("List|String");
		this.output = this.addOutput("output");
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
		if (typeof input == "string") {
			o = input.split("").reverse().join("");
		}
		if (input instanceof Array) {
			var copy = input.splice(0);
			o = copy.reverse();
		}
		this.output.set_state(o)
	}
};

export default node_reverse;
