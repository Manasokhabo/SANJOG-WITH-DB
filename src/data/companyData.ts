export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'crash-barriers' | 'mining-drilling' | 'road-safety' | 'concrete-machinery' | 'fencing-pipes';
  categoryLabel: string;
  image: string;
  featured: boolean;
  description: string;
  keyFeatures: string[];
  specs: {
    label: string;
    value: string;
  }[];
  standards: string[];
  certifications: string[];
  availability: 'In Production & Stock' | 'Custom Fabrication' | 'Immediate Dispatch';
  dimensions: string;
  materialGrade: string;
}

export interface Metric {
  value: string;
  unit: string;
  label: string;
  context: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  metric: string;
}

export interface Certification {
  code: string;
  name: string;
  authority: string;
  scope: string;
  status: 'Active & Verified';
}

export interface LeadershipMember {
  name: string;
  role: string;
  background: string;
  focus: string;
}

export const SANJOG_PRODUCTS: Product[] = [
  // Page 1 of PDF
  {
    id: 'w-beam-crash-barrier',
    name: 'W - Beam Crash Barrier',
    tagline: 'Standard Highway Safety Barrier System',
    category: 'crash-barriers',
    categoryLabel: 'Highway Crash Barriers',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    featured: true,
    description: 'Hot-dip galvanized dual-corrugated steel W-Beam crash barrier manufactured conforming to MoRTH Section 811 and AASHTO M180. Designed for highways, expressways, and bridges to absorb impact kinetic energy and redirect errant vehicles safely.',
    keyFeatures: [
      'High-tensile steel Fe410 / Fe510 conforming to IS 2062 & IS 5986',
      'Heavy-duty hot-dip galvanizing with minimum 550 g/m² zinc coating (IS 4759)',
      'Complete installation set including C-posts (150x75mm), spacer blocks, fasteners & terminal ends',
      'Cold roll-formed with precise CNC punched slotted bolt holes for uniform alignment'
    ],
    specs: [
      { label: 'Beam Thickness', value: '3.0 mm / 2.8 mm Standard (Class A / B)' },
      { label: 'Beam Profile', value: 'W-Shape (312 mm Total Width x 83 mm Depth)' },
      { label: 'Standard Length', value: '4318 mm Total (3810 mm Effective Center-to-Center)' },
      { label: 'Zinc Coating', value: 'Hot-Dip Galvanized ≥ 550 g/m² (avg 80-85 microns)' },
      { label: 'Yield Strength', value: '≥ 345 MPa / Tensile Strength ≥ 483 MPa' },
      { label: 'Fasteners', value: 'Grade 4.6 / 8.8 M16 Anti-theft Button Head Bolts with Nuts' }
    ],
    standards: ['AASHTO M180 Class A/B', 'MoRTH Section 811', 'IS 2062 Fe410', 'EN 1317-2'],
    certifications: ['ISO 9001:2015', 'NABL Test Certified', 'MoRTH Approved'],
    availability: 'In Production & Stock',
    dimensions: '4318 x 312 x 83 mm (3.0mm thickness)',
    materialGrade: 'IS 2062 Grade E250 / E350 Hot-Dip Galvanized Steel'
  },
  {
    id: 'thrie-beam-crash-barrier',
    name: 'Thrie Beam Crash Barrier',
    tagline: 'Heavy-Impact Triple-Corrugated Expressway Barrier',
    category: 'crash-barriers',
    categoryLabel: 'Highway Crash Barriers',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    featured: true,
    description: 'Triple-wave corrugated steel crash barrier offering significantly higher deflection resistance and vehicle capture capacity than standard W-beam. Engineered specifically for high-speed highway curves, bridge piers, steep embankments, and heavy commercial vehicle corridors.',
    keyFeatures: [
      'Triple-corrugation 508mm profile prevents heavy vehicle under-ride and roll-over',
      'Superior energy absorption with reduced dynamic deflection',
      'Seamless transition adapters for connecting to existing W-Beam barriers and bridge railings',
      'Heavy-duty hot-dip galvanized coating for 25+ years corrosion-free exterior lifespan'
    ],
    specs: [
      { label: 'Beam Thickness', value: '3.0 mm / 3.5 mm Heavy Duty' },
      { label: 'Profile Width', value: '508 mm Depth Triple Corrugated Wave' },
      { label: 'Effective Length', value: '3810 mm / 4318 mm Overall Length' },
      { label: 'Zinc Coating', value: '≥ 550 g/m² according to IS 4759 / ASTM A123' },
      { label: 'Post Compatibility', value: 'Compatible with 175x85mm or 150x75mm C-Posts and H-Posts' },
      { label: 'Impact Level', value: 'TL-4 / TL-5 Crash Test Tested Performance' }
    ],
    standards: ['AASHTO M180 Type II', 'MoRTH IRC Guidelines', 'EN 1317 H2/H3 Containment'],
    certifications: ['ISO 9001:2015', 'Government Laboratory Tested', 'CE Certified'],
    availability: 'In Production & Stock',
    dimensions: '4318 x 508 x 83 mm (3.0mm/3.5mm thickness)',
    materialGrade: 'High Tensile Structural Steel Fe410 / Fe510'
  },
  {
    id: 'mining-drill-rod',
    name: 'Mining Drill Rod',
    tagline: 'High-Tensile Hollow Mining & Blast Hole Drill Steel',
    category: 'mining-drilling',
    categoryLabel: 'Mining & Drilling',
    image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg',
    featured: true,
    description: 'High-frequency induction-hardened hollow alloy steel drill rods for open-cast mining, underground quarrying, tunneling, and exploratory blast hole drilling. High fatigue endurance with precision thread couplings.',
    keyFeatures: [
      'Manufactured from specialized hollow alloy steel with uniform flushing central hole',
      'Carburized and shot-peened heat treatment for supreme wear and fatigue resistance',
      'Precision machined threaded ends (R25, R28, R32, T38, T45, T51)',
      'Anti-galling anti-seizure thread geometry for smooth breakout'
    ],
    specs: [
      { label: 'Material Alloy', value: 'High Strength Chrome-Molybdenum Alloy Drill Steel' },
      { label: 'Thread Types', value: 'R25, R32, T38, T45, T51 Male/Female' },
      { label: 'Rod Diameters', value: '32 mm, 38 mm, 45 mm, 51 mm Round/Hex' },
      { label: 'Standard Lengths', value: '1.2 m, 1.8 m, 2.4 m, 3.0 m, 3.6 m, 4.2 m' },
      { label: 'Flushing Hole', value: '9 mm to 14 mm concentric central bore' },
      { label: 'Surface Treatment', value: 'Deep Carburized Surface 58-62 HRC' }
    ],
    standards: ['ISO 10207', 'Atlas Copco / Sandvik Thread Compatible Standards'],
    certifications: ['Metallurgical Mill Certified', 'Hardness Depth Verified'],
    availability: 'In Production & Stock',
    dimensions: 'Lengths from 1200 mm to 4200 mm, Dia 32-51 mm',
    materialGrade: 'Ultra High-Tensile 23CrNi3Mo / 35CrMo Alloy Steel'
  },
  {
    id: 'tct-drill-rod',
    name: 'TCT Drill Rod',
    tagline: 'Tungsten Carbide Tipped Integral & Tapered Drill Rods',
    category: 'mining-drilling',
    categoryLabel: 'Mining & Drilling',
    image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg',
    featured: true,
    description: 'Tungsten Carbide Tipped (TCT) chisel and cross-head drill rods engineered for granite quarries, marble excavation, road cutting, and hard rock drilling. Features premium grade sintered tungsten carbide inserts with high impact toughness.',
    keyFeatures: [
      'High-grade virgin tungsten carbide inserts (YG11C / YG15) for maximum rock penetration',
      'Hexagonal forged shank with integrated collar (H19mm / H22mm / H25mm)',
      'Precision brazed tips ensuring zero detachment under high-pressure pneumatic impact',
      'Optimized flushing hole design prevents hole plugging in wet or dry conditions'
    ],
    specs: [
      { label: 'Hex Shank Size', value: 'H22 x 108mm, H19 x 108mm, H25 x 108mm' },
      { label: 'Bit Diameters', value: '32 mm, 34 mm, 36 mm, 38 mm, 40 mm, 42 mm' },
      { label: 'Rod Lengths', value: '400 mm, 600 mm, 800 mm, 1200 mm, 1600 mm, 2400 mm, 3200 mm' },
      { label: 'Tip Type', value: 'Tungsten Carbide Chisel Tip / Cross Bit' },
      { label: 'Carbide Hardness', value: 'HRA 89.5 - 91.5' },
      { label: 'Body Steel', value: 'Sanbar 64 equivalent Hollow Hexagonal Drill Steel' }
    ],
    standards: ['Mining Safety Standard DGMS Approved', 'ISO Rock Drilling Tool Standard'],
    certifications: ['Ultrasonic Tested', 'Induction Brazing Certified'],
    availability: 'In Production & Stock',
    dimensions: 'H22mm Hex Body, Lengths 400mm - 3200mm',
    materialGrade: 'Hollow Hexagonal Steel + YG11C Tungsten Carbide Tip'
  },
  {
    id: 'rock-drill-machine',
    name: 'Rock Drill Machine',
    tagline: 'Pneumatic Jackhammer & Pusher Leg Rock Drilling Unit',
    category: 'mining-drilling',
    categoryLabel: 'Mining & Drilling',
    image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg',
    featured: true,
    description: 'Heavy-duty pneumatic handheld sinker and pusher-leg rock drill machine for quarrying, mining, tunneling, and bench drilling. Engineered for rapid penetration rates in hard and semi-hard rock with minimal air consumption.',
    keyFeatures: [
      'High-impact piston mechanism delivering up to 2100 blows per minute',
      'Integrated water and air flushing selector for wet and dry drilling operations',
      'Forged steel front head and cylinder barrel for maximum operational life',
      'Vibration-damped ergonomic control handle to minimize operator fatigue'
    ],
    specs: [
      { label: 'Drill Weight', value: '24 kg - 28 kg (Sinker / Air-leg model)' },
      { label: 'Piston Diameter', value: '65 mm to 76 mm' },
      { label: 'Piston Stroke', value: '70 mm' },
      { label: 'Impact Frequency', value: '≥ 34 Hz (approx. 2040 - 2150 blows/min)' },
      { label: 'Working Air Pressure', value: '0.4 - 0.63 MPa (4 - 6.3 bar)' },
      { label: 'Air Consumption', value: '≤ 55 L/s at 5 bar operating pressure' }
    ],
    standards: ['ISO 5391 Pneumatic Tools', 'DGMS Certified for Mining Use'],
    certifications: ['CE Certified', 'Factory Performance Tested'],
    availability: 'In Production & Stock',
    dimensions: '600 x 534 x 155 mm (approx)',
    materialGrade: 'Alloy Tool Steel Forging & Heat-Treated Cylinder'
  },
  {
    id: 'high-mast-lighting-tower',
    name: 'High Mast Lighting Octagonal Tower',
    tagline: 'Continuously Tapered Octagonal Galvanized Mast Tower',
    category: 'road-safety',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg',
    featured: true,
    description: 'Continuously tapered polygonal/octagonal high mast lighting tower manufactured from high-tensile steel plates. Designed for highway junctions, toll plazas, airports, railway yards, stadium sports lighting, and industrial logistics parks with a motorized winch lantern carriage.',
    keyFeatures: [
      'Continuously tapered octagonal/polygonal sections slip-stressed for maximum wind stability',
      'Hot-dip galvanized inside and outside in single dip according to BS EN ISO 1461',
      'Dual-drum motorized winch system with stainless steel wire ropes (AISI 316) for easy ground-level luminaire servicing',
      'Complete with aerodynamic luminaire head frame, aviation obstruction light, and weather-proof control panel'
    ],
    specs: [
      { label: 'Mast Heights', value: '12m, 16m, 20m, 25m, 30m, 35m' },
      { label: 'Cross-Section', value: 'Octagonal (8-sided) / Dodecagonal (12-sided) Tapered' },
      { label: 'Steel Grade', value: 'BS EN 10025 S355 / IS 2062 Grade E350' },
      { label: 'Wind Speed Design', value: 'Designed for basic wind speeds up to 180 km/h (IS 875 Part 3)' },
      { label: 'Galvanizing Thickness', value: 'Minimum 86 microns (avg 610 g/m²)' },
      { label: 'Winch & Motor', value: 'Power-operated reduction gear winch with torque limiter' }
    ],
    standards: ['IS 875 Part 3 (Wind Loading)', 'BS EN 40', 'TR-7 Technical Report ILP'],
    certifications: ['Structural Design Vetted', 'ISO 9001:2015', 'NABL Certified'],
    availability: 'In Production & Stock',
    dimensions: '12 meters to 35 meters height (Custom sizing available)',
    materialGrade: 'High Tensile Structural Steel S355 / IS 2062 E350'
  },

  // Page 2 of PDF
  {
    id: 'solar-road-studs',
    name: 'Solar Road Studs',
    tagline: 'Heavy-Duty Solar Powered LED Cat Eye Delineators',
    category: 'road-safety',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_road_marking_1791292203562.jpg',
    featured: true,
    description: 'High-impact cast aluminium alloy solar-powered road studs (solar cat eyes) providing continuous active delineation along highways, expressway medians, toll lanes, sharp curves, and airport taxiways. Flashing or steady high-intensity LEDs visible over 800 meters.',
    keyFeatures: [
      'High-grade die-cast aluminium housing with compressive load capacity exceeding 25 tons',
      'High-efficiency monocrystalline solar panel with ultra-long-life Ni-MH / Lithium battery',
      '6 high-intensity LEDs (Amber / Red / White / Green / Blue) with wide angle retroreflective prismatic lens',
      'IP68 fully potted epoxy sealed waterproof and dustproof submersible casing'
    ],
    specs: [
      { label: 'Housing Material', value: 'Heavy Die-Cast Aluminium Alloy ADC12' },
      { label: 'Compressive Load', value: '≥ 25 Tons (suitable for heavy multi-axle trucks)' },
      { label: 'Solar Panel', value: '2.5V / 120mA Monocrystalline Silicon' },
      { label: 'Battery Capacity', value: '1.2V / 600mAh - 800mAh Ni-MH High-Temp Battery' },
      { label: 'LED Quantity & Color', value: '6 LEDs (3 per side) - Amber / White / Red' },
      { label: 'Working Autonomy', value: '> 72 hours continuous flashing after full daylight charge' },
      { label: 'Visibility Range', value: '> 800 meters in dark or fog conditions' },
      { label: 'Waterproof Ingress', value: 'IP68 Certified' }
    ],
    standards: ['MoRTH Section 800 Guidelines', 'ASTM D4280', 'BS EN 1463'],
    certifications: ['IP68 Test Report', 'Load Bearing Certified (25T)'],
    availability: 'In Production & Stock',
    dimensions: '105 x 105 x 22 mm (with optional 50mm anchor shank)',
    materialGrade: 'Die-Cast Aluminium Alloy + Polycarbonate Lens'
  },
  {
    id: 'vibrating-needle',
    name: 'Vibrating Needle',
    tagline: 'High-Frequency Flexible Shaft Concrete Vibrator Poker',
    category: 'concrete-machinery',
    categoryLabel: 'Concrete Equipment',
    image: '/src/assets/images/sanjog_concrete_machinery_1791292215407.jpg',
    featured: false,
    description: 'High-amplitude internal concrete poker needles with heavy-duty flexible drive shafts for compacting concrete columns, slabs, bridge piers, and foundations. Eliminates air pockets and honeycomb defects for maximum concrete compressive strength.',
    keyFeatures: [
      'Precision machined eccentric poker head induction-hardened for abrasion resistance',
      'Multi-layer rubber-steel braided flexible shaft with oil-resistant exterior sheath',
      'Universal quick-release coupling compatible with electric, petrol, and diesel drive units',
      'Available in full size range: 25mm, 35mm, 40mm, 50mm, and 60mm diameter'
    ],
    specs: [
      { label: 'Needle Diameters', value: '25 mm, 35 mm, 40 mm, 50 mm, 60 mm' },
      { label: 'Flexible Shaft Length', value: '4 meters, 5 meters, 6 meters standard' },
      { label: 'Vibrating Frequency', value: '9,000 - 12,000 vibrations per minute (vpm)' },
      { label: 'Amplitude', value: '1.2 mm - 1.8 mm' },
      { label: 'Drive Connector', value: 'Dynapac / Chinese Hex / Pin Quick-Coupling Type' },
      { label: 'Casing Material', value: 'Abrasion-resistant Hardened High-Carbon Steel' }
    ],
    standards: ['IS 2505 (Concrete Vibrators - Immersion Type)'],
    certifications: ['Quality Tested', 'Wear Life Benchmark Tested'],
    availability: 'In Production & Stock',
    dimensions: 'Needle Dia 25-60mm x Length 4-6m',
    materialGrade: 'Induction Hardened Steel Head + High Tensile Core Wire'
  },
  {
    id: 'concrete-vibrator',
    name: 'Concrete Vibrator',
    tagline: 'Heavy-Duty Petrol & Electric Concrete Vibrator Drive Unit',
    category: 'concrete-machinery',
    categoryLabel: 'Concrete Equipment',
    image: '/src/assets/images/sanjog_concrete_machinery_1791292215407.jpg',
    featured: true,
    description: 'Robust drive units engineered to power vibrating needles across civil infrastructure and commercial construction sites. Available in electric motor (2.0 - 3.0 HP) and 4-stroke air-cooled petrol engine (5.0 HP Honda / Greaves) configurations on heavy tubular protective roll cages.',
    keyFeatures: [
      'Heavy-duty tubular steel roll-over protective cage with anti-vibration rubber damper mounts',
      'Precision machined universal drive dog adapter for instant needle attachment',
      'High torque output ensuring consistent vibration frequency even in dense low-slump concrete',
      'Low fuel consumption and easy pull recoil starter'
    ],
    specs: [
      { label: 'Engine Options', value: '5.0 HP 4-Stroke Air-Cooled Petrol or 2.0-3.0 HP Electric' },
      { label: 'Operating Speed', value: '2800 - 3600 RPM' },
      { label: 'Starting System', value: 'Recoil Pull Start (Petrol) / Heavy Push Button (Electric)' },
      { label: 'Frame Construction', value: 'Heavy Gauge Tubular Steel Cage with Rubber Isolators' },
      { label: 'Coupling Compatibility', value: 'Standard Claw / Dynapac / Hexagonal drive' },
      { label: 'Weight', value: 'approx. 22 kg - 28 kg' }
    ],
    standards: ['IS 2505', 'CE Machinery Directive Compliant'],
    certifications: ['ISO 9001:2015', 'Field Tested Approved'],
    availability: 'In Production & Stock',
    dimensions: '520 x 420 x 450 mm (approx)',
    materialGrade: 'Tubular Steel Frame + Cast Iron Drive Adapter'
  },
  {
    id: 'concrete-mixer-machine',
    name: 'Concrete Mixer Machine',
    tagline: 'Hydraulic Hopper Tilting Drum Concrete Batch Mixer',
    category: 'concrete-machinery',
    categoryLabel: 'Concrete Equipment',
    image: '/src/assets/images/sanjog_concrete_machinery_1791292215407.jpg',
    featured: true,
    description: 'Heavy-duty tilting drum concrete mixer with hydraulic loader hopper for rapid batching of cement, sand, gravel, and water. Built on a robust channel chassis with heavy cast iron drum, roller bearings, and pneumatic wheels for easy site towing.',
    keyFeatures: [
      'Cast iron thick-base drum with dual mixing blades for uniform homogeneous concrete mix',
      'Hydraulic loading hopper with mechanical wire rope or hydraulic cylinder hoist',
      'Driven by 6.0 HP - 8.0 HP air-cooled diesel engine or 5.0 HP 3-phase electric motor',
      'Heavy fabricated M.S. channel chassis mounted on 4 pneumatic/cast iron wheels with tow-bar'
    ],
    specs: [
      { label: 'Batch Capacity', value: '10/7 CFT (Unmixed 280 L / Mixed 200 L) & 14/10 CFT' },
      { label: 'Drum Speed', value: '18 - 22 RPM' },
      { label: 'Power Source', value: '6 HP - 8 HP Diesel Engine or 5 HP 3-Phase Electric Motor' },
      { label: 'Drum Construction', value: 'Cast Iron Base + Heavy Mild Steel Upper Cone' },
      { label: 'Hopper Operation', value: 'Hydraulic Cylinder or Heavy Duty Wire Rope Winch' },
      { label: 'Chassis & Wheels', value: 'Heavy ISMC Channel frame with pneumatic rubber tires' }
    ],
    standards: ['IS 1791 (Specification for Batch Type Concrete Mixers)'],
    certifications: ['Factory Tested Load Run', 'Quality Certified'],
    availability: 'In Production & Stock',
    dimensions: '2800 x 1800 x 2400 mm (approx)',
    materialGrade: 'Heavy ISMC Channel Chassis & Cast Iron Mixing Drum'
  },
  {
    id: 'road-marking-machine',
    name: 'Road Marking Machine',
    tagline: 'Thermoplastic Screed & Cold Spray Road Lane Striper',
    category: 'road-safety',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_road_marking_1791292203562.jpg',
    featured: true,
    description: 'Manual and self-propelled thermoplastic road line marking machine designed for expressway lane dividers, zebra crossings, airport runways, and parking lots. Features a high-capacity stainless steel insulated screed bucket and automatic synchronized glass bead dispenser.',
    keyFeatures: [
      'High-precision screed shoe (100mm, 150mm, 200mm, 300mm width) ensuring uniform line thickness',
      'Built-in LPG gas heating burner with temperature gauge to maintain thermoplastic paint at 180°C - 210°C',
      'Synchronous glass bead pressurized dropper for immediate retroreflective glass bead embedment',
      'Directional guide pointer and heavy cast rubber wheels for razor-straight line striping'
    ],
    specs: [
      { label: 'Paint Tank Capacity', value: '100 kg - 120 kg molten thermoplastic paint' },
      { label: 'Glass Bead Dispenser', value: '10 kg capacity automatic gear-linked synchronized dropper' },
      { label: 'Marking Widths', value: '100 mm, 150 mm, 200 mm, 250 mm, 300 mm (Interchangeable Shoes)' },
      { label: 'Heating System', value: 'Liquefied Petroleum Gas (LPG) Infra-red Burner with Thermometer' },
      { label: 'Marking Speed', value: '1.2 - 1.5 km/hour' },
      { label: 'Weight', value: 'approx. 135 kg (empty)' }
    ],
    standards: ['MoRTH Specifications for Road & Bridge Works Section 803'],
    certifications: ['CE Certified', 'Quality Tested'],
    availability: 'In Production & Stock',
    dimensions: '1250 x 900 x 1000 mm',
    materialGrade: 'High Grade Stainless Steel & Heat Resistant Cast Iron Shoe'
  },
  {
    id: 'bitumen-heating-tank',
    name: 'Bitumen Heating Tank',
    tagline: 'Thermic Fluid & Direct Heating Bitumen Asphalt Storage Tank',
    category: 'road-safety',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_road_marking_1791292203562.jpg',
    featured: false,
    description: 'Heavy-duty insulated bitumen storage and decanting tank fitted with internal thermic oil heating coils or direct diesel burner tubes. Engineered for road contractors and asphalt batch mix plants to rapidly melt, heat, and pump VG-10, VG-30, and VG-40 bitumen grades.',
    keyFeatures: [
      'High-density 75mm - 100mm glass wool insulation with outer GI / aluminium cladding for zero heat loss',
      'Internal seamless carbon steel heating coil tubes for uniform indirect thermic fluid circulation',
      'Heavy positive displacement bitumen transfer pump with jacketed piping and reverse pumping valve',
      'Digital thermostatic temperature display and automated high-temperature safety shutdown'
    ],
    specs: [
      { label: 'Storage Capacities', value: '15,000 L, 20,000 L, 30,000 L, 50,000 L' },
      { label: 'Heating Method', value: 'Indirect Thermic Fluid Coils or Direct Diesel Burner' },
      { label: 'Operating Temp', value: '140°C - 180°C Controlled' },
      { label: 'Insulation', value: '75 mm - 100 mm Resin Bonded Rockwool with 22 SWG GI Casing' },
      { label: 'Discharge Pump', value: 'Internal Jacketed Gear Bitumen Pump (300 - 500 LPM)' },
      { label: 'Shell Material', value: '5 mm - 8 mm IS 2062 Structural Carbon Steel Plate' }
    ],
    standards: ['IS 2062 Grade Steel Tank Construction', 'MoRTH Asphalt Standards'],
    certifications: ['Hydrostatic Pressure Tested', 'Weld Ultrasonic Checked'],
    availability: 'Custom Fabrication',
    dimensions: 'Customized based on 15T - 50T capacity',
    materialGrade: 'IS 2062 Structural Steel + High Density Thermal Rockwool'
  },

  // Page 3 of PDF
  {
    id: 'unplasticized-pvc-pipes',
    name: 'Unplasticized PVC Pipes',
    tagline: 'Heavy-Duty uPVC Pressure & Infrastructure Drainage Pipes',
    category: 'fencing-pipes',
    categoryLabel: 'Infrastructure Pipes & Fencing',
    image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg',
    featured: true,
    description: 'High-density unplasticized polyvinyl chloride (uPVC) pipes manufactured conforming to IS 4985 and ASTM standards. Ideal for highway culvert drainage, municipal water supply, telecom underground ducting, and industrial effluent transport with zero corrosion.',
    keyFeatures: [
      '100% lead-free non-toxic formulation with supreme chemical and biological resistance',
      'Smooth internal bore minimizing fluid friction loss and eliminating encrustation',
      'Elastomeric rubber ring joint (socket) and solvent cement joint variants available',
      'High tensile and impact strength with long 50+ year design service life'
    ],
    specs: [
      { label: 'Nominal Diameters', value: '20 mm to 315 mm (1/2" to 12")' },
      { label: 'Pressure Classes', value: 'Class 1 (2.5 kg/cm²), Class 2 (4 kg/cm²), Class 3 (6 kg/cm²), Class 4 (10 kg/cm²)' },
      { label: 'Standard Length', value: '6.0 meters per pipe (custom lengths on bulk order)' },
      { label: 'Jointing Type', value: 'Solvent Weld Socket / Elastomeric Sealing Ring Joint' },
      { label: 'Specific Gravity', value: '1.41 - 1.45 g/cm³' },
      { label: 'Impact Resistance', value: 'Conforming to IS 4985 Falling Weight Test' }
    ],
    standards: ['IS 4985:2000 (uPVC Pipes for Potable Water Supplies)', 'ASTM D1785'],
    certifications: ['ISI Marked Certified', 'ISO 9001:2015 Approved'],
    availability: 'In Production & Stock',
    dimensions: 'Dia 20mm - 315mm x Length 6m',
    materialGrade: 'Virgin Grade Unplasticized Polyvinyl Chloride (uPVC)'
  },
  {
    id: 'ms-angle-y-type',
    name: 'MS Angle Y Type',
    tagline: 'Heavy-Duty Y-Shaped Perimeter Security Fence Posts',
    category: 'fencing-pipes',
    categoryLabel: 'Infrastructure Pipes & Fencing',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    featured: false,
    description: 'Y-shaped mild steel structural angle fence posts designed for high-security boundary perimeters, airport boundaries, highway right-of-way fencing, and military installations. Fitted with angled arms to support multiple strands of concertina razor wire and barbed wire.',
    keyFeatures: [
      'Fabricated from prime IS 2062 Grade structural steel angles with precision welded Y-arms',
      'Available in hot-dip galvanized finish (IS 4759) or anti-corrosive red oxide primer + epoxy coat',
      'Pre-punched laser slotted holes at exact standard intervals for wire tensioning',
      'Heavy base cleats and cross-stiffeners for solid in-ground concrete grouting'
    ],
    specs: [
      { label: 'Angle Dimensions', value: '50 x 50 x 5 mm / 50 x 50 x 6 mm / 65 x 65 x 6 mm' },
      { label: 'Total Post Height', value: '2.4 m, 2.7 m, 3.0 m, 3.6 m (including in-ground embedment)' },
      { label: 'Y-Arm Extension', value: '450 mm - 600 mm angled at 45 degrees' },
      { label: 'Wire Strands Supported', value: 'Supports 6-12 strands of barbed wire + center Concertina coil' },
      { label: 'Surface Finish', value: 'Hot-Dip Galvanized (≥ 450 g/m²) or Industrial Powder Coated' },
      { label: 'Base Stiffeners', value: 'Heavy MS base plate with gusset re-inforcement' }
    ],
    standards: ['IS 2062 Structural Steel', 'IS 4759 Hot-Dip Galvanizing'],
    certifications: ['Tensile & Zinc Coating Certified'],
    availability: 'In Production & Stock',
    dimensions: 'Height 2.4m - 3.6m x 50x50x5mm MS Angle',
    materialGrade: 'Mild Steel IS 2062 Grade E250 Hot-Dip Galvanized'
  },
  {
    id: 'interlink-chain',
    name: 'Interlink Chain',
    tagline: 'Galvanized & PVC Coated Chain Link Mesh Fencing',
    category: 'fencing-pipes',
    categoryLabel: 'Infrastructure Pipes & Fencing',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    featured: true,
    description: 'Heavy-duty diamond woven interlink chain mesh fencing manufactured from high-tensile hot-dip galvanized or PVC-coated steel wire. Provides cost-effective, long-lasting boundary demarcation for expressways, railway tracks, industrial factories, and solar parks.',
    keyFeatures: [
      'Uniform woven diamond mesh geometry offering superior tensile elasticity and wind permeability',
      'Heavy zinc coating (up to 280 g/m²) or UV-resistant PVC extrusion coating in green, black, or blue',
      'Knuckled and barbed end selvedges preventing unraveling and deterring trespassers',
      'Supplied in compact tight-wound rolls for efficient transport and swift site installation'
    ],
    specs: [
      { label: 'Wire Diameters', value: '2.0 mm, 2.5 mm, 3.0 mm, 3.5 mm, 4.0 mm, 4.5 mm' },
      { label: 'Mesh Aperture Size', value: '25 x 25 mm, 50 x 50 mm, 75 x 75 mm, 100 x 100 mm' },
      { label: 'Roll Heights', value: '1.0 m, 1.2 m, 1.5 m, 1.8 m, 2.0 m, 2.4 m, 3.0 m' },
      { label: 'Roll Length', value: '15 meters / 20 meters / 30 meters per roll' },
      { label: 'Zinc Coating Standard', value: 'Heavy Galvanized Class Heavy conforming to IS 280' },
      { label: 'Tensile Strength', value: '450 - 550 N/mm² High-Tensile Steel Wire' }
    ],
    standards: ['IS 2721 (Specification for Galvanized Steel Chain Link Fence Fabric)', 'ASTM A392'],
    certifications: ['IS 2721 Quality Certified', 'Zinc Weight Tested'],
    availability: 'In Production & Stock',
    dimensions: 'Heights 1.0m to 3.0m x Length 15-30m per roll',
    materialGrade: 'Hot-Dip Galvanized Iron (GI) Wire / PVC Coated Steel Wire'
  },
  {
    id: 'road-paint',
    name: 'Road Paint',
    tagline: 'High-Reflectivity Thermoplastic Road Marking Compound',
    category: 'road-safety',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_road_marking_1791292203562.jpg',
    featured: true,
    description: '100% solids hot-melt thermoplastic road marking compound formulated with synthetic resins, premium titanium dioxide pigments, and pre-mixed intermix glass beads. Conforms to MoRTH Section 803 and BS 3262 / BS EN 1871 for high-visibility highway lane striping.',
    keyFeatures: [
      'Superior nighttime retroreflectivity with pre-mixed and drop-on glass bead formulations',
      'Ultra-fast setting time (< 3 minutes) preventing traffic disruption during application',
      'Exceptional wear and skid resistance (SRT > 45) under heavy vehicular tire abrasion',
      'UV-stable non-yellowing formulation resilient to harsh tropical heat and monsoon rains'
    ],
    specs: [
      { label: 'Available Colors', value: 'Traffic White & Golden Yellow' },
      { label: 'Resin Content', value: '≥ 18% - 20% (Synthetic Hydrocarbon / Rosin Ester)' },
      { label: 'Glass Bead Content', value: '≥ 20% - 30% Pre-mixed (BS 6088 Class A/B)' },
      { label: 'Softening Point', value: '≥ 102°C - 108°C (Ring and Ball Method)' },
      { label: 'Drying / Setting Time', value: '≤ 3 minutes at ambient 32°C' },
      { label: 'Luminance Factor', value: 'White ≥ 75% | Yellow ≥ 45%' },
      { label: 'Packaging', value: '25 kg heavy duty moisture-proof HDPE laminated bags' }
    ],
    standards: ['MoRTH Clause 803.4', 'BS 3262 Part 1', 'AASHTO M249'],
    certifications: ['CRRI Tested & Approved', 'NABL Test Certified'],
    availability: 'In Production & Stock',
    dimensions: '25 kg bags (palletized for dispatch)',
    materialGrade: '100% Solid Thermoplastic Compound with Intermix Glass Beads'
  }
];

