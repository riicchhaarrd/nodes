import { ctx } from "./nodes.js";
import node_t from "./node_t.js";
import vec2 from "./vec2.js";

export function DrawLine(from, to) {
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.lineTo(to.x, to.y);
	ctx.stroke();
}

/**
 * 
 * @param {vec2} from
 * @param {vec2} controlPoint1
 * @param {vec2} controlPoint2
 * @param {vec2} to
 */

export function DrawCubicBezier(from, controlPoint1, controlPoint2, to) {
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.bezierCurveTo(
		controlPoint1.x, controlPoint1.y,
		controlPoint2.x, controlPoint2.y,
		to.x, to.y
	);
	ctx.stroke();

	var debug = true;
	var radius = 10;

	if (debug) {
		ctx.strokeStyle = "lime";
		DrawLine(from, controlPoint1);
		DrawLine(controlPoint1, controlPoint2);
		DrawLine(controlPoint2, to);


		// controlPoint1 circle
		ctx.beginPath();
		ctx.arc(controlPoint1.x,controlPoint1.y, radius, 0, 2 * Math.PI);
		ctx.stroke();

		// controlPoint2 circle
		ctx.beginPath();
		ctx.arc(controlPoint2.x,controlPoint2.y, radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
	ctx.restore();
}

class node_bezier extends node_t
{
	/**
	 * 
	 */
	constructor()
	{
		super("Bezier");
		this.from = this.addInput("from: Vec2")
		this.controlPoint1 = this.addInput("controlPoint1: Vec2")
		this.controlPoint2 = this.addInput("controlPoint2: Vec2")
		this.to = this.addInput("to: Vec2")
		//this.output = this.addOutput("out");
	}
	
	/**
	 * 
	 */
	set_initial_value()
	{
		//this.output.set_state("");
		this.from.set_state(new vec2( 20,  20));
		this.controlPoint1.set_state(new vec2( 20, 100));
		this.controlPoint2.set_state(new vec2(200, 100));
		this.to.set_state(new vec2(200,  20));
	}

	/**
	 * 
	 */
	value_changed() {
	}

	/**
	 * 
	 * @param {boolean} selected 
	 */

	draw(selected) {
		super.draw(selected);

		// using state property, method would just return "?"
		var from          = this.from.state;
		var controlPoint1 = this.controlPoint1.state;
		var controlPoint2 = this.controlPoint2.state;
		var to            = this.to.state;

		DrawCubicBezier(from, controlPoint1, controlPoint2, to);
	}
};

export default node_bezier;
