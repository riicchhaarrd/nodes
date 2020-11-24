import {prompt_proxy} from "./nodes.js";
import node_t from "./node_t.js";

export default 
class node_text extends node_t
{
	constructor()
	{
		super("text");
		this.remove_all_inputs();
	}
	
	set_initial_value()
	{
		this.output.set_state((prompt_proxy()));
	}
};
