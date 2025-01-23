AFRAME.registerComponent('smooth-move', {
  init: function () {
    this.moveTree();
  },

  moveTree: function () {
    let el = this.el;

    // Get random position
    function getRandomPosition() {
      let x = (Math.random() - 0.5) * 4; // Random value between -2 and 2
      let y = 0; // Keep height consistent
      let z = (Math.random() - 0.5) * 4 - 3; // Random value around -3
      return { x, y, z };
    }

    // Get random rotation on the y-axis only
    function getRandomRotation() {
      return Math.random() * 360; // Random rotation on y-axis
    }

    // Animate position and rotation using A-Frame's animation component
    function animateMoveAndRotate() {
      const targetPos = getRandomPosition();
      const targetRot = getRandomRotation();

      // Set position animation
      el.setAttribute('animation__position', {
        property: 'position',
        to: `${targetPos.x} ${targetPos.y} ${targetPos.z}`,
        dur: 2000,
        easing: 'easeInOutQuad',
      });

      // Set rotation animation
      el.setAttribute('animation__rotation', {
        property: 'rotation',
        to: `0 ${targetRot} 0`,
        dur: 2000,
        easing: 'easeInOutQuad',
      });

      // Schedule the next movement after the animation ends
      setTimeout(() => {
        animateMoveAndRotate();
      }, 3000); // 2000ms animation + 1000ms pause
    }

    // Start the animation loop
    animateMoveAndRotate();
  }
});
