import node_t from "./node_t.js";

export default class node_tally extends node_t
{
	constructor()
	{
		super("Tally");
		this.remove_all_inputs();
		this.add_signal("input", "string")
	}
	
	set_initial_value()
	{
		this.output.set_state("");
	}

	value_changed() {
		let input = this.inputs[0].get_state();

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
