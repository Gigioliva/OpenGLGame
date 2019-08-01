#version 300 es

in vec3 in_pos;
in vec3 in_norm;
in vec2 in_uv;

uniform mat4 pMatrix;
uniform mat4 wMatrix;
uniform mat3 nMatrix;

out vec3 fs_pos;
out vec3 fs_norm;
out vec2 fs_uv;

void main() {
	fs_pos = (wMatrix * vec4(in_pos, 1.0)).xyz;
	fs_norm = nMatrix * in_norm;
	fs_uv = vec2(in_uv.x, 1.0-in_uv.y);
	
	gl_Position = pMatrix * vec4(in_pos, 1.0);
}