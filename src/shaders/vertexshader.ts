export const VERTEX_SHADER: string = `

precision mediump float;

attribute vec3 a_position;
attribute vec3 a_point;
attribute vec3 a_rotation;
attribute vec3 a_color;

uniform vec2 u_size;
uniform vec3 u_camPosition;
uniform vec3 u_camRotation;

uniform float u_f;

varying vec3 v_color;

vec3 rotate(vec3 point, vec3 rotation)
{
    vec3 cos_ = cos(rotation);
    vec3 sin_ = sin(rotation);

    vec3 result = vec3(
        point.x * (cos_.z*cos_.y-sin_.x*sin_.y*sin_.z) - point.y * sin_.z * cos_.x + point.z * (cos_.z*sin_.y+sin_.x*sin_.z*cos_.y),
        point.x * (sin_.z*cos_.y+cos_.z*sin_.x*sin_.y) + point.y * cos_.z * cos_.x + point.z * (sin_.z*sin_.y-cos_.z*sin_.x*cos_.y),
        point.x * cos_.x * -sin_.y + point.y * sin_.x + point.z * cos_.x * cos_.y
    );

    return result;
}

vec3 meshTransformation()
{
    vec3 result = rotate(a_point, a_rotation);
    result = result + a_position;


    return result;
}

void main(void){
    vec3 meshPosition = meshTransformation();

    vec3 camTranslatedPoint = rotate(meshPosition - u_camPosition, -u_camRotation);
    

    if(camTranslatedPoint.z < 0.0001)
    {
        camTranslatedPoint.z = 0.0001;
    }

    vec2 uv = vec2(camTranslatedPoint.x / camTranslatedPoint.z, camTranslatedPoint.y / camTranslatedPoint.z);

    gl_Position = vec4(((u_f * uv + (u_size / 2.0)) / u_size) * 2.0 - 1.0, 0.0, 1.0);
    
    v_color = a_color;
}

`;
