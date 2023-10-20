import React from 'react'
import './restaurant.css'
import Menu from "../../menuApi"
import { useState } from 'react'
import MenuCard from './MenuCard'
import Navbar from './Navbar'

const Restaurant = () => {
    const [menuData, setMenuData] = useState(Menu)

    const uniqueMenuList = [...new Set(
        Menu.map((curElem)=>{
            return (
                curElem.category
            );
        })
    ), 'All']


    const filterItem = (millTime)=>{
        if(millTime === "All"){
            setMenuData(Menu);
            return;
        }

        const newMenuList = Menu.filter((currentElement)=>{
            if(currentElement.category === millTime){
                return currentElement
            }
        })
        setMenuData(newMenuList);
    }

    return (
        <>
            <Navbar filterItem={ filterItem } uniqueMenuList={ uniqueMenuList }/>
            <MenuCard menuData={ menuData } />
        </>
    )
}

export default Restaurant