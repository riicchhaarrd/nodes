/**
 * 
 */

class vec3
{
	/**
	 * 
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	constructor(x,y,z)
	{
		this.x=x||0;
		this.y=y||0;
		this.z=z||0;
	}
	
	/**
	 * 
	 */

	toString()
	{
		if(
			typeof this.x.toFixed != "function"
			||
			typeof this.y.toFixed != "function"
			||
			typeof this.z.toFixed != "function"
		)
			return "?";
		return "("+this.x.toFixed(2)+","+this.y.toFixed(2)+","+this.z.toFixed(2)+")";
	}
};

export default vec3;
