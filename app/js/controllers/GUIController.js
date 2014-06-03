var GuiController;

GuiController = (function() {
  GuiController.prototype.gui = null;

  GuiController.prototype.camera = null;

  GuiController.prototype.light = null;

  function GuiController() {
    this.gui = new dat.GUI();
    return;
  }

  GuiController.prototype.controllScene = function(scene) {
    this.scene = this.gui.addFolder('Scene');
    this.scene.add(scene.fog, 'far', 0, 5000);
  };

  GuiController.prototype.controllCamera = function(section, cameraController) {
    this.camera = this.gui.addFolder('Camera');
    this.camera.add(cameraController, 'radius', 0, 1200);
    this.camera.add(section, 'friction', 0.95, 1);
  };

  GuiController.prototype.controllLight = function(lightController) {
    this.light = this.gui.addFolder('Light');
    this.light.add(lightController, 'lightAuto');
    this.light.addColor(lightController, 'ambientLightColor');
    this.light.addColor(lightController, 'cameraLightColor');
    this.light.add(lightController.cameraLight, 'distance', 0, 1000);
    this.light.add(lightController.cameraLight, 'intensity', 0, 2);
  };

  GuiController.prototype.controlMaterial = function(snake) {
    this.snake = this.gui.addFolder('Snake');
    this.snake.add(snake, 'materialIndex', 0, 3).step(1);
    this.snake.add(snake, 'girth', 1, 50).step(.1);
    this.snake.add(snake, 'headRadius', 1, 50).step(.1);
    this.snake.add(snake, 'reduction', 0, 5);
    this.snake.add(snake, 'frequency', 0, .4).step(.005);
    this.snake.open();
  };

  return GuiController;

})();
