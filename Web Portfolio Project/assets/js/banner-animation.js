class BannerAnimation {
  constructor() {
    this.canvas = document.getElementById('threejs-canvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });

    this.particles = [];
    this.init();
    this.animate();
  }

  init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Setup camera
    this.camera.position.z = 30;

    // Create particles
    const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x999966,
      transparent: true,
      opacity: 0.5
    });

    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      particle.position.x = (Math.random() - 0.5) * 50;
      particle.position.y = (Math.random() - 0.5) * 50;
      particle.position.z = (Math.random() - 0.5) * 50;
      
      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      );

      this.particles.push(particle);
      this.scene.add(particle);
    }

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Update particles
    this.particles.forEach(particle => {
      particle.position.add(particle.velocity);

      // Bounce off boundaries
      if (Math.abs(particle.position.x) > 25) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 25) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 25) particle.velocity.z *= -1;
    });

    // Rotate entire scene
    this.scene.rotation.y += 0.001;

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize animation when document is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BannerAnimation();
});