export const SANJOG_METRICS: Metric[] = [
  { value: '1,200+ km', unit: 'Kilometers', label: 'Crash Barriers Installed', context: 'Supplied across NHAI & state highway corridors' },
  { value: '3,800+', unit: 'Units', label: 'High Masts & Lighting Towers', context: 'Illuminating major expressways, toll plazas & yards' },
  { value: '100%', unit: 'Standards', label: 'MoRTH & IS Compliant', context: 'Certified under IS 2062, IS 4759, IS 4985, AASHTO M180' },
  { value: '450+', unit: 'Contractors', label: 'Infrastructure Clients', context: 'Serving tier-1 highway, mining & construction firms' }
];

export const SANJOG_MILESTONES: Milestone[] = [
  {
    year: '2021',
    title: 'Founding & Fabrication Facility Setup',
    description: 'Sanjog established its primary roll-forming and structural fabrication works to manufacture MoRTH-compliant highway crash barriers and fencing.',
    metric: '1st Automated W-Beam Roll-Forming Mill Commissioned'
  },
  {
    year: '2023',
    title: 'High Mast Lighting & Mining Drilling Launch',
    description: 'Expanded manufacturing into continuously tapered octagonal high mast lighting poles and induction-treated mining drill rods.',
    metric: 'Supplied 150+ km of W-Beam barriers in Q3-Q4'
  },
  {
    year: '2024',
    title: 'Road Safety & Marking Equipment Division',
    description: 'Introduced thermoplastic road marking machinery, solar road studs, and bitumen heating systems for national highway projects.',
    metric: 'Awarded major EPC supply contracts across 6 states'
  },
  {
    year: '2025',
    title: 'Concrete Machinery & Extrusion Plant Expansion',
    description: 'Added concrete mixers, internal vibrators, and precision uPVC pipe extrusion lines to provide full-spectrum road and infrastructure supplies.',
    metric: 'Over 1,200 km crash barriers delivered'
  },
  {
    year: '2026',
    title: 'Modernized Production & Pan-India Supply Grid',
    description: 'Operating with full hot-dip galvanizing baths, automated CNC punching, and daily dispatch to highway and mining sites nationwide.',
    metric: '100% NABL lab-tested quality compliance'
  }
];

