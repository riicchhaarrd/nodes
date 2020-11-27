import {prompt_proxy} from "./nodes.js";
import node_t from "./node_t.js";

/**
 * 
 */

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

	freeze()
	{
		var frozenfood = super.freeze();
		frozenfood.text = this.output.get_state();
		return frozenfood;
	}
	
	thaw(o)
	{
		this.output.set_state(o.text);
		super.thaw(o);
	}
};

export default node_text;
