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
		this.remove_all_inputs();
		this.add_signal("input", "string")
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
		if (typeof input == "string") {
			o = input.split("");
		}
		this.output.set_state(o)
	}
};

export default node_characters;
