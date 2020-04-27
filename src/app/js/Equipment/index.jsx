import React, { Component } from 'react'

import api from "../utils/api";
import { Redirect } from 'react-router-dom'

import Item from "./Item"

class Equipment extends Component {

    constructor(props){
        super(props);

        this.state = {
            search: "",
            equipment: "",
        }
    }

    componentDidMount() {
        api.get("/api/equipment-list").then(equipment => {
            console.log("EQUIPMENT", equipment)
            this.setState({
                equipment: equipment
            });
          console.log("equipmentstate", this.state.equipment)
        });
    
        // const savedUser = localStorage.getItem("shoppingCart");
        // if (!savedUser) return;
    
        // const user = JSON.parse(savedUser);
        // let newTotalPrice = 0;
        // user.shoppingCart.forEach(el => (newTotalPrice += el.price * el.quantity));
        // this.setState({
        //   checkout: user.shoppingCart,
        //   totalPrice: newTotalPrice
        // });
    }

    

    render() {

        if (!this.state.equipment) {
            return (
              <div>
                <div className="navigation-fix" />
                <h1>Loading...</h1>
              </div>
            );
        }

        //if (!this.props.user) return <Redirect to="/auth/sign-in" /> // this is actually the protection

        let mappedEquipment;
        const newMappedEquipment = this.state.equipment.filter(el => {
            el.name.toLowerCase().includes(this.state.search)
        })
        
        mappedEquipment = this.state.equipment.map((el, index) => (
            <Item
              object={el}
              name={el.name}
              img={el.img}
              level={el.level}
              slot={el.slot}
              itemStats={el.itemStats}
              itemCondition={el.itemCondition}
              key={el._id}
            />
        ));
        
        console.log("mapped equipement 2", mappedEquipment, this.state.equipment)


        return (
            <div className="container">
                {this.props.user._id}
                <br />
                {this.props.user.email}
                <br/>
                <br/>
                <div>
                    {mappedEquipment}
                </div>
            </div>
        )
    }
}

export default Equipment
