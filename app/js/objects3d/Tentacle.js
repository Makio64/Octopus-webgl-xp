var Tentacle;

Tentacle = (function() {
  Tentacle.prototype.PI180 = Math.PI / 180;

  Tentacle.prototype.materials = [];

  Tentacle.prototype.materialIndex = 1;

  Tentacle.prototype.nodes = [];

  Tentacle.prototype.numNodes = 24;

  Tentacle.prototype.mesh = null;

  Tentacle.prototype.headRadius = 18.0;

  Tentacle.prototype.girth = 6.4;

  Tentacle.prototype.reduction = 1.0;

  Tentacle.prototype.speed = 0.1;

  Tentacle.prototype.friction = 0.95;

  Tentacle.prototype.muscleRange = 30 * Math.PI / 180;

  Tentacle.prototype.frequency = 0.08;

  Tentacle.prototype.vector = 0;

  Tentacle.prototype.angle = 0;

  Tentacle.prototype.count = 0;

  Tentacle.prototype.forceAngle = 0 * Math.PI / 180;

  Tentacle.prototype.segmentsX = 11;

  function Tentacle() {
    this.createNodes();
    this.createMesh();
    return;
  }

  Tentacle.prototype.createMesh = function() {
    var geometry;
    this.materials.push(new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xBBBBBB
    }));
    this.materials.push(new THREE.MeshNormalMaterial());
    this.materials.push(new THREE.MeshPhongMaterial({
      color: 0x333333
    }));
    this.materials.push(new THREE.MeshLambertMaterial({
      color: 0x333333
    }));
    geometry = new THREE.CylinderGeometry(this.headRadius, 0, this.numNodes * 10, this.segmentsX - 1, this.numNodes - 1, true);
    this.mesh = new THREE.Mesh(geometry, this.materials[2]);
  };

  Tentacle.prototype.createNodes = function() {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.numNodes; _i < _ref; i = _i += 1) {
      this.nodes.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0
      });
    }
  };

  Tentacle.prototype.updateMesh = function() {
    var i, j, ondulationX, ondulationZ, radius, vertice, vertices, _i, _j, _ref, _ref1;
    vertices = this.mesh.geometry.vertices;
    for (i = _i = 0, _ref = this.numNodes; _i < _ref; i = _i += 1) {
      for (j = _j = 0, _ref1 = this.segmentsX; _j < _ref1; j = _j += 1) {
        vertice = vertices[i * this.segmentsX + j];
        vertice.y = i * this.girth;
        ondulationX = Math.cos(i / (this.numNodes - 1) * Math.PI * 2 + this.count) * 10;
        ondulationZ = Math.cos(i / (this.numNodes - 1) * Math.PI * 2 + this.count) * 10;
        radius = this.headRadius - this.headRadius * (i / this.numNodes) * this.reduction;
        vertice.x = Math.cos(j / 10 * Math.PI * 2 + this.count / 10) * radius + ondulationX;
        vertice.z = Math.sin(j / 10 * Math.PI * 2 + this.count / 10) * radius + ondulationZ;
      }
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.normalsNeedUpdate = true;
    this.mesh.geometry.computeVertexNormals();
    this.mesh.material = this.materials[this.materialIndex];
  };

  Tentacle.prototype.updateMesh2 = function() {
    var i, j, node, ondulationX, ondulationZ, radius, vertice, vertices, _i, _j, _ref, _ref1;
    vertices = this.mesh.geometry.vertices;
    for (i = _i = 0, _ref = this.numNodes; _i < _ref; i = _i += 1) {
      node = this.nodes[i];
      for (j = _j = 0, _ref1 = this.segmentsX; _j < _ref1; j = _j += 1) {
        vertice = vertices[i * this.segmentsX + j];
        vertice.y = i * this.girth;
        ondulationX = node.x;
        ondulationZ = node.y;
        radius = this.headRadius - this.headRadius * (i / this.numNodes) * this.reduction;
        vertice.x = Math.cos(j / 10 * Math.PI * 2) * radius + node.x;
        vertice.z = Math.sin(j / 10 * Math.PI * 2) * radius + node.x;
      }
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.computeBoundingSphere();
    this.mesh.geometry.normalsNeedUpdate = true;
    this.mesh.geometry.computeVertexNormals();
    this.mesh.geometry.computeFaceNormals();
    this.mesh.material = this.materials[this.materialIndex];
  };

  Tentacle.prototype.update = function() {
    this.count += this.frequency;
    this.updateMesh();
  };

  return Tentacle;

})();
