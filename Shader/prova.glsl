#version 300 es
precision highp float;

in vec3 fs_pos;
in vec3 fs_norm;
in vec2 fs_uv;

uniform sampler2D u_texture;
uniform vec3 eyePos;

uniform vec4 ambientType;
uniform vec4 diffuseType;
uniform vec4 specularType;
uniform vec4 emissionType;

uniform vec4 L0lightType;
uniform vec3 L0Pos;
uniform vec3 L0Dir;
uniform float L0ConeOut;
uniform float L0ConeIn;
uniform float L0Decay;
uniform float L0Target;
uniform vec4 L0lightColor;

uniform vec4 L1lightType;
uniform vec3 L1Pos;
uniform vec3 L1Dir;
uniform float L1ConeOut;
uniform float L1ConeIn;
uniform float L1Decay;
uniform float L1Target;
uniform vec4 L1lightColor;

uniform vec4 L2lightType;
uniform vec3 L2Pos;
uniform vec3 L2Dir;
uniform float L2ConeOut;
uniform float L2ConeIn;
uniform float L2Decay;
uniform float L2Target;
uniform vec4 L2lightColor;

uniform vec4 ambientLightColor;
uniform vec4 ambientLightLowColor;
uniform vec3 ADir;
uniform vec4 diffuseColor;
uniform float DTexMix;
uniform vec4 specularColor;
uniform float SpecShine;
uniform float DToonTh;
uniform float SToonTh;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

out vec4 color;

vec3 compLightDir(vec3 LPos, vec3 LDir, vec4 lightType) {
	//lights
	// -> Point
	vec3 pointLightDir = normalize(LPos - fs_pos);
	// -> Direct
	vec3 directLightDir = LDir;
	// -> Spot
	vec3 spotLightDir = normalize(LPos - fs_pos);

	return            directLightDir * lightType.x +
					  pointLightDir * lightType.y +
					  spotLightDir * lightType.z;
}

vec4 compLightColor(vec4 lightColor, float LTarget, float LDecay, vec3 LPos, vec3 LDir,
					float LConeOut, float LConeIn, vec4 lightType) {
	float LCosOut = cos(radians(LConeOut / 2.0));
	float LCosIn = cos(radians(LConeOut * LConeIn / 2.0));

	//lights
	// -> Point
	vec4 pointLightCol = lightColor * pow(LTarget / length(LPos - fs_pos), LDecay);
	// -> Direct
	vec4 directLightCol = lightColor;
	// -> Spot
	vec3 spotLightDir = normalize(LPos - fs_pos);
	float CosAngle = dot(spotLightDir, LDir);
	vec4 spotLightCol = lightColor * pow(LTarget / length(LPos - fs_pos), LDecay) *
						clamp((CosAngle - LCosOut) / (LCosIn - LCosOut), 0.0, 1.0);
	// ----> Select final component
	return          directLightCol * lightType.x +
					pointLightCol * lightType.y +
					spotLightCol * lightType.z;
}

vec4 compDiffuse(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec4 diffColor) {
	// Diffuse
	// --> Lambert
	vec4 diffuseLambert = lightCol * clamp(dot(normalVec, lightDir),0.0,1.0) * diffColor;
	// --> Toon
	vec4 ToonCol;
	if(dot(normalVec, lightDir) > DToonTh) {
		ToonCol = diffColor;
	} else {
		ToonCol = vec4(0.0, 0.0, 0.0, 1.0);
	}
	vec4 diffuseToon = lightCol * ToonCol;
	// ----> Select final component
	return         diffuseLambert * diffuseType.x +
				   diffuseToon * diffuseType.y;
}

