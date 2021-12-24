import { Component } from "../core/component";
import GameObject from "../core/gameobject";
import { RigidBody2D } from "../core/rigidbody";
import { Vec2, vec2Dot, vec2Magnitude, vec2Normal, vec2Set, vec2SqrMagnitude, vec2xNumMulR, vec2xVec2AddR, vec2xVec2SubR } from "../utils/vecUtils";


export class Ball extends Component {
    
    public rigidBody: RigidBody2D;

    public potted: boolean;
    public radius: number;

    public onPot: Function;

    constructor(gameObject: GameObject) {
        super(gameObject);
        
        this.potted = false;
        this.radius = 1;
        this.rigidBody = this.gameObject.getComponent(RigidBody2D) as RigidBody2D;
    }

    pot() { 
        this.potted = true; 

        this.onPot(this);
    }

    update() {
        if(vec2SqrMagnitude(this.rigidBody.velocity) < .001){
            this.rigidBody.velocity.x = this.rigidBody.velocity.y = 0;
        }
    }

    get2DPosition(): Vec2 {
        return {
            x: this.transform.position.x,
            y: this.transform.position.z
        }
    }

    checkCollision(ball: Ball){
        const n: Vec2 = vec2xVec2SubR(this.get2DPosition(), ball.get2DPosition());
        
        const req_dist: number = this.radius + ball.radius
        const dist = vec2Magnitude(n);

        if (dist > req_dist)
            return


        let mtd: number = (req_dist - dist) / 2

        const un: Vec2 = vec2Normal(n);

        const unmtd: Vec2 = vec2xNumMulR(un, mtd);

        this.transform.position.x += (unmtd.x * 1.1);
        this.transform.position.z += (unmtd.y * 1.1);

        ball.transform.position.x -= (unmtd.x * 1.1);
        ball.transform.position.z -= (unmtd.y * 1.1);

        // tangent vector
        const ut: Vec2 = {x: -un.y,
                          y: un.x};

        const v1n: number = vec2Dot(un, this.rigidBody.velocity);
        const v1t: number = vec2Dot(ut, this.rigidBody.velocity);

        const v2n: number = vec2Dot(un, ball.rigidBody.velocity);
        const v2t: number = vec2Dot(ut, ball.rigidBody.velocity);

        const v1nTag: Vec2 = vec2xNumMulR(un, v2n);
        const v1tTag: Vec2 = vec2xNumMulR(ut, v1t);

        const v2nTag: Vec2 = vec2xNumMulR(un, v1n);
        const v2tTag: Vec2 = vec2xNumMulR(ut, v2t);

        this.rigidBody.velocity = vec2xVec2AddR(v1nTag, v1tTag);
        ball.rigidBody.velocity = vec2xVec2AddR(v2nTag, v2tTag);
                
    }

}