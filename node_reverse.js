import node_t from "./node_t.js";

export default class node_reverse extends node_t
{
	constructor()
	{
		super("Reverse");
		this.remove_all_inputs();
		this.add_signal("input", "List|String")
	}
	
	set_initial_value()
	{
		this.output.set_state("");
	}

	value_changed() {
		var o;
		let input = this.inputs[0].get_state();
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
