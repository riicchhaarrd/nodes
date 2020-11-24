import node_t from "./node_t.js";
import vec3 from "./vec3.js";

export default class node_vec3 extends node_t
{
	constructor()
	{
		super("vec3");
		this.remove_all_inputs();
	}
	
	set_initial_value()
	{
		this.output.set_state(
			new vec3(parseFloat(prompt_proxy()),parseFloat(prompt_proxy()),parseFloat(prompt_proxy()))
		);
	}
};
