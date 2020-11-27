import node_t from "./node_t.js";
import vec3 from "./vec3.js";

/**
 * 
 */

class node_normalize extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("normalize");
		this.inputVec3 = this.addInput("vec3");
		this.output = this.addOutput("vec3");
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		let a = this.inputVec3.get_state();
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

export default node_normalize;
