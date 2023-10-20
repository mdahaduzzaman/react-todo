import React from 'react'
import './menuCard.css'
const MenuCard = ({menuData}) => {
    return (
        <>
            <section className="section-restaurant">
                {menuData.map((currentElement)=>{
                    return(
                        <>
                            <div className="card-container">
                                <div className="card">
                                    <div className="card-body">
                                        <span className="card-number card-circle subtle">{currentElement.id}</span>
                                        <span className="card-author subtle">{currentElement.name}</span>
                                        <h2 className="card-title">{currentElement.category}</h2>
                                        <span className="card-description subtle">{currentElement.description}</span>
                                        <div className="card-read">Read</div>
                                    </div>
                                    <img src={currentElement.image} alt="" />
                                    <span className="card-tag subtle">Order Now</span>
                                </div>
                            </div>
                        </>
                    )
                })};
            </section>
        </>
    )
}

export default MenuCard;