export const SANJOG_CERTIFICATIONS: Certification[] = [
  {
    code: 'ISO 9001:2015',
    name: 'Quality Management Systems',
    authority: 'Accredited Certification Body',
    scope: 'Manufacture and supply of metal crash barriers, high mast lighting towers, road safety products, drill tools, and construction equipment.',
    status: 'Active & Verified'
  },
  {
    code: 'MoRTH Section 811 & 803',
    name: 'Ministry of Road Transport & Highways Compliance',
    authority: 'Government Testing & NABL Accredited Labs',
    scope: 'W-Beam / Thrie Beam crash barriers, thermoplastic road paint, and road safety delineation products.',
    status: 'Active & Verified'
  },
  {
    code: 'IS 2062 & IS 4759',
    name: 'Structural Steel & Hot-Dip Galvanizing Standards',
    authority: 'Bureau of Indian Standards Compliant',
    scope: 'Minimum 550 g/m² zinc coating, structural steel grade E250/E350 yield & tensile verification.',
    status: 'Active & Verified'
  },
  {
    code: 'IS 4985 & IS 2721',
    name: 'uPVC Pipes & Chain Link Mesh Standards',
    authority: 'National Quality Standards',
    scope: 'Pressure pipe hydrostatic pressure testing, GI wire zinc weight and tensile test verification.',
    status: 'Active & Verified'
  }
];

