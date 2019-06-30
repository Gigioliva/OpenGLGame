#version 300 es
precision highp float;

in vec3 fs_pos;
in vec3 fs_norm;
in vec2 fs_uv;

uniform vec4 mColor;

out vec4 color;

void main() {
    color = clamp(mColor ,0.0, 1.0);
}