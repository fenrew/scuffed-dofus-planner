import React from 'react';
import vitImage from "../../../Image/Small-stats-icons/Vitality.png"
import neutralImage from "../../../Image/Small-stats-icons/Neutral.png"
import strImage from "../../../Image/Small-stats-icons/Strength.png"
import agiImage from "../../../Image/Small-stats-icons/Agility.png"
import chaImage from "../../../Image/Small-stats-icons/Chance.png"
import intImage from "../../../Image/Small-stats-icons/Intelligence.png"
import wisImage from "../../../Image/Small-stats-icons/Wisdom.png"
import neutralResImage from "../../../Image/Small-stats-icons/Neutral_square.png"
import earthResImage from "../../../Image/Small-stats-icons/Earth_square.png"
import airResImage from "../../../Image/Small-stats-icons/Fire_square.png"
import waterResImage from "../../../Image/Small-stats-icons/Water_square.png"
import fireResImage from "../../../Image/Small-stats-icons/Fire_square.png"
import apImage from "../../../Image/Small-stats-icons/Action_Point.png"
import mpImage from "../../../Image/Small-stats-icons/Movement_Point.png"
import iniImage from "../../../Image/Small-stats-icons/Initiative.png"
import critResImage from "../../../Image/Small-stats-icons/Critical_Resistance.png"
import pushResImage from "../../../Image/Small-stats-icons/Pushback_Resistance.png"
import powerImage from "../../../Image/Small-stats-icons/Power.png"
import prospectImage from "../../../Image/Small-stats-icons/Prospecting.png"
import lockImage from "../../../Image/Small-stats-icons/Lock.png"
import dodgeImage from "../../../Image/Small-stats-icons/Dodge.png"
import damageImage from "../../../Image/Small-stats-icons/Damage.png"
import critDamageImage from "../../../Image/Small-stats-icons/Critical_Damage.png"
import pushDamageImage from "../../../Image/Small-stats-icons/Pushback_Damage.png"
import mpRedImage from "../../../Image/Small-stats-icons/MP_Reduction.png"
import apRedImage from "../../../Image/Small-stats-icons/AP_Reduction.png"
import healImage from "../../../Image/Small-stats-icons/Heals.png"
import critImage from "../../../Image/Small-stats-icons/Critical_Hit.png"
import summonImage from "../../../Image/Small-stats-icons/Summon.png"
import rangeImage from "../../../Image/Small-stats-icons/Range.png"


const ItemStats = props => {

    let statIcon = getStatIcon(props.stat)

    console.log("stat icon", statIcon)

    return (
        <div>
            {props.stat}: {props.value} <img src={statIcon} style={{height:"20px", width:"20px"}} alt=""/>
        </div>
    );
};

function getStatIcon(icon){
    console.log("ICON GET STAT", icon)
    icon = icon.toLowerCase().toString()
    if(icon=="vitality"){
        return vitImage
    }
    else if(icon=="neudamage" || icon=="neutral"){
        return neutralImage
    }
    else if(icon=="strdamage" || icon=="strength"){
        return strImage
    }
    else if(icon=="agidamage" || icon=="agility"){
        return agiImage
    }
    else if(icon=="chadamage" || icon=="chance"){
        return chaImage
    }
    else if(icon=="intdamage" || icon=="intelligence"){
        return intImage
    }
    else if(icon=="wisdom"){
        return wisImage
    }
    else if(icon=="fixedearthresistance" || icon=="perearthresistance"){
        return earthResImage
    }
    else if(icon=="fixedairresistance" || icon=="perairresistance"){
        return airResImage
    }
    else if(icon=="fixedwaterresistance" || icon=="perwaterresistance"){
        return waterResImage
    }
    else if(icon=="fixedfireresistance" || icon=="perfireresistance"){
        return fireResImage
    }
    else if(icon=="mp"){
        return mpImage
    }
    else if(icon=="ap"){
        return apImage
    }
    else if(icon=="initiative"){
        return iniImage
    }
    else if(icon=="criticalresistance"){
        return critResImage
    }
    else if(icon=="pushbackresistance"){
        return pushResImage
    }
    else if(icon=="perpower"){
        return powerImage
    }
    else if(icon=="fixedneutralresistance" || icon=="perneutralresistance"){
        return neutralResImage
    }
    else if(icon=="prospecting"){
        return prospectImage
    }
    else if(icon=="lock"){
        return lockImage
    }
    else if(icon=="dodge"){
        return dodgeImage
    }
    else if(icon=="fixeddamage"){
        return damageImage
    }
    else if(icon=="critdamage"){
        return critDamageImage
    }
    else if(icon=="pushbackdamage"){
        return pushDamageImage
    }
    else if(icon=="mpred"){
        return mpRedImage
    }
    else if(icon=="apred"){
        return apRedImage
    }
    else if(icon=="heal"){
        return healImage
    }
    else if(icon=="critper"){
        return critImage
    }
    else if(icon=="summon"){
        return summonImage
    }
    else if(icon=="range"){
        return rangeImage
    }
}

export default ItemStats;