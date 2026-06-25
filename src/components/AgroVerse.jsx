import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './AgroVerse.css'

const caneColors = [0xc6d88d, 0x7fa45a, 0x507d38, 0xc69a4a]

function createCane(x, z, height, color) {
  const group = new THREE.Group()
  const stalk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.05, height, 8, 1),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.62,
      metalness: 0.05,
      emissive: new THREE.Color(color).multiplyScalar(0.08),
    }),
  )

  stalk.position.y = height / 2
  group.add(stalk)

  for (let i = 0; i < 4; i += 1) {
    const leaf = new THREE.Mesh(
      new THREE.ConeGeometry(0.025, 0.8 + i * 0.08, 5),
      new THREE.MeshStandardMaterial({
        color: i % 2 ? 0x7fd3d6 : 0xc6d88d,
        roughness: 0.72,
        emissive: i % 2 ? 0x083032 : 0x152511,
        emissiveIntensity: 0.12,
      }),
    )
    leaf.position.set(Math.sin(i * 1.7) * 0.26, height - 0.22 - i * 0.12, Math.cos(i * 1.7) * 0.26)
    leaf.rotation.set(1.25, i * 1.55, 0.55)
    group.add(leaf)
  }

  group.position.set(x, 0, z)
  group.rotation.z = (Math.random() - 0.5) * 0.1
  return group
}

export default function AgroVerse() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return undefined
    }

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 80)
    camera.position.set(0, 3.2, 8.4)

    scene.add(new THREE.AmbientLight(0xc6d88d, 0.75))

    const keyLight = new THREE.DirectionalLight(0x7fd3d6, 2.5)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)

    const warmLight = new THREE.PointLight(0xc69a4a, 5.2, 18)
    warmLight.position.set(-4, 2.5, 2)
    scene.add(warmLight)

    const root = new THREE.Group()
    scene.add(root)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18, 44, 44),
      new THREE.MeshStandardMaterial({
        color: 0x0d1b12,
        roughness: 0.95,
        metalness: 0.02,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.04
    root.add(ground)

    const caneRows = new THREE.Group()
    for (let row = -4; row <= 4; row += 1) {
      for (let col = -7; col <= 7; col += 1) {
        if ((row + col) % 2 === 0) {
          const height = 0.9 + Math.random() * 1.3
          const color = caneColors[Math.abs(row + col) % caneColors.length]
          caneRows.add(createCane(col * 0.58 + row * 0.08, row * 0.62, height, color))
        }
      }
    }
    caneRows.position.set(0, -0.15, -0.8)
    caneRows.rotation.x = -0.12
    root.add(caneRows)

    const orbit = new THREE.Group()
    const orbitMaterial = new THREE.MeshStandardMaterial({
      color: 0x7fd3d6,
      emissive: 0x154447,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.35,
    })

    for (let i = 0; i < 28; i += 1) {
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.035 + (i % 3) * 0.012, 12, 12), orbitMaterial)
      const angle = (i / 28) * Math.PI * 2
      particle.position.set(Math.cos(angle) * 2.7, Math.sin(angle * 1.9) * 0.5 + 1.15, Math.sin(angle) * 1.25)
      orbit.add(particle)
    }

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.72, 0.008, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0x7fd3d6, transparent: true, opacity: 0.34 }),
    )
    ring.rotation.x = Math.PI / 2.8
    orbit.add(ring)
    root.add(orbit)

    const clock = new THREE.Clock()
    let frameId = 0

    const resize = () => {
      if (!mount.clientWidth || !mount.clientHeight) {
        return
      }
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      root.rotation.y = Math.sin(elapsed * 0.18) * 0.18
      root.position.y = Math.sin(elapsed * 0.8) * 0.08
      orbit.rotation.y = elapsed * 0.42
      orbit.rotation.z = Math.sin(elapsed * 0.32) * 0.16
      caneRows.children.forEach((cane, index) => {
        cane.rotation.z = Math.sin(elapsed * 1.15 + index * 0.3) * 0.035
      })
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    resize()
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose()
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
  }, [])

  return (
    <div className="agro-verse" aria-hidden="true">
      <div className="agro-verse__canvas" ref={mountRef} />
      <div className="agro-verse__hud">
        <span>3D FIELD INTELLIGENCE</span>
        <strong>Caña · Brix · Riego · IA</strong>
      </div>
    </div>
  )
}
