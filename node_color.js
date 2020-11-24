import node_t from "./node_t.js";
import vec3 from "./vec3.js";

export default class node_color extends node_t
{
	constructor()
	{
		super("color");
		this.add_signal("input");
	}
	
	value_changed()
	{
		let r = this.inputs[0].get_state();
		let g = this.inputs[1].get_state();
		let b = this.inputs[2].get_state();
		if(!isNaN(r) && !isNaN(g) && !isNaN(b))
		{
			this.color = "rgb("+(r*255)+","+(g*255)+","+(b*255)+")";
		}
		this.output.set_state(new vec3(r,g,b));
	}
};
