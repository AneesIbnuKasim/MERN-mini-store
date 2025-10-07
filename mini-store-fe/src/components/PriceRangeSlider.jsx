
import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import useProduct from "../hooks/useProduct";

export default function PriceRangeSlider() {
    const [values, setValues] = useState([0,1500])
  const {dispatch} = useProduct()

  const handleChange = (val) => {
    setValues(val)
  };
  const handlePriceFilter = ()=>{
    dispatch({type:'SET_FILTER',key:'minPrice', value:values[0]})
    dispatch({type:'SET_FILTER',key:'maxPrice', value:values[1]})
    dispatch({type:'SET_PAGE',payload:1})
  }

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h4>

      {/* Slider */}
     <div className="flex items-center gap-5  ">
         <RangeSlider
        min={0}
        max={2000}
        step={10}
        value={values}
        thumbSize={4}
        onInput={handleChange}
        />
        <button className= " border-1 border-blue-400 p-1 rounded-2xl" type="button" onClick={handlePriceFilter}>Go</button>
     </div>
      

      <div className="text-center w-[80%] text-gray-700 text-sm mt-3">
        ${values[0]} — ${values[1]}
        
      </div>
      
    </div>
  );
}