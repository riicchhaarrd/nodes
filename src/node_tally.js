import node_t from "./node_t.js";

/**
 * 
 */

class node_tally extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("Tally");
		this.input = this.addInput("string")
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
		let input = this.input.get_state();

		if (typeof input == "string") {
			var parts = input.split("");
			var map = {};
			for (var part of parts) {
				if (part in map) {
					map[part]++;
				} else {
					map[part] = 1;
				}
			}
			// turn map into array
			var arr = [];
			for (var m in map) {
    			arr.push([m, map[m]]);
			}
			this.output.set_state(arr);
		}
	}
};

export default node_tally;
