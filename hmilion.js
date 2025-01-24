AFRAME.registerComponent('hmi-controller', {
  schema: {
    hand: { type: 'string', default: 'left' }, // Specify which hand to attach the HMI
  },
  init: function () {
    const el = this.el;

    // Create HMI base
    this.hmi = document.createElement('a-entity');
    this.hmi.setAttribute('geometry', {
      primitive: 'plane',
      height: 0.5,
      width: 0.7,
    });
    this.hmi.setAttribute('material', {
      color: '#ffffff',
      opacity: 0.9,
    });
    this.hmi.setAttribute('position', '0.3 0 0'); // Offset near the hand
    this.hmi.setAttribute('rotation', '-45 0 0'); // Tilt towards the user
    this.hmi.setAttribute('visible', false); // Initially hidden

    // Add a black border
    const border = document.createElement('a-entity');
    border.setAttribute('geometry', {
      primitive: 'plane',
      height: 0.52, // Slightly larger than HMI
      width: 0.72,
    });
    border.setAttribute('material', {
      color: '#000000',
      shader: 'flat',
      opacity: 1,
    });
    border.setAttribute('position', '0 0 -0.01'); // Behind the HMI
    this.hmi.appendChild(border);

    // Create Button Entity
    const button = document.createElement('a-entity');
    button.setAttribute('geometry', {
      primitive: 'plane',
      height: 0.1,
      width: 0.3,
    });
    button.setAttribute('material', {
      color: '#ff0000', // Red button
      opacity: 0.8,
    });
    button.setAttribute('position', '0 0 0.01'); // Centered on the HMI
    button.setAttribute('class', 'interactive'); // Add a class for raycasting
    button.setAttribute('text', {
      value: 'Open Link',
      align: 'center',
      color: '#000000',
    });

    // Handle raycaster interaction
    button.addEventListener('raycaster-intersected', () => {
      button.setAttribute('material', 'color', '#00ff00'); // Highlight when intersected
    });

    button.addEventListener('raycaster-intersected-cleared', () => {
      button.setAttribute('material', 'color', '#ff0000'); // Reset when cleared
    });

    // Redirect to the URL when the button is clicked
    button.addEventListener('triggerdown', () => {
      window.location.href = 'https://lion-vr.glitch.me/'; // Replace with your desired URL
    });

    // Append the button to the HMI
    this.hmi.appendChild(button);

    // Show HMI when left hand trigger is pressed
    el.addEventListener('triggerdown', () => {
      this.hmi.setAttribute('visible', true);
    });

    // Hide HMI when left hand trigger is released
    el.addEventListener('triggerup', () => {
      this.hmi.setAttribute('visible', false);
    });

    el.appendChild(this.hmi);
  },
});
