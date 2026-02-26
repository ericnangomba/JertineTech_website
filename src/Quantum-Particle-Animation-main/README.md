# Quantum Particle Animation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/ecma-262/)
[![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange.svg)](https://www.w3.org/TR/html5/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/cloudwerxlab/quantum-particle-animation/graphs/commit-activity)
[![GitHub Stars](https://img.shields.io/github/stars/cloudwerxlab/quantum-particle-animation?style=social)](https://github.com/cloudwerxlab/quantum-particle-animation/stargazers)

## 🌌 Overview

An interactive quantum particle simulation that creates mesmerizing visual effects using HTML5 Canvas. This project combines particle physics with stunning visual effects to create an immersive experience that mimics quantum mechanical behaviors and cosmic phenomena. Perfect for creative coding enthusiasts, educational demonstrations, or as an engaging background animation.

### 🎥 Demo

![Quantum Particle Animation Demo](https://i.imgur.com/Bck7TDK.png)

> Experience the mesmerizing quantum particle effects in action! [Try it live](https://cloudwerxlab.github.io/quantum-particle-animation)

## ✨ Features

### 🎮 Core Features
- **Real-time Particle Simulation**: Dynamic particle system with customizable parameters and physics-based behavior
- **Interactive Effects**: Responsive mouse-based interaction with particles creating immersive user experiences
- **Quantum Effects**: Various quantum-inspired visual effects and behaviors that mimic quantum mechanical phenomena
- **Smooth Animation**: Delta-time based animation system ensuring consistent performance across different devices
- **Responsive Design**: Automatically adapts to any screen size while maintaining performance
- **Modern UI**: Sleek, glass-morphic interface with intuitive controls

### 🎨 Visual Effects
Each effect can be toggled independently or combined for unique visual experiences:

| Effect | Description | Performance Impact |
|--------|-------------|-------------------|
| 🌀 Vortex | Creates a spiral motion drawing particles toward the center | Medium |
| 🌊 Color Wave | Propagates dynamic color changes across particles | Low |
| 🌪️ Tornado | Generates an upward spiral motion with realistic physics | Medium |
| 🕳️ Black Hole | Simulates gravitational lensing and particle absorption | High |
| ⚡ Explosion | Dramatic particle dispersion with dynamic velocities | Medium |
| 🌟 Pulse Wave | Emits circular waves affecting particle movement | Low |
| 🎯 Gravity Well | Mouse-controlled gravitational effect on particles | Medium |
| ⏰ Time Dilation | Local time-space distortion affecting particle speed | Low |
| 💫 Particle Trails | Dynamic particle path tracking with fade effect | High |

### 🎨 Color Schemes
Carefully crafted color presets to match different moods and themes:

| Scheme | Description | Best Used With |
|--------|-------------|----------------|
| 🌌 Cosmic | Deep space blues and purples | Black Hole, Trails |
| 🖥️ Matrix | Digital green cascade | Time Dilation, Trails |
| 🌠 Fireflies | Warm golden particles | Pulse Wave, Gravity Well |
| 🌈 Rainbow | Dynamic spectrum shift | Color Wave, Vortex |
| 🎨 Custom | Create your own schemes | Any effect |

## 🚀 Getting Started

### System Requirements
- Modern web browser with HTML5 Canvas support
- JavaScript enabled
- Recommended: WebGL support for optimal performance
- Minimum resolution: 800x600
- Recommended RAM: 4GB+

### 📦 Installation

#### Quick Start
1. Clone the repository:
```bash
git clone https://github.com/cloudwerxlab/quantum-particle-animation.git
cd quantum-particle-animation
```

2. Serve the files:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

3. Open in your browser:
```
http://localhost:8000
```

#### Docker Installation
```bash
# Build the container
docker build -t quantum-animation .

# Run the container
docker run -p 8080:80 quantum-animation
```

## 💻 Usage

### ⚙️ Configuration Options

#### Particle Properties
```javascript
{
    particleCount: {
        default: 150,
        range: [1, 300],
        impact: "performance"
    },
    connectionRadius: {
        default: 150,
        range: [50, 300],
        impact: "performance"
    },
    particleSpeed: {
        default: 1.0,
        range: [0.1, 5.0],
        impact: "visual"
    },
    glowIntensity: {
        default: 20,
        range: [0, 50],
        impact: "visual"
    }
}
```

#### Performance Presets
```javascript
const PERFORMANCE_PROFILES = {
    ultra: {
        particleCount: 300,
        connectionRadius: 200,
        trailLength: 20,
        effects: ["all"]
    },
    high: {
        particleCount: 150,
        connectionRadius: 150,
        trailLength: 10,
        effects: ["most"]
    },
    medium: {
        particleCount: 100,
        connectionRadius: 100,
        trailLength: 5,
        effects: ["basic"]
    },
    low: {
        particleCount: 50,
        connectionRadius: 75,
        trailLength: 0,
        effects: ["minimal"]
    }
};
```

### 🎮 Keyboard Shortcuts

| Key | Action | Description |
|-----|--------|-------------|
| `Space` | Toggle Panel | Show/Hide control panel |
| `R` | Reset | Reset all particles |
| `C` | Clear Trails | Clear particle trails |
| `1-5` | Presets | Switch between color schemes |
| `Esc` | Stop Effects | Disable all active effects |

## 🔧 Advanced Configuration

### Custom Color Schemes
Create your own color schemes by extending the `colorSchemes` object:

```javascript
animation.colorSchemes.custom = () => {
    const hue = (Date.now() * 0.01) % 360;
    return `hsla(${hue}, 70%, 60%, 0.8)`;
};
```

### Particle Behavior Modification
Customize particle physics by extending the `QuantumParticle` class:

```javascript
class CustomParticle extends QuantumParticle {
    constructor(x, y, color, speed) {
        super(x, y, color, speed);
        this.mass = Math.random() * 2 + 1;
        this.charge = Math.random() < 0.5 ? -1 : 1;
    }

    update(width, height, delta) {
        // Custom physics here
        super.update(width, height, delta);
    }
}
```

## 📊 Performance Optimization

### Best Practices
1. **Particle Count Management**
   - Adjust based on device capability
   - Monitor FPS and auto-adjust if needed
   - Use spatial partitioning for large counts

2. **Connection Optimization**
   - Implement quadtree for particle proximity
   - Limit connection distance dynamically
   - Use WebGL for intensive scenarios

3. **Effect Combinations**
   - Avoid combining CPU-intensive effects
   - Limit trail length on mobile devices
   - Disable glow effects on low-end devices

### Performance Monitoring
```javascript
// Enable performance monitoring
animation.enableMetrics({
    fps: true,
    particleCount: true,
    drawCalls: true,
    memoryUsage: true
});
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Process
1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Style Guide
- Follow JavaScript ES6+ standards
- Use meaningful variable names
- Comment complex algorithms
- Include JSDoc documentation
- Follow the existing code structure

### Testing
```bash
# Run unit tests
npm test

# Run performance tests
npm run test:performance

# Run all tests with coverage
npm run test:coverage
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by quantum mechanics and particle physics
- Built with vanilla JavaScript and HTML5 Canvas
- Special thanks to the creative coding community
- Particle system inspired by nature's fundamental forces
- UI design influenced by modern glass-morphism trends

## 📚 Resources

- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Particle System Basics](https://natureofcode.com/book/chapter-4-particle-systems/)
- [Quantum Mechanics Visualization](https://en.wikipedia.org/wiki/Quantum_mechanics)
- [Creative Coding Guide](https://github.com/terkelg/awesome-creative-coding)

## 🔮 Future Features

- [ ] WebGL Renderer for improved performance
- [ ] Additional particle effects and behaviors
- [ ] VR/AR support for immersive experience
- [ ] Audio reactivity and visualization
- [ ] Mobile gesture controls
- [ ] Particle system presets
- [ ] Custom effect creator
- [ ] Performance profiling tools

---

<div align="center">

Made with ❤️ by CLOUDWERX LAB

[![Follow me on Twitter](https://img.shields.io/twitter/follow/cloudwerxlab?style=social)](https://twitter.com/cloudwerxlab)
[![Follow me on GitHub](https://img.shields.io/github/followers/cloudwerxlab?style=social)](https://github.com/cloudwerxlab)

</div>
