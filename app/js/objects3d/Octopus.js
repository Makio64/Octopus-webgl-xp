var Octopus;

Octopus = (function() {
  Octopus.prototype.tentacles = [];

  Octopus.prototype.sphere = null;

  Octopus.prototype.scene = null;

  function Octopus(scene) {
    var geometry, i, _i;
    this.scene = scene;
    for (i = _i = 0; _i < 16; i = _i += 1) {
      this.tentacle = new Tentacle();
      this.tentacle.mesh.rotation.x = Math.PI * 2 * Math.random();
      this.tentacle.mesh.rotation.y = Math.PI * 2 * Math.random();
      this.tentacle.mesh.rotation.z = Math.PI * 2 * Math.random();
      this.scene.add(this.tentacle.mesh);
      this.tentacles[i] = this.tentacle;
    }
    geometry = new THREE.SphereGeometry(50);
    this.sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
    }));
    this.scene.add(this.sphere);
    geometry = new THREE.SphereGeometry(60);
    this.sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      opacity: .2,
      transparent: true
    }));
    this.scene.add(this.sphere);
    return;
  }

  Octopus.prototype.update = function() {
    var tentacle, _i, _len, _ref;
    _ref = this.tentacles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tentacle = _ref[_i];
      tentacle.update();
    }
    this.sphere.scale.x = this.sphere.scale.y = this.sphere.scale.z = 1 + .04 * Math.sin(tentacle.count);
  };

  return Octopus;

})();
