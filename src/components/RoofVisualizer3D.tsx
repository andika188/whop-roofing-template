import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { 
  Rotate3d, 
  Sun, 
  Sunset, 
  CloudRain, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  Check, 
  Maximize2,
  RefreshCw
} from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface RoofVisualizer3DProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
}

type MaterialType = 'asphalt' | 'metal' | 'spanish' | 'solar'
type LightingMode = 'day' | 'golden' | 'storm'

interface MaterialOption {
  id: MaterialType
  name: string
  subtitle: string
  color: string
  roughness: number
  metalness: number
  pricePerSqFt: number
  warranty: string
  tag: string
  gradient: string
}

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    id: 'asphalt',
    name: 'GAF Timberline HDZ®',
    subtitle: 'Architectural Asphalt Shingles',
    color: '#2d3748',
    roughness: 0.85,
    metalness: 0.1,
    pricePerSqFt: 4.85,
    warranty: '50-Year Non-Prorated',
    tag: 'Most Popular',
    gradient: 'from-slate-700 to-slate-900'
  },
  {
    id: 'metal',
    name: 'Standing Seam Metal',
    subtitle: 'Galvalume 24-Gauge Steel',
    color: '#334155',
    roughness: 0.25,
    metalness: 0.85,
    pricePerSqFt: 8.50,
    warranty: 'Lifetime 70-Year',
    tag: 'Hail Proof Class 4',
    gradient: 'from-blue-600 to-slate-800'
  },
  {
    id: 'spanish',
    name: 'Tuscan Clay Barrel Tile',
    subtitle: 'Authentic Spanish Terracotta',
    color: '#c2410c',
    roughness: 0.7,
    metalness: 0.05,
    pricePerSqFt: 11.20,
    warranty: 'Lifetime 75-Year',
    tag: 'Luxury Architectural',
    gradient: 'from-orange-600 to-amber-700'
  },
  {
    id: 'solar',
    name: 'Obsidian PV Solar Shingles',
    subtitle: 'Integrated Clean Energy Glass',
    color: '#0f172a',
    roughness: 0.15,
    metalness: 0.9,
    pricePerSqFt: 14.50,
    warranty: '25-Year Power + 50-Year Roof',
    tag: 'Net-Zero Solar',
    gradient: 'from-indigo-600 to-blue-950'
  }
]

