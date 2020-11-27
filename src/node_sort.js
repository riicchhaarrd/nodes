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
		this.remove_all_inputs();
		this.add_signal("input", "List");
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
		let input = this.inputs[0].get_state();
		if (input instanceof Array) {
			var copy = input.slice(0);
			o = copy.sort();
		}
		this.output.set_state(o)
	}
};

export default node_sort;
