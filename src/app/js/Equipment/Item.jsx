import React from 'react';
import ItemStats from "./ItemStats";

const Item = props => {
    console.log("props", props)

    let name = props.name.toLowerCase()

    let mappedItemStats = []

    console.log("itemstats", props.itemStats)
    for (let key in props.itemStats){
        mappedItemStats.push({stat: key.toString(), value: props.itemStats[key].toString()})
    }

    console.log("new mappedItemStats", mappedItemStats)

    mappedItemStats = mappedItemStats.map((el, index) => (
        <ItemStats 
        stat={el.stat}
        value={el.value}
        key={index}
        />
    ))
    
    return (
        <div className="item-container">
            <div className="capitalize">
                <div className="item-image">
                    <img src={props.img} />
                </div>
                <div className="item-name">
                    {name}
                </div>
                <div className="item-level">
                    {props.level}
                </div>
                <div className="item-slot">
                    {props.slot}
                </div>
                <div className="item-stats-container">
                    Stats:
                    <div className="items-stats">
                        {mappedItemStats}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;