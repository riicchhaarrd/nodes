import node_t from "./node_t.js";

/**
 * 
 */

class node_sort extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("Sort");
		this.input = this.addInput("List");
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
		if (input instanceof Array) {
			var copy = input.slice(0);
			o = copy.sort();
		}
		this.output.set_state(o)
	}
};

export default node_sort;
