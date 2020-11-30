/**
 * 
 */

class vec2
{
	/**
	 * 
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x,y)
	{
		this.x=x||0;
		this.y=y||0;
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
		)
			return "?";
		return "("+this.x.toFixed(2)+","+this.y.toFixed(2)+")";
	}
};

export default vec2;
