const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema ({
    name: {
        type: String,
        unique: true,
    },
    img: {
        type: String,
    },
    level: {
        type: Number,
    },
    setName: {
        type: String,
    },
    slot: {
        type: String,
        required: true
    },
    itemStats: {
        initiative: {
            type: String
        },
        vitality: {
            type: String
        },
        pods: {
            type: String
        },
        strength: {
            type: String
        },
        intellegence: {
            type: String
        },
        agility: {
            type: String
        },
        chance: {
            type: String
        },
        criticalResistance: {
            type: String
        },
        pushbackResistance: {
            type: String
        },
        perPower: {
            type: String
        },
        perPowerTrap: {
            type: String
        },
        fixedNeutralResistance: {
            type: String
        },
        fixedEarthResistance: {
            type: String
        },
        fixedFireResistance: {
            type: String
        },
        fixedAirResistance: {
            type: String
        },
        fixedWaterResistance: {
            type: String
        },
        wisdom: {
            type: String
        },
        prospecting: {
            type: String
        },
        lock: {
            type: String
        },
        dodge: {
            type: String
        },
        fixedDamage: {
            type: String
        },
        neuDamage: {
            type: String
        },
        strDamage: {
            type: String
        },
        intDamage: {
            type: String
        },
        agiDamage: {
            type: String
        },
        chaDamage: {
            type: String
        },
        critDamage: {
            type: String
        },
        pushbackDamage: {
            type: String
        },
        perNeutralResistance: {
            type: String
        },
        perEarthResistance: {
            type: String
        },
        perFireResistance: {
            type: String
        },
        perAirResistance: {
            type: String
        },
        perWaterResistance: {
            type: String
        },
        mpRed: {
            type: String
        },
        apRed: {
            type: String
        },
        mpRes: {
            type: String
        },
        apRes: {
            type: String
        },
        heal: {
            type: String
        },
        critPer: {
            type: String
        },
        reflect: {
            type: String
        },
        perSpellDamage: {
            type: String
        },
        perRangedDamage: {
            type: String
        },
        perRangedResistance: {
            type: String
        },
        perWepDamage: {
            type: String
        },
        perMeleeDamage: {
            type: String
        },
        perMeleeResistance: {
            type: String
        },
        summon: {
            type: String
        },
        range: {
            type: String
        },
        mp: {
            type: String
        },
        ap: {
            type: String
        },

    },

    itemCondition: {
        condition: {
            type: String
        }
    }
})

module.exports = mongoose.model("Item", itemSchema)