vec4 compSpecular(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyedirVec) {
	// Specular
	// --> Phong
	vec3 reflection = -reflect(lightDir, normalVec);
	vec4 specularPhong = lightCol * pow(max(dot(reflection, eyedirVec), 0.0), SpecShine) * specularColor;
	// --> Blinn
	vec3 halfVec = normalize(lightDir + eyedirVec);
	vec4 specularBlinn = lightCol * pow(max(dot(normalVec, halfVec), 0.0), SpecShine) * specularColor;
	// --> Toon Phong
	vec4 ToonSpecPCol;
	if(dot(reflection, eyedirVec) > SToonTh) {
		ToonSpecPCol = specularColor;
	} else {
		ToonSpecPCol = vec4(0.0, 0.0, 0.0, 1.0);
	}
	vec4 specularToonP = lightCol * ToonSpecPCol;
	// --> Toon Blinn
	vec4 ToonSpecBCol;
	if(dot(normalVec, halfVec) > SToonTh) {
		ToonSpecBCol = specularColor;
	} else {
		ToonSpecBCol = vec4(0.0, 0.0, 0.0, 1.0);
	}
	vec4 specularToonB = lightCol * ToonSpecBCol;
	// ----> Select final component
	return          specularPhong * specularType.x +
					specularBlinn * specularType.y +
					specularToonP * specularType.z +
					specularToonB * specularType.w;
}

void main() {
	vec4 texcol = texture(u_texture, fs_uv);
	vec4 diffColor = diffuseColor * (1.0-DTexMix) + texcol * DTexMix;
	vec4 ambColor = ambientMatColor * (1.0-DTexMix) + texcol * DTexMix;
	vec4 emit = (emitColor * (1.0-DTexMix) +
				    texcol * DTexMix * 
				   			max(max(emitColor.r, emitColor.g), emitColor.b)) * emissionType.r;
//				   		   (0.299*emitColor.r + 0.587*emitColor.g + 0.114*emitColor.b);
	
	vec3 normalVec = -normalize(fs_norm);
	vec3 eyedirVec = normalize(eyePos - fs_pos);
	
	//lights
	vec3 L0lightDir = compLightDir(L0Pos, L0Dir, L0lightType);
	vec4 L0lightCol = compLightColor(L0lightColor, L0Target, L0Decay, L0Pos, L0Dir,
								     L0ConeOut, L0ConeIn, L0lightType);
	
	vec3 L1lightDir = compLightDir(L1Pos, L1Dir, L1lightType);
	vec4 L1lightCol = compLightColor(L1lightColor, L1Target, L1Decay, L1Pos, L1Dir,
								     L1ConeOut, L1ConeIn, L1lightType);
	
	vec3 L2lightDir = compLightDir(L2Pos, L2Dir, L2lightType);
	vec4 L2lightCol = compLightColor(L2lightColor, L2Target, L2Decay, L2Pos, L2Dir,
								     L2ConeOut, L2ConeIn, L2lightType);
	
	// Ambient
	// --> Ambient
	vec4 ambientAmbient = ambientLightColor * ambColor;
	// --> Hemispheric
	float amBlend = (dot(normalVec, ADir) + 1.0) / 2.0;
	vec4 ambientHemi = (ambientLightColor * amBlend + ambientLightLowColor * (1.0 - amBlend)) * ambColor;
	// ----> Select final component
	vec4 ambient = ambientAmbient * ambientType.x +
				   ambientHemi * ambientType.y;
	
	// Diffuse
	vec4 diffuse = compDiffuse(L0lightDir, L0lightCol, normalVec, diffColor) + 
				   compDiffuse(L1lightDir, L1lightCol, normalVec, diffColor) +
				   compDiffuse(L2lightDir, L2lightCol, normalVec, diffColor);
	
	// Specular
	// --> Phong
	vec4 specular = compSpecular(L0lightDir, L0lightCol, normalVec, eyedirVec) +
					compSpecular(L1lightDir, L1lightCol, normalVec, eyedirVec) +
					compSpecular(L2lightDir, L2lightCol, normalVec, eyedirVec);
	
	
	// final steps
	vec4 out_color = clamp(ambient + diffuse + specular + emit, 0.0, 1.0);
	
	color = vec4(out_color.rgb, 1.0);
}