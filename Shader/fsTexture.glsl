#version 300 es
precision highp float;

in vec3 fs_pos;
in vec3 fs_norm;
in vec2 fs_uv;

uniform vec4 mDiffColor;
uniform vec4 mSpecColor;
uniform float mSpecPower;
uniform sampler2D textureFile;
uniform float textureInfluence;

uniform vec3 lightDir;
uniform vec3 lightPos;
uniform vec4 lightColor;
uniform int lightType;

uniform vec3 eyePosition;

out vec4 color;

vec4 lightModel(int lt, vec3 pos) {
    //The normalize light direction
    vec3 nLightDir;
    //Float to store light dimension and cone length
    float lDim, lCone;
    lDim = 1.0;
    if(lt == 1) { //Directional light
        nLightDir = - normalize(lightDir);
    } else if(lt == 2) { //Point light
        nLightDir = normalize(lightPos - pos);
    } else if(lt == 3) { //Point light (decay)
        float lLen = length(lightPos - pos);
        nLightDir = normalize(lightPos - pos);
        lDim = 160.0 / (lLen * lLen);
    } else if(lt == 4) { //Spot light
            nLightDir = normalize(lightPos - pos);
            lCone = -dot(nLightDir, normalize(lightDir));
        if(lCone < 0.5) {
            lDim = 0.0;
        } else if(lCone > 0.7) {
            lDim = 1.0;
        } else {
            lDim = (lCone - 0.5) / 0.2;
        }
    }
    return vec4(nLightDir, lDim);
}

void main() {
    vec3 nEyeDirection = normalize(eyePosition - fs_pos);
    vec3 nNormal = normalize(fs_norm);
    
    vec4 lm = lightModel(lightType, fs_pos);
    vec3 nlightDirection = lm.rgb;
    float lightDimension = lm.a;
    
    vec4 diffuseTextureColorMixture = texture(textureFile, fs_uv) * textureInfluence + mDiffColor * (1.0 - textureInfluence);

    
    
    //Computing the diffuse component of light (no ambient considered)
    vec4 diffuse = diffuseTextureColorMixture * lightColor * clamp(dot(nlightDirection, nNormal), 0.0, 1.0) * lightDimension;

    //Reflection vector for Phong model
    vec3 reflection = -reflect(nlightDirection, nNormal);
    vec4 specular = mSpecColor * lightColor * pow(clamp(dot(reflection, nEyeDirection),0.0, 1.0), mSpecPower) * lightDimension;
    //color = min(diffuse + specular, vec4(1.0, 1.0, 1.0, 1.0));
    color = min(diffuse, vec4(1.0, 1.0, 1.0, 1.0));
}