import node_t from "./node_t.js";

export class node_mathop extends node_t
{
	constructor(name, op)
	{
		super(name);
		this.op = op;
	}
	
	eq(a,b)
	{
		return eval(a + "" +  this.op + "" + b);
	}
	
	is_vec3(a)
	{
		return typeof a == "object" && a.constructor.name == "vec3";
	}
	
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

export class node_mathop_mul extends node_mathop { constructor() { super("multiply", "*"); } };
export class node_mathop_sub extends node_mathop { constructor() { super("subtract", "-"); } };
export class node_mathop_div extends node_mathop { constructor() { super("divide", "/"); } };
export class node_mathop_add extends node_mathop { constructor() { super("add", "+"); } };
