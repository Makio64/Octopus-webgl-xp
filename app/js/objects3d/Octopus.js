var Octopus;

Octopus = (function() {
  Octopus.prototype.tentacles = [];

  Octopus.prototype.sphere = null;

  Octopus.prototype.scene = null;

  function Octopus(scene) {
    var geometry, i, tentacle, _i;
    this.scene = scene;
    for (i = _i = 0; _i < 16; i = _i += 1) {
      tentacle = new Tentacle();
      tentacle.mesh.position = this.orbit(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), 100);
      tentacle.mesh.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(tentacle.mesh);
      this.tentacles[i] = tentacle;
    }
    geometry = new THREE.SphereGeometry(64);
    this.sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color: 0,
      opacity: .9,
      transparent: true
    }));
    this.scene.add(this.sphere);
    return;
  }

  Octopus.prototype.orbit = function(phi, theta, diameter) {
    var p;
    p = new THREE.Vector3();
    p.x = diameter * Math.sin(phi) * Math.cos(theta);
    p.z = diameter * Math.sin(phi) * Math.sin(theta);
    p.y = diameter * Math.cos(phi);
    return p;
  };

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
