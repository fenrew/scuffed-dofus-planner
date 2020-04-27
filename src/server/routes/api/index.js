const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
const { userMiddleware, checkLoggedIn } = require('../../utils/middleware')

const puppeteer = require('puppeteer');
const Item = require("../../models/Item")

router.use(userMiddleware)

router.get('/', (req, res) => {
    res.send({ hello: true })
})

router.get('/protected', checkLoggedIn, (req, res) => {
    console.log('USER', req.user)
    res.send({ success: true })
})

router.get("/add-equipment-database", (req, res) =>{
    let equipmentPage = 1
    let scrapeWebpageLinks = async (equipmentPage) => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
    
        await page.goto('https://www.dofus.com/en/mmorpg/encyclopedia/equipment?page='+equipmentPage);
        //await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
        await page.waitFor(1000);
    
        const result = await page.evaluate(() => {
            let data = []; // Create an empty array that will store our data
            for (let i = 0; i < 50; i++){
                let elements = document.querySelectorAll('body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div.ak-container.ak-panel.main-object-list.ak-nocontentpadding > div.ak-panel-content > div.ak-responsivetable-wrapper > table > tbody > tr:nth-child('+i+') > td:nth-child(2) > span > a'); // Select all Products
                if(elements){
                    for (var element of elements){ // Loop through each proudct
                        let itemLink = element.href; // Select the title
                        if(!itemLink){
                            data.push({cancel: "cancel"})
                            i = 100
                            break
                        } else {
                            data.push({itemLink}); // Push an object with the data onto our array
                        }
                    }
                }
            }    
            return data; // Return our data array
        });
    
        browser.close();
        return result; // Return the data
    };

    const scrapeItemStats = async(itemLink) => {
        if(!itemLink) return
        
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
    
        await page.goto(itemLink);

        await page.waitFor(1000);

        const result = await page.evaluate(() => {
            let toRegex = /\sto\s/
            let statElementRegex = /(\d+|%)\s(.*)$/i
            let statValueRegex = /(\S+)/
            let levelRegex = /(\d+)/
            let findPersentRegex = /%/

            let data = {}; // Create an empty array that will store our data

            let itemNameElement = document.querySelectorAll("body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div > div.ak-title-container.ak-backlink > h1")
            let itemSlotElement = document.querySelectorAll("body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div > div:nth-child(3) > div > div > div.col-sm-9 > div > div.ak-encyclo-block-info > div > div.ak-encyclo-detail-type.col-xs-6 > span")
            let itemLevelElement = document.querySelectorAll("body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div > div:nth-child(3) > div > div > div.col-sm-9 > div > div.ak-encyclo-block-info > div > div.ak-encyclo-detail-level.col-xs-6.text-right")
            let itemImageElement =  document.querySelectorAll("body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div > div:nth-child(3) > div > div > div.col-sm-3 > div > img")      
            let itemConditionElement = document.querySelectorAll("body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div > div:nth-child(3) > div > div > div.col-sm-9 > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div.ak-panel-content > div > div > div > div > div > div")

            // for the item Name
            for (var [y, element] of itemNameElement.entries()){ // Loop through each proudct
                let itemNameText = element.innerText; // Select the stat
                data.name = itemNameText; // Push an object with the data onto our array
            }

            // for the item type (hat/cloak/etc)
            for (var [y, element] of itemSlotElement.entries()){ // Loop through each proudct
                let itemSlotText = element.innerText; // Select the stat
                data.slot = itemSlotText; // Push an object with the data onto our array
            }

            // for the item level
            for (var [y, element] of itemLevelElement.entries()){ // Loop through each proudct
                let itemLevelText = element.innerText; // Select the stat
                itemLevelText = itemLevelText.match(levelRegex)[1]
                itemLevelText = parseInt(itemLevelText)
                data.level = itemLevelText; // Push an object with the data onto our array
            }

            // for the item image
            for (var [y, element] of itemImageElement.entries()){ // Loop through each proudct
                let itemImageText = element.getAttribute("src"); // Select the stat
                data.img = itemImageText; // Push an object with the data onto our array
            }

            // for the item condition
            for (var [y, element] of itemConditionElement.entries()){ // Loop through each proudct
                let imageConditionText = element.innerText; // Select the stat
                data.condition = imageConditionText; // Push an object with the data onto our array
            }

            // for the Stats
            for(let i = 1; i < 50; i++){
                let statElement = document.querySelectorAll("body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div > main > div.ak-container.ak-main-center > div > div:nth-child(3) > div > div > div.col-sm-9 > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div.ak-panel-content > div > div:nth-child("+i+") > div > div > div.ak-content > div")
                if(!statElement) break
                for (var [y, element] of statElement.entries()){ // Loop through each proudct
                    let stat = element.innerText; // Select the stat
                    stat = stat.replace(toRegex, "-")
                    let statElement = stat.match(statElementRegex)[2]
                    let statValue = stat.match(statValueRegex)[1]
                    if(stat.match(findPersentRegex)){
                        statElement = "Per " + statElement
                        statValue = statValue.slice(0, -1)
                    }
                    data[statElement] = statValue; // Push an object with the data onto our array
                }
            }

            return data
        });
    
        browser.close();
        return result; // Return the data
    }

    scrapeWebpageLinks(equipmentPage).then((result) => {
        console.log("result2", result)
        let allItems = scrapeItems(result)
    })

    function scrapeItems(result, iteration = 0, allItems = []){
        scrapeItemStats(result[iteration].itemLink).then((stats) =>{
            console.log("stats", stats)

            //let item = changeStatNamesAndValue(stats)
            let item = stats

            allItems.push(item)

            const {name} = item
            console.log("NAMME", {name}, item.name)

            Item.findOne({name}).then(itemResult => {
                console.log("RESEULTTT:", itemResult)
                if(!itemResult){
                    const newItem = Item({
                        name: item.name,
                        img: item.img,
                        level: item.level,
                        slot: item.slot,
                        itemStats: {
                            initiative: item.Initiative,
                            vitality: item.Vitality,
                            pods: item.Pods,
                            strength: item.Strength,
                            intellegence: item.Intellegence,
                            agility: item.Agility,
                            chance: item.Chance,
                            criticalResistance: item["Critical Resistance"],
                            pushbackResistance: item["Pushback Resistance"],
                            perPower: item.Power,
                            perPowerTrap: item["Power (traps)"],
                            fixedNeutralResistance: item["Neutral Resistance"],
                            fixedEarthResistance: item["Earth Resistance"],
                            fixedFireResistance: item["Fire Resistance"],
                            fixedAirResistance: item["Air Resistance"],
                            fixedWaterResistance: item["Water Resistance"],
                            wisdom: item.Wisdom,
                            prospecting: item.Prospecting,
                            lock: item.Lock,
                            dodge: item.Dodge,
                            fixedDamage: item.Damage,
                            neuDamage: item["Neutral Damage"],
                            strDamage: item["Earth Damage"],
                            intDamage: item["Fire Damage"],
                            agiDamage: item["Air Damage"],
                            chaDamage: item["Water Damage"],
                            critDamage: item["Critical Damage"],
                            pushbackDamage: item["Pushback Damage"],
                            perNeutralResistance: item["Per Neutral Resistance"],
                            perEarthResistance: item["Per Earth Resistance"],
                            perFireResistance: item["Per Fire Resistance"],
                            perAirResistance: item["Per Air Resistance"],
                            perWaterResistance: item["Per Water Resistance"],
                            mpRed: item["MP Reduction"],
                            apRed: item["AP Reduction"],
                            mpRes: item["MP Parry"],
                            apRes: item["AP Parry"],
                            heal: item["Heals"],
                            critPer: item["Per Critical"],
                            reflect: item["Reflect"],
                            perSpellDamage: item["Per Spell Damage"],
                            perRangedDamage: item["Per Ranged Damage"],
                            perRangedResistance: item["Per Ranged Resistance"],
                            perWepDamage: item["Per Weapon Damage"],
                            perMeleeDamage: item["Per Melee Damage"],
                            perMeleeResistance: item["Per Melee Resistance"],
                            summon: item.Summons,
                            range: item.Range,
                            mp: item.MP,
                            ap: item.AP,
                        },
                        ItemCondition: {
                            condition: item.condition
                        }
                    })
                    newItem.save()
                } else {
                    console.log("ALREADY HERE!")
                }
            })

            iteration += 1
            if(result[iteration]){
               return scrapeItems(result, iteration, allItems)
            } else {
                equipmentPage += 1
                if(equipmentPage >= 120) return
                scrapeWebpageLinks(equipmentPage).then((result) => {
                    console.log("result2", result)
                    let allItems = scrapeItems(result)
                })
                return allItems
            }
        })
    }

    function changePersentageStats(){

    }

    function changeStatNamesAndValue(item){
        let minMaxRegex = /\d+-\d+/
        let negativeRegex = /^-\d+/
        let minValueRegex = /(\d+)/
        let maxValueRegex = /-(\d+)/
        console.log("change stats, stuff", item)
        for(let attribute of Object.keys(item)){
            let keyValue = item[attribute].toString()
            if(attribute == "Vitality"){
                if(keyValue.match(minMaxRegex)){
                    item.minVitality = keyValue.match(minValueRegex)[0]
                    item.maxVitality = keyValue.match(maxValueRegex)[1]
                    delete item[attribute]
                } else{
                    if(keyValue.match(negativeRegex)){
                        item.minVitality = keyValue.match(negativeRegex)
                        item.maxVitality = keyValue.match(negativeRegex)
                    } else{
                        item.minVitality = keyValue.match(minValueRegex)
                        item.maxVitality = keyValue.matcg(maxValueRegex)
                    }
                    delete item[attribute]
                }
            } 
            // else if(attribute == "Range"){
            //     if(keyValue.match(minMaxRegex)){
            //         item.minRange = keyValue.match(minValueRegex)[0]
            //         item.maxRange = keyValue.match(maxValueRegex)[1]
            //         delete item[attribute]
            //     } else{
            //         if(keyValue.match(negativeRegex)){
            //             item.minVitality = keyValue.match(negativeRegex)
            //             item.maxVitality = keyValue.match(negativeRegex)
            //         } else{
            //             item.minVitality = keyValue.match(minValueRegex)
            //             item.maxVitality = keyValue.match(maxValueRegex)
            //         }
            //         delete item[attribute]
            //     }
            // }
            //console.log("attribute", item[attribute])
        }
        console.log("CHANGED ITEM", item)
        return item
    }

    res.send({working: true})
})

router.get("/equipment-list", (req, res) => {
    Item.find().then(result => {
        res.send(result)
    })
})

router.get("/update-equipment-database", (req, res) =>{
    
    res.send({working: true})
})

router.use('/auth', authRoutes)

router.use((req, res) => {
    res.status(404).send({ error: 'not-found' })
})

module.exports = router
