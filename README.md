# UFCourt

Interactive WebGL sports court simulation inspired by UFC indoor arenas, featuring dynamic lighting, real-time physics, and first-person exploration.

# Tech Stack

This project was developed using modern web graphics and real-time rendering technologies.

## Core Technologies

- JavaScript
- WebGL
- Node.js
- npm

## Libraries and Frameworks

- Three.js — 3D rendering and scene management
- Rapier — real-time physics simulation
- lil-gui — graphical interface controls

## Build Tool

- Vite — frontend development environment and bundler

---

# Development Environment

## Requirements

- Node.js
- npm

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

# Project Structure

```text
UFCourt/
│
├── public/
├── src/
│   ├── main.js
│   ├── style.css
│   ├── scene/
│   ├── lights/
│   ├── physics/
│   ├── objects/
│   ├── loaders/
│   ├── gui/
│   ├── utils/
│   └── assets/
│
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## Root Files

### `index.html`

Main HTML entry point of the application.  
Loads the WebGL canvas and initializes the main JavaScript module.

---

### `package.json`

Contains project metadata, dependencies, and npm scripts.

---

### `vite.config.js`

Configuration file for the Vite development environment and build system.

---

### `.gitignore`

Specifies files and folders ignored by Git.

---

### `README.md`

Project documentation, setup instructions, and architecture overview.

---

# Source Folder (`src/`)

Contains the main application source code.

---

## `main.js`

Main entry point of the application.

Responsible for:

- initializing the scene
- creating the renderer and camera
- loading lights and objects
- starting the animation loop
- updating physics and rendering frames

---

## `style.css`

Global styles for the application.

Used to:

- remove default browser margins
- configure fullscreen rendering
- style overlays and GUI components

---

# Scene (`scene/`)

Contains core scene configuration files.

---

### `setupScene.js`

Creates and configures the main Three.js scene.

Handles:

- scene initialization
- background settings
- fog and environment settings

---

### `camera.js`

Configures the main perspective camera used by the player.

---

### `renderer.js`

Creates and configures the WebGL renderer.

Handles:

- antialiasing
- shadow mapping
- tone mapping
- resize events

---

### `controls.js`

Implements player movement and mouse controls using first-person camera interaction.

---

# Lighting (`lights/`)

Contains all scene lighting systems.

---

### `ambientLight.js`

Creates low-intensity ambient lighting for basic scene visibility.

---

### `sunLight.js`

Implements the dynamic sunlight system.

Handles:

- sun movement
- day/night cycle
- sunlight intensity updates

---

### `spotlights.js`

Creates and controls the indoor court spotlights.

Allows:

- enabling/disabling spotlights
- configuring shadow casting

---

# Physics (`physics/`)

Contains Rapier physics engine integration and physical simulation logic.

---

### `physicsWorld.js`

Initializes and updates the physics simulation world.

---

### `playerPhysics.js`

Implements the player collider and collision interactions.

---

### `ballPhysics.js`

Creates physics-enabled balls with gravity and collision behavior.

Handles:

- rigid bodies
- bouncing
- object interactions

---

# Objects (`objects/`)

Contains visual scene objects and imported models.

---

### `court.js`

Loads and configures the sports court model.

---

### `balls.js`

Creates visual ball meshes synchronized with physics bodies.

---

### `walls.js`

Defines invisible collision walls used for physical boundaries.

---

# Loaders (`loaders/`)

Contains model and asset loading utilities.

---

### `gltfLoader.js`

Handles loading `.gltf` and `.glb` 3D models.

---

# GUI (`gui/`)

Contains graphical user interface controls.

---

### `lightingGUI.js`

Implements the interactive lighting control panel using lil-gui.

Allows users to:

- toggle spotlights
- modify lighting parameters

---

# Utilities (`utils/`)

Contains helper functions and reusable utilities.

---

### `constants.js`

Stores reusable constants and configuration values.

---

### `helpers.js`

Contains general-purpose utility functions.

---

### `time.js`

Handles timing and animation-related calculations.

---

# Assets (`assets/`)

Stores external project resources.

---

## `models/`

Contains imported 3D models.

Examples:

- court models
- ball models

---

## `textures/`

Contains texture maps used by scene materials.

Examples:

- wood floor textures
- wall textures

---

## `hdr/`

Contains HDR environment maps used for advanced lighting and reflections.
