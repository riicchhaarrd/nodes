import node_t from "./node_t.js";
import vec3 from "./vec3.js";

/**
 * 
 */

class node_mathop extends node_t
{
	/**
	 * 
	 * @param {string} name 
	 * @param {string} op 
	 */
	constructor(name, op)
	{
		super(name);
		this.op = op;
	}
	
	/**
	 * 
	 * @param {number} a 
	 * @param {number} b 
	 */
	eq(a,b)
	{
		return eval(a + "" +  this.op + "" + b);
	}
	
	/**
	 * 
	 * @param {any} a 
	 */
	is_vec3(a)
	{
		return typeof a == "object" && a.constructor.name == "vec3";
	}
	
	/**
	 * 
	 */
	value_changed()
	{
		let a = this.inputs[0].get_state();
		let b = this.inputs[1].get_state();
		if(typeof a == "number" && typeof b == "number")
			this.output.set_state(this.eq(a,b));
		else if(typeof a == "object" && typeof b == "object" && a.constructor.name == "vec3" && b.constructor.name == "vec3")
			this.output.set_state(new vec3(this.eq(a.x,b.x),this.eq(a.y,b.y),this.eq(a.z,b.z)));
		else if(this.is_vec3(a) && typeof b == "number")
		{
			this.output.set_state(new vec3(this.eq(a.x,b),this.eq(a.y,b),this.eq(a.z,b)));
		}
		else if(this.is_vec3(b) && typeof a == "number")
		{
			this.output.set_state(new vec3(this.eq(b.x,a),this.eq(b.y,a),this.eq(b.z,a)));
		} else
			this.output.set_state("invalid");
	}
};

/**
 * 
 */
class node_mathop_mul extends node_mathop { constructor() { super("multiply", "*"); } };

/**
 * 
 */
class node_mathop_sub extends node_mathop { constructor() { super("subtract", "-"); } };

/**
 * 
 */
class node_mathop_div extends node_mathop { constructor() { super("divide", "/"); } };

/**
 * 
 */
class node_mathop_add extends node_mathop { constructor() { super("add", "+"); } };

export {
	node_mathop,
	node_mathop_mul,
	node_mathop_sub,
	node_mathop_div,
	node_mathop_add
}
