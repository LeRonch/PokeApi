import React from 'react';
import './style.css';


function Card({ pokemon }){

    const arrayMax = pokemon.stats.map((stat, index)=>{
        if (!index) {
            return (((2*stat.base_stat + 31 + (252/4))*100)/100)+100+10;
        }
        return ((((2 * stat.base_stat + 31 + (252/4))*100)/100)+5);
    })
    const arrayMin = pokemon.stats.map((stat, index)=>{
        if (!index) {
            return (((2*stat.base_stat + 0 + (0/4))*100)/100)+100+10;
        }
        return ((((2 * stat.base_stat + 0 + (0/4))*100)/100)+5)
    })
    
    var objectMax = {};
    pokemon.stats.forEach((key, i) => objectMax[key.stat.name] = arrayMax[i]);

    var objectMin = {};
    pokemon.stats.forEach((key, i) => objectMin[key.stat.name] = arrayMin[i]);

    return(

        <div className="Card" style={{textTransform: 'capitalize'}}>

            <div className="Card_name">
                <h1>{pokemon.name}</h1>
               <span style={{fontSize: 'smaller'}}>Dex N° : {pokemon.id}</span>
            </div>
            <div className="Card_img">
                <img alt="" src={pokemon.sprites.front_default}></img>
            </div>

            <div className="Card_types">
                {pokemon.types.map(type =>{

                    return (
                    <div className="Card__type" id={type.type.name}>
                        {type.type.name}
                    </div>
                    )
                })}
            </div>

            <div className="Card_info">

                <div className="Card__data Card__data--ability">
                    <h3 className="ability">Abilities</h3>
                    {
                        pokemon.abilities.length === 1 &&
                        <div>
                        {pokemon.abilities[0].ability.name.replace('-', ' ')}
                        </div>
                    }

                    {
                        pokemon.abilities.length === 2 &&
                        <div>
                            {pokemon.abilities[0].ability.name.replace('-', ' ')} / {pokemon.abilities[1].ability.name.replace('-', ' ')}
                        </div>
                    }

                    { 
                        pokemon.abilities.length === 3 &&
                        <div>
                            {pokemon.abilities[0].ability.name.replace('-', ' ')} / {pokemon.abilities[1].ability.name.replace('-', ' ')} / {pokemon.abilities[2].ability.name.replace('-', ' ')}
                        </div>
                    }
                   
                </div>

                <div className="Card__data Card__data--stats">
                        
                    <h3 className="stats">Stats</h3>
                        
                        <table>

                            <thead>
                                <tr>
                                    <th style={{textAlign: 'left'}}>Stats</th>
                                    <th>Base</th>
                                    <th>Min 100-</th>
                                    <th>Min 100</th>
                                    <th>Max 100</th>
                                    <th>Max 100+</th>
                                </tr>
                            </thead>

                            <tbody>
                                {displayTableElement()}
                            </tbody>

                        </table>

                </div>

            </div>

        </div>
    )


    function displayTableElement (){
        return Object.keys(objectMax).map((value, key)=>{
            return (                                
                <tr className={value}>
                    <td data-label="stats" className={`${value}2`} style={{textAlign: 'left'}}>{value.replace('tack','k').replace('ecial-','.').replace('ense','').replace('eed','d')}</td>
                    <td data-label="base">{pokemon.stats[key].base_stat}</td>
                    <td data-label="min100-" className="mini100">{Math.trunc(objectMin[value]*(1+-10/100))}</td>
                    <td data-label="min100">{objectMin[value]}</td>
                    <td data-label="max100">{objectMax[value]}</td>
                    <td data-label="max100+" className="maxi100">{Math.trunc(objectMax[value]*(1+10/100))}</td>
                </tr>
            )
        })
    }
    
}

export default Card;
