
/*
MAIN
 */
var addListener, addStat, camera, composer, imagesLoaded, mainLoop, mouseX, mouseY, onDocumentMouseMove, onDocumentTouchMove, onDocumentTouchStart, particles, preload, renderer, scene, sceneController, sh, stats, sw, tanFOV;

mouseX = 0;

mouseY = 0;

sw = window.innerWidth;

sh = window.innerHeight;

tanFOV = void 0;

sceneController = void 0;

stats = void 0;

camera = void 0;

scene = void 0;

renderer = void 0;

composer = void 0;

particles = void 0;

$(document).ready(function() {
  preload();
  $(window).resize(function() {
    var h, w;
    w = $(window).width();
    h = $(window).height();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    return renderer.setSize(w, h);
  });
});

preload = (function(_this) {
  return function() {
    var objImage;
    objImage = new Image();
    objImage.onLoad = imagesLoaded();
    objImage.src = "img/particle.png";
  };
})(this);

imagesLoaded = (function(_this) {
  return function() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 100;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xFFFFFF, 0.0005);
    scene.add(camera);
    if (Detector.webgl) {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        precision: "mediump",
        maxLights: 0,
        stencil: true,
        preserveDrawingBuffer: true
      });
    } else if (Modernizr.canvas) {
      renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    particles = new Particles(camera, scene, renderer);
    sceneController = new SceneController(camera, scene, renderer);
    addStat();
    addListener();
    mainLoop();
  };
})(this);

addStat = (function(_this) {
  return function() {
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
  };
})(this);

addListener = (function(_this) {
  return function() {
    document.addEventListener("touchstart", onDocumentTouchStart, false);
    document.addEventListener("touchmove", onDocumentTouchMove, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
  };
})(this);

onDocumentMouseMove = (function(_this) {
  return function(event) {
    mouseX = event.clientX - sw / 2;
    mouseY = event.clientY - sh / 2;
  };
})(this);

onDocumentTouchStart = (function(_this) {
  return function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - sw / 2;
      mouseY = event.touches[0].pageY - sh / 2;
    }
  };
})(this);

onDocumentTouchMove = (function(_this) {
  return function(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - sw / 2;
      mouseY = event.touches[0].pageY - sh / 2;
    }
  };
})(this);

mainLoop = function() {
  requestAnimationFrame(mainLoop);
  stats.update();
  if (sceneController) {
    sceneController.update();
    particles.update();
  }
};