export const RoofVisualizer3D: React.FC<RoofVisualizer3DProps> = ({
  onOpenCheckout,
  onOpenEstimate
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeMaterial, setActiveMaterial] = useState<MaterialType>('asphalt')
  const [lightingMode, setLightingMode] = useState<LightingMode>('day')
  const [sqFt, setSqFt] = useState<number>(2400)
  const [isRotating, setIsRotating] = useState<boolean>(true)
  const [canvasLoading, setCanvasLoading] = useState<boolean>(true)

  // Three.js internal mutable refs
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const houseGroupRef = useRef<THREE.Group | null>(null)
  const roofMeshesRef = useRef<THREE.Mesh[]>([])
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null)
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null)
  const rainSystemRef = useRef<THREE.Points | null>(null)
  const reqAnimIdRef = useRef<number | null>(null)

  const selectedMaterial = MATERIAL_OPTIONS.find(m => m.id === activeMaterial) || MATERIAL_OPTIONS[0]
  const estimatedCost = Math.round(sqFt * selectedMaterial.pricePerSqFt * 1.35) // Material + Labor + tear-off
  const depositAmount = SITE_CONFIG.plans.deposit.price
  const remainingBalance = estimatedCost - depositAmount

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight || 460

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xf1f5f9) // Crisp modern architectural studio background
    scene.fog = new THREE.FogExp2(0xf1f5f9, 0.015)

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(11, 7.5, 12)
    camera.lookAt(0, 1.2, 0)
    cameraRef.current = camera

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    // Clear previous children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 3. Lighting setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfd8dc, 0.9)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)
    hemiLightRef.current = hemiLight

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.6)
    dirLight.position.set(12, 18, 10)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 40
    dirLight.shadow.camera.left = -10
    dirLight.shadow.camera.right = 10
    dirLight.shadow.camera.top = 10
    dirLight.shadow.camera.bottom = -10
    dirLight.shadow.bias = -0.0005
    scene.add(dirLight)
    dirLightRef.current = dirLight

    // 4. Ground / Lawn Platform
    const groundGeo = new THREE.CylinderGeometry(8.5, 8.8, 0.4, 48)
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Architectural dark charcoal base rim
      roughness: 0.9,
      metalness: 0.1
    })
    const groundMesh = new THREE.Mesh(groundGeo, groundMat)
    groundMesh.position.y = -0.2
    groundMesh.receiveShadow = true
    scene.add(groundMesh)

    // Lawn surface
    const lawnGeo = new THREE.CylinderGeometry(8.3, 8.3, 0.42, 48)
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x15803d, // Lush manicured green grass
      roughness: 0.95,
      metalness: 0.05
    })
    const lawnMesh = new THREE.Mesh(lawnGeo, lawnMat)
    lawnMesh.position.y = -0.19
    lawnMesh.receiveShadow = true
    scene.add(lawnMesh)

    // 5. Procedural House Group
    const houseGroup = new THREE.Group()
    houseGroupRef.current = houseGroup
    scene.add(houseGroup)

    // Main House Walls (Limestone / Stucco)
    const wallGeo = new THREE.BoxGeometry(5.4, 2.5, 4.4)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Crisp architectural white stucco
      roughness: 0.85,
      metalness: 0.05
    })
    const wallMesh = new THREE.Mesh(wallGeo, wallMat)
    wallMesh.position.y = 1.25
    wallMesh.castShadow = true
    wallMesh.receiveShadow = true
    houseGroup.add(wallMesh)

    // Foundation Base Rim
    const baseGeo = new THREE.BoxGeometry(5.6, 0.35, 4.6)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x64748b, // Architectural stone foundation
      roughness: 0.9
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    baseMesh.position.y = 0.17
    baseMesh.receiveShadow = true
    houseGroup.add(baseMesh)

    // Front Entrance Door & Portico
    const doorGeo = new THREE.BoxGeometry(0.9, 1.7, 0.1)
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x78350f, // Rich Mahogany wood door
      roughness: 0.35
    })
    const doorMesh = new THREE.Mesh(doorGeo, doorMat)
    doorMesh.position.set(0, 0.9, 2.21)
    doorMesh.castShadow = true
    houseGroup.add(doorMesh)

    // Windows with glass reflections
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Sky blue reflective glass
      roughness: 0.1,
      metalness: 0.85
    })
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })

    const addWindow = (x: number, y: number, z: number, w: number, h: number) => {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.08), windowFrameMat)
      frame.position.set(x, y, z)
      houseGroup.add(frame)
      const glass = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.09), windowMat)
      glass.position.set(x, y, z)
      houseGroup.add(glass)
    }

    // Front windows
    addWindow(-1.7, 1.4, 2.22, 1.1, 1.1)
    addWindow(1.7, 1.4, 2.22, 1.1, 1.1)

    // Side windows
    const sideGlassMat = windowMat
    const leftWindow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 1.2), sideGlassMat)
    leftWindow.position.set(-2.71, 1.4, 0)
    houseGroup.add(leftWindow)

    const rightWindow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 1.2), sideGlassMat)
    rightWindow.position.set(2.71, 1.4, 0)
    houseGroup.add(rightWindow)

    // Chimney with brick styling
    const chimneyGeo = new THREE.BoxGeometry(0.8, 2.4, 0.8)
    const chimneyMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c, // Texas Red Brick
      roughness: 0.85
    })
    const chimneyMesh = new THREE.Mesh(chimneyGeo, chimneyMat)
    chimneyMesh.position.set(-1.6, 3.4, -0.9)
    chimneyMesh.castShadow = true
    houseGroup.add(chimneyMesh)

    // Chimney cap
    const capGeo = new THREE.BoxGeometry(0.96, 0.12, 0.96)
    const capMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 })
    const capMesh = new THREE.Mesh(capGeo, capMat)
    capMesh.position.set(-1.6, 4.6, -0.9)
    capMesh.castShadow = true
    houseGroup.add(capMesh)

    // 6. Realistic 3D Roof Slopes (Gable Eaves + Hip Geometry)
    const roofMeshes: THREE.Mesh[] = []

    // Roof Slope Geometry
    const roofWidth = 6.0
    const roofSlopeLength = 3.1
    const roofAngle = Math.PI / 6.2 // ~29 degrees realistic roofing slope

    const initialMatConfig = MATERIAL_OPTIONS[0]
    const initialRoofMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialMatConfig.color),
      roughness: initialMatConfig.roughness,
      metalness: initialMatConfig.metalness
    })

    // Front Slope
    const slopeGeo = new THREE.BoxGeometry(roofWidth, 0.18, roofSlopeLength)
    
    const frontSlope = new THREE.Mesh(slopeGeo, initialRoofMat)
    frontSlope.position.set(0, 3.25, 1.15)
    frontSlope.rotation.x = roofAngle
    frontSlope.castShadow = true
    frontSlope.receiveShadow = true
    houseGroup.add(frontSlope)
    roofMeshes.push(frontSlope)

    // Back Slope
    const backSlope = new THREE.Mesh(slopeGeo, initialRoofMat)
    backSlope.position.set(0, 3.25, -1.15)
    backSlope.rotation.x = -roofAngle
    backSlope.castShadow = true
    backSlope.receiveShadow = true
    houseGroup.add(backSlope)
    roofMeshes.push(backSlope)

    // Gable Triangular Ends (Left & Right Fascia)
    const createGableEnd = (xPos: number) => {
      const gableShape = new THREE.Shape()
      gableShape.moveTo(-2.2, 0)
      gableShape.lineTo(2.2, 0)
      gableShape.lineTo(0, 1.5)
      gableShape.closePath()

      const extrudeSettings = { depth: 0.2, bevelEnabled: false }
      const gableGeo = new THREE.ExtrudeGeometry(gableShape, extrudeSettings)
      const gableMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 })
      const gableMesh = new THREE.Mesh(gableGeo, gableMat)
      gableMesh.rotation.y = Math.PI / 2
      gableMesh.position.set(xPos, 2.5, 0)
      gableMesh.castShadow = true
      houseGroup.add(gableMesh)
    }

    createGableEnd(2.7)
    createGableEnd(-2.9)

    // Ridge Cap on top of roof
    const ridgeGeo = new THREE.BoxGeometry(roofWidth + 0.1, 0.14, 0.3)
    const ridgeMesh = new THREE.Mesh(ridgeGeo, initialRoofMat)
    ridgeMesh.position.set(0, 3.98, 0)
    ridgeMesh.castShadow = true
    houseGroup.add(ridgeMesh)
    roofMeshes.push(ridgeMesh)

    // Gutters along eaves
    const gutterGeo = new THREE.BoxGeometry(roofWidth + 0.2, 0.12, 0.12)
    const gutterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.7 })
    
    const frontGutter = new THREE.Mesh(gutterGeo, gutterMat)
    frontGutter.position.set(0, 2.5, 2.55)
    houseGroup.add(frontGutter)

    const backGutter = new THREE.Mesh(gutterGeo, gutterMat)
    backGutter.position.set(0, 2.5, -2.55)
    houseGroup.add(backGutter)

    roofMeshesRef.current = roofMeshes

    // 7. Atmospheric Rain Particle System (for storm mode)
    const rainCount = 1200
    const rainGeo = new THREE.BufferGeometry()
    const rainPositions = new Float32Array(rainCount * 3)

    for (let i = 0; i < rainCount * 3; i += 3) {
      rainPositions[i] = (Math.random() - 0.5) * 16
      rainPositions[i + 1] = Math.random() * 14 + 1
      rainPositions[i + 2] = (Math.random() - 0.5) * 16
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3))
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.08,
      transparent: true,
      opacity: 0.0 // hidden by default until storm mode
    })
    const rainSystem = new THREE.Points(rainGeo, rainMat)
    scene.add(rainSystem)
    rainSystemRef.current = rainSystem

    setCanvasLoading(false)

    // 8. Mouse / Touch Drag Orbit Controls
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !houseGroupRef.current) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY

      houseGroupRef.current.rotation.y += deltaX * 0.008
      
      // Pitch tilt clamped
      if (cameraRef.current) {
        cameraRef.current.position.y = Math.max(3.5, Math.min(12, cameraRef.current.position.y + deltaY * 0.02))
        cameraRef.current.lookAt(0, 1.2, 0)
      }

      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !houseGroupRef.current || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - prevMouseX
      const deltaY = e.touches[0].clientY - prevMouseY

      houseGroupRef.current.rotation.y += deltaX * 0.008
      if (cameraRef.current) {
        cameraRef.current.position.y = Math.max(3.5, Math.min(12, cameraRef.current.position.y + deltaY * 0.02))
        cameraRef.current.lookAt(0, 1.2, 0)
      }

      prevMouseX = e.touches[0].clientX
      prevMouseY = e.touches[0].clientY
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)

    // 9. Animation Loop
    let clock = new THREE.Clock()

    const animate = () => {
      reqAnimIdRef.current = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // Auto rotation if enabled and not currently dragging
      if (houseGroupRef.current && isRotating && !isDragging) {
        houseGroupRef.current.rotation.y += delta * 0.28
      }

      // Animate Rain if active
      if (rainSystemRef.current) {
        const rMat = rainSystemRef.current.material as THREE.PointsMaterial
        if (rMat.opacity > 0) {
          const positions = rainSystemRef.current.geometry.attributes.position.array as Float32Array
          for (let i = 1; i < rainCount * 3; i += 3) {
            positions[i] -= delta * 18
            if (positions[i] < 0) {
              positions[i] = 14
            }
          }
          rainSystemRef.current.geometry.attributes.position.needsUpdate = true
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight || 460
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (reqAnimIdRef.current) cancelAnimationFrame(reqAnimIdRef.current)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      renderer.dispose()
    }
  }, [])

  // Handle Material Changes
  useEffect(() => {
    if (!roofMeshesRef.current.length) return
    const matConfig = MATERIAL_OPTIONS.find(m => m.id === activeMaterial)
    if (!matConfig) return

    const newMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(matConfig.color),
      roughness: matConfig.roughness,
      metalness: matConfig.metalness
    })

    roofMeshesRef.current.forEach(mesh => {
      mesh.material = newMat
    })

    trackWhopEvent('service_viewed', {
      service_name: `3D Visualizer: ${matConfig.name}`,
      category: '3d_material_spec',
      material_id: matConfig.id,
      sq_ft: sqFt,
      estimated_price: estimatedCost
    })
  }, [activeMaterial])

  // Handle Lighting Modes
  useEffect(() => {
    if (!sceneRef.current || !dirLightRef.current || !hemiLightRef.current || !rainSystemRef.current) return
    const rainMat = rainSystemRef.current.material as THREE.PointsMaterial

    if (lightingMode === 'day') {
      sceneRef.current.background = new THREE.Color(0xf1f5f9)
      hemiLightRef.current.color.setHex(0xffffff)
      hemiLightRef.current.groundColor.setHex(0xcfd8dc)
      hemiLightRef.current.intensity = 0.95
      dirLightRef.current.color.setHex(0xfff7ed)
      dirLightRef.current.intensity = 1.6
      dirLightRef.current.position.set(12, 18, 10)
      rainMat.opacity = 0
    } else if (lightingMode === 'golden') {
      sceneRef.current.background = new THREE.Color(0xfef3c7) // Warm golden sunset
      hemiLightRef.current.color.setHex(0xfbbf24)
      hemiLightRef.current.groundColor.setHex(0x78350f)
      hemiLightRef.current.intensity = 0.8
      dirLightRef.current.color.setHex(0xf97316) // Sunset orange
      dirLightRef.current.intensity = 2.2
      dirLightRef.current.position.set(16, 8, 14) // Low horizon angle
      rainMat.opacity = 0
    } else if (lightingMode === 'storm') {
      sceneRef.current.background = new THREE.Color(0x334155) // Dark slate storm sky
      hemiLightRef.current.color.setHex(0x64748b)
      hemiLightRef.current.groundColor.setHex(0x1e293b)
      hemiLightRef.current.intensity = 0.5
      dirLightRef.current.color.setHex(0x94a3b8)
      dirLightRef.current.intensity = 0.8
      dirLightRef.current.position.set(5, 12, 6)
      rainMat.opacity = 0.75
    }
  }, [lightingMode])

  const handleDepositClick = () => {
    trackWhopEvent('deposit_started', {
      plan_name: SITE_CONFIG.plans.deposit.name,
      amount: SITE_CONFIG.plans.deposit.price,
      currency: 'USD',
      material_spec: selectedMaterial.name,
      estimated_job_value: estimatedCost,
      source: '3d_roof_visualizer'
    })
    onOpenCheckout('deposit')
  }

  const handleResetCamera = () => {
    if (cameraRef.current && houseGroupRef.current) {
      cameraRef.current.position.set(11, 7.5, 12)
      cameraRef.current.lookAt(0, 1.2, 0)
      houseGroupRef.current.rotation.set(0, 0, 0)
    }
  }

  return (
    <section id="roof-visualizer" className="py-20 bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900 relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-blue-200">
            <Rotate3d className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive WebGL 3D Roof Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Customize Your Roof in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600">Real-Time 3D</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Drag to rotate 360°, inspect architectural materials, test Texas weather conditions, and instantly calculate your high-ticket project investment with Whop card-on-file deposit security.
          </p>
        </div>

        {/* Studio Grid: Left 3D Viewport, Right Controls & Whop Checkout Estimator */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 3D Viewport Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl bg-slate-200/60 border-2 border-slate-300 shadow-2xl overflow-hidden group">
              
              {/* The Three.js Canvas Container */}
              <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Viewport Floating Top Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-900 shadow-md border border-slate-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>360° Orbit Active</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md">
                  {selectedMaterial.tag}
                </span>
              </div>

              {/* Viewport Bottom Controls: Camera & Lighting */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10">
                
                {/* Lighting Mode Switcher */}
                <div className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg">
                  <button
                    onClick={() => setLightingMode('day')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      lightingMode === 'day' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Daylight Mode"
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Day</span>
                  </button>

                  <button
                    onClick={() => setLightingMode('golden')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      lightingMode === 'golden' 
                        ? 'bg-amber-500 text-slate-950 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Golden Hour Sunset"
                  >
                    <Sunset className="w-3.5 h-3.5 text-orange-600" />
                    <span className="hidden sm:inline">Sunset</span>
                  </button>

                  <button
                    onClick={() => setLightingMode('storm')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      lightingMode === 'storm' 
                        ? 'bg-slate-800 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Storm & Rain Test"
                  >
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Rain</span>
                  </button>
                </div>

                {/* Viewport Helpers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`p-2.5 rounded-xl backdrop-blur-md border shadow-lg transition ${
                      isRotating 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
                    }`}
                    title={isRotating ? 'Pause Rotation' : 'Auto-Rotate'}
                  >
                    <Rotate3d className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetCamera}
                    className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:bg-white shadow-lg transition"
                    title="Reset Angle"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Instruction pill */}
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full pointer-events-none hidden sm:block">
                Drag mouse / touch to rotate house
              </div>
            </div>

            {/* Quick feature checklist under canvas */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-slate-600">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block">Class A Fire Rated</span>
                <span>Maximum Underwriters Lab spec</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block">130 MPH Wind Proof</span>
                <span>Category 4 Hurricane Tested</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block">Whop Escrow Deposit</span>
                <span>Protected high-ticket flow</span>
              </div>
            </div>
          </div>

          {/* Controls, Material Selection & Pricing Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 1 • Architectural Specification</span>
                  <h3 className="text-xl font-black text-slate-900">Select Roof Material</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              {/* Material Selector Cards */}
              <div className="grid grid-cols-2 gap-3">
                {MATERIAL_OPTIONS.map((m) => {
                  const isSelected = activeMaterial === m.id
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveMaterial(m.id)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      <div>
                        <div className="w-6 h-6 rounded-lg border border-slate-300 shadow-inner mb-2" style={{ backgroundColor: m.color }} />
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">{m.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{m.subtitle}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-baseline justify-between text-xs">
                        <span className="font-extrabold text-blue-700">${m.pricePerSqFt.toFixed(2)}<span className="text-[10px] text-slate-400 font-normal">/sqft</span></span>
                        <span className="text-[10px] font-semibold text-slate-500">{m.warranty.split(' ')[0]}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Square Footage Slider */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Estimated Roof Area (Sq Ft):</span>
                  <span className="font-black text-blue-600 text-base">{sqFt.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="4500"
                  step="100"
                  value={sqFt}
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Cottage (1,200 sq ft)</span>
                  <span>Standard Ranch (2,400)</span>
                  <span>Estate (4,500 sq ft)</span>
                </div>
              </div>

              {/* High-Ticket Transparent Cost Calculation Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl shadow-lg space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>Estimated Total Project:</span>
                  <span className="text-xl font-black text-amber-400">${estimatedCost.toLocaleString()}</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Today's Reservation Deposit:</span>
                    </span>
                    <span className="font-bold text-white">${depositAmount} (Whop Setup Intent)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Balance upon completion:</span>
                    <span className="font-semibold text-slate-200">${remainingBalance.toLocaleString()} (Whop Invoices API)</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Your card is saved on file. No full charge until job is 100% inspected.</span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <button
                onClick={handleDepositClick}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <DollarSign className="w-5 h-5 stroke-[2.5]" />
                <span>Lock In 3D Spec with $500 Deposit</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenCheckout('inspection')}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition text-center"
                >
                  Book $149 Inspection
                </button>
                <button
                  onClick={onOpenEstimate}
                  className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition text-center"
                >
                  Custom Estimate
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
