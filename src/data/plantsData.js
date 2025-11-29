// src/data/plantsData.js

export const PLANTS_DATA = {
  bael: {
    id: 'bael',
    name: 'Bael',
    scientificName: 'Aegle marmelos',
    commonNames: ['Wood Apple', 'Stone Apple', 'Bengal Quince', 'Bilwa', 'Vilva'],
    family: 'Rutaceae',
    description:
      'Bael is a sacred tree in Hindu and Buddhist traditions, native to the Indian subcontinent and Southeast Asia. The tree is known for its hard-shelled fruit and aromatic leaves that are commonly used in religious ceremonies.',
    detailedDescription: `The Bael tree (Aegle marmelos) is a species of tree native to the Indian subcontinent and Southeast Asia. It is present in India, Pakistan, Bangladesh, Sri Lanka, Myanmar, and Thailand as a naturalized species. The tree is considered sacred by Hindus and Buddhists.

The tree typically grows to about 13 meters (43 feet) in height with a few upward branches and a spreading crown. The leaves are trifoliate, alternate, with oval leaflets that have a strong aroma when crushed. The plant produces fragrant white flowers followed by hard-shelled fruit.

Bael leaves contain several bioactive compounds including alkaloids, tannins, and essential oils that give them their characteristic fragrance and medicinal properties.`,
    leaves: {
      characteristics: [
        'Trifoliate (three leaflets per leaf)',
        'Alternate arrangement on branches',
        'Oval to elliptical shape with pointed tips',
        'Smooth, glossy upper surface',
        'Distinct aromatic scent when crushed',
        'Light to medium green color',
        'Serrated or slightly toothed margins',
        'Length: 4-10 cm, Width: 2-5 cm'
      ],
      identification: 'Bael leaves are easily identified by their trifoliate structure, aromatic scent, and glossy appearance. They emit a strong citrus-like fragrance when crushed.'
    },
    uses: {
      medicinal: [
        'Treatment of digestive disorders',
        'Anti-inflammatory properties',
        'Antimicrobial and antifungal uses',
        'Blood sugar regulation',
        'Respiratory ailment treatment',
        'Skin condition remedies',
        'Fever reduction',
        'Wound healing'
      ],
      religious: [
        'Sacred offerings in Hindu temples',
        'Used in worship of Lord Shiva',
        'Buddhist religious ceremonies',
        'Traditional prayer rituals',
        'Spiritual purification practices'
      ],
      culinary: [
        'Herbal tea preparation',
        'Traditional medicine preparations',
        'Aromatic seasoning',
        'Natural food preservative'
      ],
      other: [
        'Natural insect repellent',
        'Cosmetic applications',
        'Traditional perfumery',
        'Ornamental purposes'
      ]
    },
    habitat: {
      nativeRegions: ['Indian subcontinent', 'Southeast Asia', 'Myanmar', 'Thailand'],
      climate: 'Tropical and subtropical regions',
      soilType: 'Well-drained, sandy loam to clay soils',
      sunlight: 'Full sun to partial shade',
      waterRequirements: 'Moderate, drought-tolerant once established'
    },
    cultivation: {
      propagation: 'Seeds, grafting, or stem cuttings',
      plantingTime: 'Monsoon season or early summer',
      spacing: '6-8 meters apart',
      careInstructions: [
        'Regular watering during establishment',
        'Pruning for shape and health',
        'Protection from strong winds',
        'Minimal fertilizer requirements'
      ]
    },
    chemicalComposition: [
      'Marmelosin (alkaloid)',
      'Skimmianine',
      'Essential oils (limonene, citral)',
      'Tannins',
      'Coumarins',
      'Flavonoids'
    ],
    warnings: [
      'Generally safe when used appropriately',
      'Consult healthcare provider before medicinal use',
      'May interact with certain medications',
      'Use in moderation during pregnancy'
    ],
    culturalSignificance: `In Hindu mythology, the Bael tree is sacred to Lord Shiva, and its trifoliate leaves represent the three eyes of Shiva. Buddhist traditions also hold the tree in high regard, associating it with spiritual growth and enlightenment. The tree is often planted near temples and used in various religious ceremonies throughout South and Southeast Asia.`,
    conservationStatus: 'Least Concern',
    image: require('../assets/bael.jpg'),
    modelAccuracy: 85
  },

  betel: {
    id: 'betel',
    name: 'Betel',
    scientificName: 'Piper betle',
    commonNames: ['Betel Leaf', 'Paan', 'Nagavalli', 'Tambula'],
    family: 'Piperaceae',
    description: 'Betel is an evergreen and perennial creeper that grows throughout Southeast Asia and is extensively cultivated for its aromatic leaves, which are commonly chewed as a mild stimulant and have significant cultural importance.',
    detailedDescription: `Betel (Piper betle) is a vine belonging to the Piperaceae family, which includes black pepper and kava. Native to Southeast Asia, it is an evergreen perennial creeper that grows extensively throughout tropical and subtropical regions.

The plant is a climbing vine that can grow up to 10-15 meters in length under favorable conditions. It requires support to climb and is typically grown on poles, trees, or trellises. The leaves are the most valued part of the plant and have been used for thousands of years in various cultural practices.

Betel leaves contain various alkaloids, phenols, and essential oils that contribute to their distinctive taste, aroma, and stimulating properties. The leaves are heart-shaped with prominent veins and have a glossy, dark green appearance.`,
    leaves: {
      characteristics: [
        'Heart-shaped with pointed tip',
        'Alternate leaf arrangement',
        'Smooth, glossy surface',
        'Dark green color with prominent veins',
        'Aromatic when crushed',
        'Soft, tender texture',
        'Length: 7-20 cm, Width: 5-15 cm',
        'Entire or slightly wavy margins'
      ],
      identification: 'Betel leaves are characterized by their distinctive heart shape, glossy dark green color, and prominent venation. They have a unique aroma and slightly peppery taste.'
    },
    uses: {
      medicinal: [
        'Digestive aid and appetite stimulant',
        'Antimicrobial and antifungal properties',
        'Wound healing and antiseptic uses',
        'Oral health maintenance',
        'Respiratory congestion relief',
        'Anti-inflammatory applications',
        'Blood circulation improvement',
        'Traditional pain relief'
      ],
      cultural: [
        'Traditional betel quid chewing',
        'Wedding ceremonies and rituals',
        'Religious offerings and worship',
        'Social and hospitality customs',
        'Traditional medicine practices',
        'Cultural identity symbol'
      ],
      culinary: [
        'Betel leaf wraps and preparations',
        'Traditional sweets and desserts',
        'Flavoring agent',
        'Natural mouth freshener',
        'Ceremonial food preparations'
      ],
      other: [
        'Natural preservative',
        'Cosmetic applications',
        'Traditional perfumery',
        'Decorative purposes',
        'Insect repellent properties'
      ]
    },
    habitat: {
      nativeRegions: ['Southeast Asia', 'India', 'Bangladesh', 'Myanmar', 'Malaysia', 'Indonesia'],
      climate: 'Tropical and subtropical humid climates',
      soilType: 'Rich, well-drained, organic matter-rich soil',
      sunlight: 'Partial shade to filtered sunlight',
      waterRequirements: 'High moisture, consistent watering'
    },
    cultivation: {
      propagation: 'Stem cuttings with nodes',
      plantingTime: 'Beginning of rainy season',
      spacing: '30-45 cm between plants',
      careInstructions: [
        'Provide climbing support structures',
        'Maintain high humidity levels',
        'Regular watering without waterlogging',
        'Protection from direct sunlight',
        'Organic fertilizer application',
        'Pruning for better growth'
      ]
    },
    chemicalComposition: [
      'Eugenol',
      'Chavicol',
      'Caryophyllene',
      'Safrole',
      'Hydroxychavicol',
      'Essential oils',
      'Phenolic compounds',
      'Alkaloids'
    ],
    warnings: [
      'Excessive consumption may cause health issues',
      'May interact with certain medications',
      'Not recommended during pregnancy',
      'Can cause mouth staining with regular use',
      'Potential allergic reactions in sensitive individuals'
    ],
    culturalSignificance: `Betel leaves hold immense cultural significance across South and Southeast Asia. They are central to many traditional practices, including the preparation of 'paan' (betel quid), which is consumed as a mild stimulant and digestive aid. In many cultures, betel leaves are offered to guests as a sign of respect and hospitality. They play important roles in wedding ceremonies, religious rituals, and social customs, symbolizing prosperity, fertility, and good fortune.`,
    conservationStatus: 'Not Evaluated (widely cultivated)',
    image: require('../assets/betel.jpg'),
    modelAccuracy: 90
  },

  // key uses underscore; keep id consistent with other code
  crown_flower: {
    id: 'crown_flower',
    name: 'Crown Flower',
    scientificName: 'Calotropis gigantea',
    commonNames: ['Giant Milkweed', 'Madar', 'Akanda', 'Swallow-wort', 'Crown Flower'],
    family: 'Apocynaceae',
    description: 'Crown Flower is a large shrub native to tropical and subtropical Asia and Africa. It is known for its distinctive crown-like flowers and large, oval leaves. Despite being considered a weed in some areas, it has significant medicinal and cultural importance.',
    detailedDescription: `Crown Flower (Calotropis gigantea) is a species of flowering plant in the dogbane family Apocynaceae. It is a large shrub growing to 4 meters tall, native to tropical and subtropical Asia and Africa, but naturalized in tropical areas worldwide.

The plant is characterized by its distinctive appearance, featuring large, thick, greyish-green leaves and clusters of waxy, crown-shaped flowers that can be white or purple. All parts of the plant contain a white, milky latex that is toxic but has been used traditionally in various medicinal applications.

The plant is drought-resistant and can grow in poor soils, making it a common sight in arid and semi-arid regions. Despite being considered an invasive weed in some areas, Crown Flower has considerable ecological and cultural value.`,
    leaves: {
      characteristics: [
        'Large, oval to oblong shape',
        'Opposite leaf arrangement',
        'Thick, fleshy texture',
        'Greyish-green to blue-green color',
        'Smooth, waxy surface',
        'Prominent white midrib and veins',
        'Length: 10-25 cm, Width: 5-15 cm',
        'Entire margins with slight undulation'
      ],
      identification: 'Crown Flower leaves are easily identified by their large size, thick waxy texture, greyish-green color, and prominent white venation. The leaves are opposite and have a distinctive appearance.'
    },
    uses: {
      medicinal: [
        'Traditional treatment for skin conditions',
        'Anti-inflammatory applications',
        'Wound healing properties',
        'Respiratory ailment treatment',
        'Fever reduction',
        'Pain relief applications',
        'Antiparasitic uses',
        'Digestive disorder treatment'
      ],
      cultural: [
        'Religious ceremonies and offerings',
        'Traditional decorations',
        'Cultural rituals and festivals',
        'Spiritual purification practices',
        'Traditional medicine systems'
      ],
      ecological: [
        'Habitat for various insects',
        'Soil stabilization in arid areas',
        'Pioneer species in disturbed areas',
        'Drought-resistant landscaping',
        'Wildlife food source'
      ],
      other: [
        'Fiber production from stem',
        'Natural latex extraction',
        'Ornamental gardening',
        'Traditional crafts',
        'Research applications'
      ]
    },
    habitat: {
      nativeRegions: ['Tropical Asia', 'Africa', 'Indian subcontinent'],
      climate: 'Tropical and subtropical dry climates',
      soilType: 'Well-drained, sandy or rocky soils',
      sunlight: 'Full sun exposure',
      waterRequirements: 'Low to moderate, highly drought-tolerant'
    },
    cultivation: {
      propagation: 'Seeds or stem cuttings',
      plantingTime: 'Any time in tropical climates',
      spacing: '2-3 meters apart',
      careInstructions: [
        'Minimal water requirements once established',
        'Thrives in poor, sandy soils',
        'Requires full sunlight',
        'Pruning to control size and shape',
        'Protection from frost in cooler climates'
      ]
    },
    chemicalComposition: [
      'Calotropin (cardiac glycoside)',
      'Calactin',
      'Uscharin',
      'Latex proteins',
      'Cardiac glycosides',
      'Alkaloids',
      'Steroids',
      'Flavonoids'
    ],
    warnings: [
      'TOXIC PLANT - All parts contain poisonous latex',
      'Can cause severe skin and eye irritation',
      'Ingestion can be fatal',
      'Keep away from children and pets',
      'Use protective equipment when handling',
      'Seek immediate medical attention if ingested',
      'May cause allergic reactions'
    ],
    culturalSignificance: `Crown Flower holds religious significance in Hindu and Buddhist traditions, where it is often used in temple decorations and religious ceremonies. In Thai culture, the flowers are used to make traditional leis and garlands. Despite its toxicity, various parts of the plant have been used in traditional medicine systems across Asia and Africa for centuries, always with great caution due to its poisonous nature.`,
    conservationStatus: 'Least Concern (considered invasive in some regions)',
    image: require('../assets/crown_flower.jpg'),
    modelAccuracy: 90
  }
};

