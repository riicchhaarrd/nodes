import node_t from "./node_t.js";

export default class node_normalize extends node_t
{
	constructor()
	{
		super("normalize");
		this.remove_all_inputs();
		this.add_signal("input");
	}
	
	value_changed()
	{
		let a = this.inputs[0].get_state();
		if(typeof a == "object" && a.constructor.name == "vec3")
		{
			let dot = function(a,b)
			{
				return a.x * b.x + a.y * b.y + a.z * b.z;
			};
			let l = Math.sqrt(dot(a,a));
			this.output.set_state(new vec3(a.x/l,a.y/l,a.z/l));
		}
		else
			this.output.set_state("invalid");
	}
};