// const itemSchema = new Schema ({
//     name: {
//         type: String,
//         unique: true,
//     },
//     setName: {
//         type: String,
//     },
//     slot: {
//         type: String,
//         required: true
//     },
//     minInitiative: {
//         type: Number
//     },
//     maxInitiative: {
//         type: Number
//     },
//     minVitality: {
//         type: Number
//     },
//     maxVitality: {
//         type: Number
//     },
//     minPods: {
//         type: Number
//     },
//     maxPods: {
//         type: Number
//     },
//     minStrength: {
//         type: Number
//     },
//     maxStrength: {
//         type: Number
//     },
//     minIntellegence: {
//         type: Number
//     },
//     maxIntellegence: {
//         type: Number
//     },
//     maxAgility: {
//         type: Number
//     },
//     minAgility: {
//         type: Number
//     },
//     maxChance: {
//         type: Number
//     },
//     minChance: {
//         type: Number
//     },
//     maxCriticalResistance: {
//         type: Number
//     },
//     minCriticalResistance: {
//         type: Number
//     },
//     maxPushbackResistance: {
//         type: Number
//     },
//     minPushbackResistance: {
//         type: Number
//     },
//     maxPerPower: {
//         type: Number
//     },
//     minPerPower: {
//         type: Number
//     },
//     maxPerPowerTrap: {
//         type: Number
//     },
//     minPerPowerTrap: {
//         type: Number
//     },
//     maxFixedNeutralResistance: {
//         type: Number
//     },
//     minFixedNeutralResistance: {
//         type: Number
//     },
//     maxFixedEarthResistance: {
//         type: Number
//     },
//     minFixedEarthResistance: {
//         type: Number
//     },
//     maxFixedFireResistance: {
//         type: Number
//     },
//     minFixedFireResistance: {
//         type: Number
//     },
//     maxFixedAirResistance: {
//         type: Number
//     },
//     minFixedAirResistance: {
//         type: Number
//     },
//     maxFixedWaterResistance: {
//         type: Number
//     },
//     minFixedWaterResistance: {
//         type: Number
//     },
//     maxWisdom: {
//         type: Number
//     },
//     minWisdom: {
//         type: Number
//     },
//     maxProspecting: {
//         type: Number
//     },
//     minProspecting: {
//         type: Number
//     },
//     maxLock: {
//         type: Number
//     },
//     minLock: {
//         type: Number
//     },
//     maxDodge: {
//         type: Number
//     },
//     minDodge: {
//         type: Number
//     },
//     maxFixedDamage: {
//         type: Number
//     },
//     minFixedDamage: {
//         type: Number
//     },
//     maxNeuDamage: {
//         type: Number
//     },
//     minNeuDamage: {
//         type: Number
//     },
//     maxStrDamage: {
//         type: Number
//     },
//     minStrDamage: {
//         type: Number
//     },
//     maxIntDamage: {
//         type: Number
//     },
//     minIntDamage: {
//         type: Number
//     },
//     maxAgiDamage: {
//         type: Number
//     },
//     minAgiDamage: {
//         type: Number
//     },
//     maxChaDamage: {
//         type: Number
//     },
//     minChaDamage: {
//         type: Number
//     },
//     maxCritDamage: {
//         type: Number
//     },
//     minCritDamage: {
//         type: Number
//     },
//     maxPushbackDamage: {
//         type: Number
//     },
//     minPushbackDamage: {
//         type: Number
//     },
//     maxPerNeutralResistance: {
//         type: Number
//     },
//     minPerNeutralResistance: {
//         type: Number
//     },
//     maxPerEarthResistance: {
//         type: Number
//     },
//     minPerEarthResistance: {
//         type: Number
//     },
//     maxPerFireResistance: {
//         type: Number
//     },
//     minPerFireResistance: {
//         type: Number
//     },
//     maxPerAirResistance: {
//         type: Number
//     },
//     minPerAirResistance: {
//         type: Number
//     },
//     maxPerWaterResistance: {
//         type: Number
//     },
//     minPerWaterResistance: {
//         type: Number
//     },
//     maxMpRed: {
//         type: Number
//     },
//     minMpRed: {
//         type: Number
//     },
//     maxApRed: {
//         type: Number
//     },
//     minApRed: {
//         type: Number
//     },
//     maxMpRes: {
//         type: Number
//     },
//     minMpRes: {
//         type: Number
//     },
//     maxApRes: {
//         type: Number
//     },
//     minApRes: {
//         type: Number
//     },
//     maxHeal: {
//         type: Number
//     },
//     minHeal: {
//         type: Number
//     },
//     maxCritPer: {
//         type: Number
//     },
//     minCritPer: {
//         type: Number
//     },
//     maxReflect: {
//         type: Number
//     },
//     minReflect: {
//         type: Number
//     },
//     maxPerSpellDamage: {
//         type: Number
//     },
//     minPerSpellDamage: {
//         type: Number
//     },
//     maxPerRangedDamage: {
//         type: Number
//     },
//     minPerRangedDamage: {
//         type: Number
//     },
//     maxPerRangedResistance: {
//         type: Number
//     },
//     minPerRangedResistance: {
//         type: Number
//     },
//     maxPerWepDamage: {
//         type: Number
//     },
//     minPerWepDamage: {
//         type: Number
//     },
//     maxPerMeleeDamage: {
//         type: Number
//     },
//     minPerMeleeDamage: {
//         type: Number
//     },
//     maxPerMeleeResistance: {
//         type: Number
//     },
//     minPerMeleeResistance: {
//         type: Number
//     },
//     maxSummon: {
//         type: Number
//     },
//     minSummon: {
//         type: Number
//     },
//     maxRange: {
//         type: Number
//     },
//     minRange: {
//         type: Number
//     },
//     maxMp: {
//         type: Number
//     },
//     minMp: {
//         type: Number
//     },
//     maxAp: {
//         type: Number
//     },
//     minAp: {
//         type: Number
//     },
// })