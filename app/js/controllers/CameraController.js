var CameraController;

CameraController = (function() {
  CameraController.prototype.camera = null;

  CameraController.prototype.rotation = 0;

  CameraController.prototype.y = 0;

  CameraController.prototype.radius = 320;

  CameraController.prototype.radiusOffset = 0;

  CameraController.prototype.maxY = 100;

  CameraController.prototype.minY = -100;

  CameraController.prototype.radiusfriction = 0.95;

  function CameraController(camera) {
    this.camera = camera;
    return;
  }

  CameraController.prototype.update = function(vx, vy) {
    var x, y, z;
    this.rotation += vx;
    this.y += vy;
    this.y = Math.max(Math.min(this.y, this.maxY), this.minY);
    if (this.y < this.maxY - 120) {
      this.radiusOffset += (Math.abs(vy * 10) - this.radiusOffset) * .5;
    } else {
      this.radiusOffset *= .95;
    }
    x = Math.cos(this.rotation) * (this.radius + this.radiusOffset);
    y = this.y;
    z = Math.sin(this.rotation) * (this.radius + this.radiusOffset);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(new THREE.Vector3(0, this.y + vy * 10, 0));
  };

  return CameraController;

})();