export const SANJOG_LEADERSHIP: LeadershipMember[] = [
  {
    name: 'Suman Sen',
    role: 'Managing Director & Founder',
    background: 'Over 18 years in highway infrastructure manufacturing, structural steel fabrication, and government EPC contract fulfillment.',
    focus: 'Corporate growth, plant operations, large-scale highway tenders'
  },
  {
    name: 'Rajesh Sharma',
    role: 'Head of Quality Assurance & Testing',
    background: 'Former Senior Metallurgist with extensive expertise in hot-dip galvanizing, mechanical stress testing, and MoRTH compliance.',
    focus: 'Raw material grading, galvanizing thickness audits, NABL certifications'
  },
  {
    name: 'Amitav Ghosh',
    role: 'Chief of Production & Engineering',
    background: 'Mechanical engineer specialized in high-speed roll forming lines, polygonal mast bending brakes, and mining tool heat treatment.',
    focus: 'W-Beam roll forming, High mast tower fabrication, Machining lines'
  },
  {
    name: 'Pooja Verma',
    role: 'Director of Supply Chain & Client Relations',
    background: '12+ years managing nationwide logistics, turnkey site deliveries, and procurement partnerships with leading construction concessionaires.',
    focus: 'Pan-India logistics, on-time highway project dispatches, customer care'
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'barriers' | 'lighting' | 'mining' | 'concrete' | 'fencing' | 'factory';
  categoryLabel: string;
  image: string;
  location: string;
  description: string;
}

export const SANJOG_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Hot-Dip Galvanized W-Beam Barrier Installation',
    category: 'barriers',
    categoryLabel: 'Highway Crash Barriers',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    location: 'National Highway Expressway Stretch, NH-16',
    description: 'Hot-dip galvanized W-Beam crash barrier panels and 150x75mm C-posts installed along the highway curve with retroreflective delineators.'
  },
  {
    id: 'gal-2',
    title: 'High Mast Lighting Octagonal Tower at Toll Junction',
    category: 'lighting',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg',
    location: 'Expressway Toll Plaza & Interchange',
    description: '30-meter octagonal continuously tapered high mast tower fitted with 12x 400W LED floodlights and motorized raising/lowering winch system.'
  },
  {
    id: 'gal-3',
    title: 'Heavy-Duty Mining & TCT Drill Rods',
    category: 'mining',
    categoryLabel: 'Mining & Rock Drilling',
    image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg',
    location: 'Granite Quarrying & Blast Hole Bench',
    description: 'Carburized alloy hollow drill rods and YG11C tungsten carbide tipped integral chisel rods ready for deep bench drilling.'
  },
  {
    id: 'gal-4',
    title: 'Precision Road Marking & Thermoplastic Paint Application',
    category: 'lighting',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_road_marking_1791292203562.jpg',
    location: 'State Highway Widening Project, Corridor-4',
    description: 'Sanjog road marking screed machine applying 150mm reflective thermoplastic lane edge line with synchronized drop-on glass beads.'
  },
  {
    id: 'gal-5',
    title: 'Concrete Mixer & Immersion Vibrator Works',
    category: 'concrete',
    categoryLabel: 'Concrete Machinery',
    image: '/src/assets/images/sanjog_concrete_machinery_1791292215407.jpg',
    location: 'Flyover Pier Concreting Project Site',
    description: 'Heavy 10/7 CFT hydraulic tilting drum concrete mixer with 5.0 HP petrol engine vibrator and 50mm flexible needle pokers.'
  },
  {
    id: 'gal-6',
    title: 'Fabrication Plant Yard & Finished Stock Dispatch',
    category: 'factory',
    categoryLabel: 'Factory & Operations',
    image: '/src/assets/images/sanjog_gallery_factory_1791292902900.jpg',
    location: 'Sanjog Manufacturing Works, Industrial Growth Centre',
    description: 'Bundled hot-dip galvanized W-beam crash barriers and Y-type angle posts stacked for nationwide project dispatch.'
  },
  {
    id: 'gal-7',
    title: 'Highway Illumination & Solar Road Studs at Dusk',
    category: 'lighting',
    categoryLabel: 'Lighting & Road Safety',
    image: '/src/assets/images/sanjog_gallery_tollplaza_1791292922209.jpg',
    location: 'Six-Lane Greenfield Expressway Corridor',
    description: 'Active solar LED road studs (cat eyes) blinking along lane dividers paired with high mast towers providing glare-free illumination.'
  },
  {
    id: 'gal-8',
    title: 'Perimeter Chainlink Mesh & uPVC Infrastructure Drainage',
    category: 'fencing',
    categoryLabel: 'Pipes & Fencing',
    image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg',
    location: 'Industrial Logistic Park Perimeter',
    description: 'Heavy galvanized chain link diamond mesh fence mounted on MS Y-angle posts with underground uPVC drainage pipe culverts.'
  }
];

