var Particles;

Particles = (function() {
  Particles.prototype.distance = 600;

  Particles.prototype.amount = 60;

  Particles.prototype.mouse_streng = .7;

  Particles.prototype.line_alpha = .6;

  Particles.prototype.geometry = new THREE.Geometry();

  Particles.prototype.particles = null;

  Particles.prototype.count = 0;

  function Particles(camera, scene) {
    var i, material, vectorf, _i, _ref;
    this.camera = camera;
    this.scene = scene;
    material = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 16,
      opacity: 0,
      map: THREE.ImageUtils.loadTexture("./img/particle.png"),
      transparent: true
    });
    for (i = _i = 0, _ref = this.amount; _i <= _ref; i = _i += 1) {
      vectorf = new THREE.Vector3((Math.random() * 2 - 1) * this.distance, (Math.random() * 2 - 1) * this.distance, (Math.random() * 2 - 1) * this.distance);
      this.geometry.vertices.push(vectorf);
    }
    TweenLite.to(material, 2.6, {
      opacity: 1,
      ease: Quad.EaseIn
    });
    this.particles = new THREE.ParticleSystem(this.geometry, material);
    this.scene.add(this.particles);
  }

  Particles.prototype.update = function() {
    var i, vertice, vertices, _i, _ref;
    vertices = this.geometry.vertices;
    for (i = _i = 0, _ref = vertices.length; _i < _ref; i = _i += 1) {
      vertice = vertices[i];
      vertice.y += Math.sin((this.count / 100) + (i / 10)) * .5;
    }
    this.geometry.verticesNeedUpdate = true;
    this.count += 1;
    return this.camera.lookAt(scene.position);
  };

  return Particles;

})();
