import node_t from "./node_t.js";

export default class node_stringjoin extends node_t
{
	constructor()
	{
		super("StringJoin");
		this.remove_all_inputs();
		this.add_signal("input", "list of chars");
	}
	
	set_initial_value()
	{
		this.output.set_state("");
	}
	
	value_changed() {
		var o;
		let input = this.inputs[0].get_state();
		if (input instanceof Array) {
			o = input.join("");
		}
		this.output.set_state(o);
	}
};
