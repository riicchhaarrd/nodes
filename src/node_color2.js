import node_t from "./node_t.js";

export default class node_color2 extends node_t
{
	constructor()
	{
		super("color2");
		this.remove_all_inputs();
		this.add_signal("input");
	}
	
	value_changed()
	{
		let v = this.inputs[0].get_state();
		if(typeof v == "object" && v.constructor.name == "vec3")
		{
			this.color = "rgb("+(v.x*255)+","+(v.y*255)+","+(v.z*255)+")";
			this.output.set_state(v);
		}
	}
};