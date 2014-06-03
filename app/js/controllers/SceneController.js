var SceneController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SceneController = (function() {
  SceneController.prototype.previousX = 0;

  SceneController.prototype.previousY = 0;

  SceneController.prototype.cameraVector = 0;

  SceneController.prototype.vx = 0;

  SceneController.prototype.vy = 0;

  SceneController.prototype.friction = 0.97;

  SceneController.prototype.cameraController = null;

  SceneController.prototype.gui = null;

  SceneController.prototype.snakes = [];

  function SceneController(camera, scene, render) {
    this.camera = camera;
    this.scene = scene;
    this.render = render;
    this.onRelease = __bind(this.onRelease, this);
    this.onMove = __bind(this.onMove, this);
    this.onTouch = __bind(this.onTouch, this);
    this.addEvents();
    this.gui = new GuiController(this);
    this.cameraController = new CameraController(camera);
    this.gui.controllCamera(this, this.cameraController);
    $("body").get(0).style.cursor = "url(./img/cursor_open.png),auto";
    this.camera.lookAt(scene.position);
    this.octopus = new Octopus(scene);
    return;
  }

  SceneController.prototype.addEvents = function() {
    window.addEventListener("mousedown", this.onTouch, false);
  };

  SceneController.prototype.onTouch = function(e) {
    e.preventDefault();
    this.previousX = e.pageX;
    this.previousY = e.pageY;
    window.addEventListener("mouseup", this.onRelease, false);
    window.addEventListener("mousemove", this.onMove, false);
    window.addEventListener("mouseleave", this.onRelease, false);
    $("body").get(0).style.cursor = "url(./img/cursor_close.png),auto";
  };

  SceneController.prototype.onMove = function(e) {
    var distX, distY;
    e.preventDefault();
    distX = e.pageX - this.previousX;
    distY = e.pageY - this.previousY;
    this.previousX = e.pageX;
    this.previousY = e.pageY;
    this.vx += distX / 1000;
    this.vy += distY / 20;
  };

  SceneController.prototype.onRelease = function(e) {
    e.preventDefault();
    window.removeEventListener("mouseup", this.onRelease, false);
    window.removeEventListener("mousemove", this.onMove, false);
    window.removeEventListener("mouseleave", this.onRelease, false);
    $("body").get(0).style.cursor = "url(./img/cursor_open.png),auto";
  };

  SceneController.prototype.update = function() {
    this.cameraController.update(this.vx, this.vy);
    this.octopus.update();
    this.vy *= this.friction;
    this.vx *= this.friction;
    renderer.render(scene, camera);
  };

  SceneController.prototype.close = function(callback) {
    this.state = "closing";
    $("#contact").fadeOut(400, callback);
  };

  return SceneController;

})();