export const COMPANY_DOSSIER = {
  companyName: 'SANJOG',
  tradingName: 'Sanjog',
  registrationNo: 'REG-SANJOG-2021',
  tagline: 'Building Stronger Roads, Powering Mining & Infrastructure',
  foundingYear: '2021',
  headquarters: 'Sector V, Salt Lake, Kolkata, West Bengal - 700091',
  regionalOffices: ['Kolkata (Corporate Sales Office)', 'Bhubaneswar (Mining & Infrastructure Hub)', 'Ranchi (Industrial Supply Depot)'],
  primaryDomains: [
    'Highway Metal Crash Barriers (W-Beam & Thrie Beam)',
    'High Mast Lighting Octagonal Towers (12m - 35m)',
    'Mining & Quarrying Drill Rods & Rock Drill Machines',
    'Road Safety Products (Solar Studs, Road Marking, Bitumen Tanks, Road Paint)',
    'Concrete Machinery (Mixers, Vibrators & Needles)',
    'Infrastructure Fencing (uPVC Pipes, MS Angle Y-Type, Interlink Chain)'
  ],
  supportEmail: 'contact@sanjog.com',
  inquiryEmail: 'sales@sanjog.com',
  phone: '+91 (033) 2450-8900 / +91 98300-12345',
  summary: 'Sanjog is an established manufacturing and supply company delivering heavy-duty highway safety infrastructure, mining drilling equipment, concrete construction machinery, and perimeter fencing materials. Certified to MoRTH, IS, and AASHTO standards, Sanjog equips highway concessionaires, mining operators, and civil contractors with precision-engineered products built for longevity and extreme field performance.'
};


