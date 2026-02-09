import { useRef, useEffect } from "react";

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  className?: string;
  mouseX?: number; // Normalized 0-1
  mouseY?: number; // Normalized 0-1
  isStriking?: boolean;
  strikeIntensity?: number;
}

export function Lightning({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  className = "",
  mouseX = 0.5,
  mouseY = 0.5,
  isStriking = false,
  strikeIntensity = 0,
}: LightningProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      uniform vec2 uMousePos;
      uniform float uStrikeIntensity;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          vec2 mouseUV = uMousePos;
          
          // Calculate distance from mouse position
          vec2 mousePos = vec2(mouseUV.x * (iResolution.x / iResolution.y) * 2.0 - (iResolution.x / iResolution.y), mouseUV.y * 2.0 - 1.0);
          
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          // Calculate distance from center (original lightning)
          float dist = abs(uv.x);
          
          // Calculate distance from mouse position
          vec2 toMouse = uv - mousePos;
          float mouseDist = length(toMouse);
          
          // Blend between center lightning and mouse-following lightning
          float mouseInfluence = 0.6; // Increased from 0.3 - more visible mouse following
          float centerInfluence = 1.0 - mouseInfluence;
          
          // Combine both lightning sources - increased intensity for mouse following
          float lightning1 = pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * centerInfluence;
          float lightning2 = pow(mix(0.0, 0.25, hash11(iTime * uSpeed + 100.0)) / (mouseDist + 0.08), 1.1) * mouseInfluence * 1.5; // Increased visibility
          
          // Strike effect - intense flash at mouse position
          float strikeFlash = 0.0;
          if (uStrikeIntensity > 0.0) {
              strikeFlash = uStrikeIntensity * pow(0.5 / (mouseDist + 0.03), 2.5); // More intense strike
          }
          
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 strikeColor = hsv2rgb(vec3(uHue / 360.0, 0.4, 1.0)); // Brighter for strike
          
          vec3 col = baseColor * (lightning1 + lightning2) * uIntensity * 1.3; // Increased overall intensity
          col += strikeColor * strikeFlash * 4.0; // More visible strike flash
          
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (
      source: string,
      type: number
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");
    const uMousePosLocation = gl.getUniformLocation(program, "uMousePos");
    const uStrikeIntensityLocation = gl.getUniformLocation(program, "uStrikeIntensity");

    const startTime = performance.now();
    let frameId: number;

    const render = () => {
      if (!gl.isContextLost()) {
        gl.useProgram(program);
        resizeCanvas();
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
        const currentTime = performance.now();
        gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
        gl.uniform1f(uHueLocation, hue);
        gl.uniform1f(uXOffsetLocation, xOffset);
        gl.uniform1f(uSpeedLocation, speed);
        gl.uniform1f(uIntensityLocation, intensity);
        gl.uniform1f(uSizeLocation, size);
        gl.uniform2f(uMousePosLocation, mouseX, mouseY);
        gl.uniform1f(uStrikeIntensityLocation, strikeIntensity);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [hue, xOffset, speed, intensity, size, mouseX, mouseY, strikeIntensity]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
