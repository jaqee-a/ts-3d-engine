import Scene from "./scene";
import ContextRenderer from "./contextRenderer";
import { Cube, Sphere } from "./graphics/primitive";
import { parseObj } from "./utils/objParser";
import { join } from "path";
import { Light } from "./graphics/light";
import { Camera } from "./graphics/camera";
import { Vec3 } from "./utils/vecUtils";
import Mesh from "./graphics/mesh";
import { Triangle } from "./graphics/triangle";

window.onload = function () {
    const scene : Scene = new Scene();
    const floor : Mesh = new Mesh();
    const table : Mesh = parseObj(join(__dirname, "/assets/bill-table.obj"));
    const sphere: Mesh = new Sphere();

    const FLOORX: number = 25;
    const FLOORY: number = 25;



    for(let i = 0; i < FLOORX; i+=1)
    for(let j = 0; j < FLOORY; j+=1) {
        let c_ = (i+j)%2 == 1 ? 255 : 0;
        floor.triangles.push(
            new Triangle({x: i + 1, y: 0, z: j + 1}, {x: i + 1, y: 0, z: j}, {x: i, y: 0, z: j}, {r: c_, g: c_, b: c_}),
            new Triangle({x: i, y: 0, z: j + 1}, {x: i + 1, y: 0, z: j + 1}, {x: i, y: 0, z: j}, {r: c_, g: c_, b: c_}),
        )
    }


    /*
        ######
        ######
        ######
        ######
    */

    table.position.x = (FLOORX / 2) >> 0;
    table.position.z = (FLOORY / 2) >> 0;
    table.position.y = 1;

    sphere.position.x = (FLOORX / 2) >> 0;
    sphere.position.z = (FLOORY / 2) >> 0;
    sphere.position.y = 1;

    scene.meshes.push(table );
    scene.meshes.push(sphere);
    scene.meshes.push(floor );

    // const rot: Vec3 = {x: Math.PI / 5, y: 0, z: 0}; 

    scene.camera = new Camera(scene)//, {x: ((FLOORX / 2) >> 0) - 4.5, y: 3.5, z: ((FLOORY / 2) >> 0) - 4.5});//, rot);
    scene.lights.push(new Light(.3, {x: 0,y: 1, z: 0}, {x: Math.PI / 2, y: 0, z: 0}));

    // scene.meshes.push(new Cube(8));
    // scene.meshes.push(new Sphere(8, {x: 5, y: 0, z: 0}));

    const renderer = new ContextRenderer(scene, "app", { showfps: true });
    //const renderer = new Renderer(scene, "app", { showfps: true });
};
