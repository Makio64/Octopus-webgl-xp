var Tentacle;

Tentacle = (function() {
  Tentacle.prototype.PI180 = Math.PI / 180;

  Tentacle.prototype.materials = [];

  Tentacle.prototype.materialIndex = 0;

  Tentacle.prototype.numNodes = 10;

  Tentacle.prototype.mesh = null;

  Tentacle.prototype.headRadius = 18.0;

  Tentacle.prototype.girth = 6.4;

  Tentacle.prototype.reduction = 1.0;

  Tentacle.prototype.frequency = 0.08;

  Tentacle.prototype.count = 0;

  Tentacle.prototype.segmentsX = 11;

  function Tentacle() {
    this.createMesh();
    return;
  }

  Tentacle.prototype.createMesh = function() {
    var geometry;
    this.materials.push(new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0
    }));
    this.materials.push(new THREE.MeshNormalMaterial());
    this.materials.push(new THREE.MeshPhongMaterial({
      color: 0x333333
    }));
    this.materials.push(new THREE.MeshLambertMaterial({
      color: 0x333333
    }));
    geometry = new THREE.CylinderGeometry(this.headRadius, 0, this.numNodes * 10, this.segmentsX - 1, this.numNodes - 1, true);
    this.mesh = new THREE.Mesh(geometry, this.materials[this.materialIndex]);
  };

  Tentacle.prototype.updateMesh = function() {
    var M_2PI, M_count_10, angle, i, j, ondulation, radius, vertice, vertices, _i, _j, _ref, _ref1;
    vertices = this.mesh.geometry.vertices;
    M_2PI = Math.PI * 2;
    M_count_10 = this.count / 10;
    for (i = _i = 0, _ref = this.numNodes; _i < _ref; i = _i += 1) {
      for (j = _j = 0, _ref1 = this.segmentsX; _j < _ref1; j = _j += 1) {
        vertice = vertices[i * this.segmentsX + j];
        vertice.z = i * this.girth;
        ondulation = Math.cos(i / (this.numNodes - 1) * M_2PI + this.count) * 10;
        radius = this.headRadius - this.headRadius * (1 - i / (this.numNodes - 1)) * this.reduction;
        angle = j / 10 * M_2PI + M_count_10;
        vertice.y = Math.cos(angle) * radius + ondulation;
        vertice.x = Math.sin(angle) * radius + ondulation;
      }
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.normalsNeedUpdate = true;
    this.mesh.material = this.materials[this.materialIndex];
  };

  Tentacle.prototype.update = function() {
    this.count += this.frequency;
    this.updateMesh();
  };

  return Tentacle;

})();
