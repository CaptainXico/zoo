AFRAME.registerComponent('hmi-controller', {
  schema: {
    hand: { type: 'string', default: 'left' },
  },
  init: function () {
    const el = this.el;

    // Create HMI base with rounded border
    this.hmi = document.createElement('a-entity');
    this.hmi.setAttribute('geometry', {
      primitive: 'plane',
      height: 0.5,
      width: 0.5,
    });
    this.hmi.setAttribute('material', {
      color: '#ffffff',
      opacity: 0.9,
    });
    this.hmi.setAttribute('position', '0.3 0 0'); // Offset near the hand
    this.hmi.setAttribute('rotation', '-45 0 0'); // Tilt towards the user
    this.hmi.setAttribute('visible', false); // Initially hidden

    // Add a black border with rounded edges
    const border = document.createElement('a-entity');
    border.setAttribute('geometry', {
      primitive: 'plane',
      height: 0.55, // Slightly larger than HMI
      width: 0.55,
    });
    border.setAttribute('material', {
      color: '#000000',
      shader: 'flat',
      opacity: 1,
    });
    border.setAttribute('position', '0 0 -0.01'); // Behind the HMI
    border.setAttribute('rounded', { radius: 0.05 }); // Add rounded edges (via custom rounded shader/component)

    this.hmi.appendChild(border);

    // Create Button Entity
    const button = document.createElement('a-entity');
    button.setAttribute('geometry', {
      primitive: 'plane',
      height: 0.1,
      width: 0.3,
    });
    button.setAttribute('material', {
      color: '#ff0000', // Red button initially
      opacity: 0.8,
    });
    button.setAttribute('position', '0 0 0.01'); // Centered on the HMI
    button.setAttribute('class', 'interactive'); // Add a class for raycasting
    button.setAttribute('text', {
      value: 'Click Me',
      align: 'center',
      color: '#000000',
    });

    this.hmi.appendChild(button);

    // Show HMI when left hand trigger is pressed
    el.addEventListener('triggerdown', () => {
      this.hmi.setAttribute('visible', true);
    });

    // Hide HMI when left hand trigger is released
    el.addEventListener('triggerup', () => {
      this.hmi.setAttribute('visible', false);
    });

    // Change button color and navigate to another HTML file on click
    button.addEventListener('click', () => {
      button.setAttribute('material', 'color', '#00ff00'); // Change color to green
      window.location.href = 'https://captainxico.github.io/zoo/tiger.html'; // Replace 'presents.html' with the path to your target file
    });

    el.appendChild(this.hmi);
  },
});
