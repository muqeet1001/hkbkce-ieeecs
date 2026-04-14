// Grid Background Component
export default class GridBackground {
  constructor() {
    this.gridSize = 40;
    this.speedX = 0.5;
    this.speedY = 0.5;
    this.offsetX = 0;
    this.offsetY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.animationId = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.createContainer();
    this.createGridPattern();
    this.bindEvents();
    this.startAnimation();
  }

  createContainer() {
    // Create main container
    this.container = document.createElement('div');
    this.container.className = 'grid-background fixed inset-0 pointer-events-none z-0 overflow-hidden';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      overflow: hidden;
    `;

    // Create background grid layer
    this.bgGrid = document.createElement('div');
    this.bgGrid.className = 'grid-bg-layer absolute inset-0 opacity-[0.03]';
    this.bgGrid.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.03;
    `;

    // Create highlight grid layer
    this.hlGrid = document.createElement('div');
    this.hlGrid.className = 'grid-hl-layer absolute inset-0 opacity-40';
    this.hlGrid.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      mask-image: radial-gradient(300px circle at center, black, transparent);
      -webkit-mask-image: radial-gradient(300px circle at center, black, transparent);
    `;

    // Create blur spheres
    this.decorativeSpheres = document.createElement('div');
    this.decorativeSpheres.className = 'grid-spheres absolute inset-0 pointer-events-none';
    this.decorativeSpheres.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    this.decorativeSpheres.innerHTML = `
      <div style="position: absolute; right: -20%; top: -20%; width: 40%; height: 40%; border-radius: 9999px; background-color: rgba(249, 115, 22, 0.1); filter: blur(120px);"></div>
      <div style="position: absolute; right: 10%; top: -10%; width: 20%; height: 20%; border-radius: 9999px; background-color: rgba(59, 130, 246, 0.1); filter: blur(100px);"></div>
      <div style="position: absolute; left: -10%; bottom: -20%; width: 40%; height: 40%; border-radius: 9999px; background-color: rgba(168, 85, 247, 0.1); filter: blur(120px);"></div>
    `;

    this.container.appendChild(this.bgGrid);
    this.container.appendChild(this.hlGrid);
    this.container.appendChild(this.decorativeSpheres);
    document.body.appendChild(this.container);
  }

  createGridPattern() {
    const svgNS = 'http://www.w3.org/2000/svg';

    // Create SVG for background grid
    const bgSvg = document.createElementNS(svgNS, 'svg');
    bgSvg.setAttribute('class', 'w-full h-full');
    bgSvg.setAttribute('width', '100%');
    bgSvg.setAttribute('height', '100%');

    const bgDefs = document.createElementNS(svgNS, 'defs');
    const bgPattern = document.createElementNS(svgNS, 'pattern');
    bgPattern.setAttribute('id', 'bg-grid-pattern');
    bgPattern.setAttribute('width', this.gridSize.toString());
    bgPattern.setAttribute('height', this.gridSize.toString());
    bgPattern.setAttribute('patternUnits', 'userSpaceOnUse');

    const bgPath = document.createElementNS(svgNS, 'path');
    bgPath.setAttribute('d', `M ${this.gridSize} 0 L 0 0 0 ${this.gridSize}`);
    bgPath.setAttribute('fill', 'none');
    bgPath.setAttribute('stroke', 'currentColor');
    bgPath.setAttribute('stroke-width', '1');
    bgPath.classList.add('text-muted-foreground');

    bgPattern.appendChild(bgPath);
    bgDefs.appendChild(bgPattern);
    bgSvg.appendChild(bgDefs);

    const bgRect = document.createElementNS(svgNS, 'rect');
    bgRect.setAttribute('width', '100%');
    bgRect.setAttribute('height', '100%');
    bgRect.setAttribute('fill', 'url(#bg-grid-pattern)');
    bgSvg.appendChild(bgRect);

    this.bgGrid.appendChild(bgSvg);

    // Create SVG for highlight grid
    const hlSvg = document.createElementNS(svgNS, 'svg');
    hlSvg.setAttribute('class', 'w-full h-full');
    hlSvg.setAttribute('width', '100%');
    hlSvg.setAttribute('height', '100%');

    const hlDefs = document.createElementNS(svgNS, 'defs');
    const hlPattern = document.createElementNS(svgNS, 'pattern');
    hlPattern.setAttribute('id', 'hl-grid-pattern');
    hlPattern.setAttribute('width', this.gridSize.toString());
    hlPattern.setAttribute('height', this.gridSize.toString());
    hlPattern.setAttribute('patternUnits', 'userSpaceOnUse');

    const hlPath = document.createElementNS(svgNS, 'path');
    hlPath.setAttribute('d', `M ${this.gridSize} 0 L 0 0 0 ${this.gridSize}`);
    hlPath.setAttribute('fill', 'none');
    hlPath.setAttribute('stroke', 'currentColor');
    hlPath.setAttribute('stroke-width', '1');
    hlPath.classList.add('text-foreground');

    hlPattern.appendChild(hlPath);
    hlDefs.appendChild(hlPattern);
    hlSvg.appendChild(hlDefs);

    const hlRect = document.createElementNS(svgNS, 'rect');
    hlRect.setAttribute('width', '100%');
    hlRect.setAttribute('height', '100%');
    hlRect.setAttribute('fill', 'url(#hl-grid-pattern)');
    hlSvg.appendChild(hlRect);

    this.hlGrid.appendChild(hlSvg);
  }

  bindEvents() {
    const handleMouseMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;

      // Update mask position
      this.hlGrid.style.maskImage = `radial-gradient(300px circle at ${this.mouseX}px ${this.mouseY}px, black, transparent)`;
      this.hlGrid.style.webkitMaskImage = `radial-gradient(300px circle at ${this.mouseX}px ${this.mouseY}px, black, transparent)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
  }

  startAnimation() {
    const animate = () => {
      this.offsetX = (this.offsetX + this.speedX) % this.gridSize;
      this.offsetY = (this.offsetY + this.speedY) % this.gridSize;

      // Update pattern transforms
      const bgPattern = document.getElementById('bg-grid-pattern');
      const hlPattern = document.getElementById('hl-grid-pattern');

      if (bgPattern) {
        bgPattern.setAttribute('x', this.offsetX.toString());
        bgPattern.setAttribute('y', this.offsetY.toString());
      }

      if (hlPattern) {
        hlPattern.setAttribute('x', this.offsetX.toString());
        hlPattern.setAttribute('y', this.offsetY.toString());
      }

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.isInitialized = false;
  }
}