// categories (use same keys as PLANTS_DATA)
export const PLANT_CATEGORIES = {
  medicinal: ['bael', 'betel', 'crown_flower'],
  cultural: ['bael', 'betel', 'crown_flower'],
  edible: ['betel'],
  toxic: ['crown_flower'],
  sacred: ['bael', 'crown_flower'],
  aromatic: ['bael', 'betel']
};

// helper: tolerant id lookup (spaces/underscores/case)
export const getPlantById = (id) => {
  if (!id) return null;
  // normalize input: lower-case and convert spaces to underscore
  const key = String(id).trim().toLowerCase().replace(/\s+/g, '_');
  return PLANTS_DATA[key] || null;
};

export const getAllPlants = () => {
  return Object.values(PLANTS_DATA);
};

export const getPlantsByCategory = (category) => {
  const plantIds = PLANT_CATEGORIES[category] || [];
  return plantIds.map(id => PLANTS_DATA[id]).filter(Boolean);
};

export const searchPlants = (searchTerm) => {
  if (!searchTerm) return getAllPlants();
  const term = searchTerm.toLowerCase();
  return Object.values(PLANTS_DATA).filter(plant =>
    (plant.name && plant.name.toLowerCase().includes(term)) ||
    ((plant.scientificName || plant.scientific) && (plant.scientificName || plant.scientific).toLowerCase().includes(term)) ||
    ((plant.commonNames || []).some(name => name.toLowerCase().includes(term))) ||
    ((plant.description || '').toLowerCase().includes(term))
  );
};

export default PLANTS_DATA;
