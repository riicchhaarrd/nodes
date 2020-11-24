import signal from "./signal.js";

export default class signal_proxy extends signal
{
	constructor(node,type,initial_value)
	{
		super(node,"",type,0,0,0);
		this.state = initial_value;
	}
};