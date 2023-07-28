import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { request } from "../../../../API";

const CarSelectorMainDivBox = styled.div`

`

const CarSelector = () => {
    const [Car_Select,setCar_Select] = useState(null)
    const [CarList_State, setCarList_State] = useState([]);


    const handleChangeData = () => {
        
    }

     const Car_Info_Data_Getting = async () => {
        
         const Car_Info_Data_Getting_Axios = await request.get('/DepartmentRouter/Car_Info_Data_Getting');
        
        if (Car_Info_Data_Getting_Axios.data.dataSuccess) {
            setCarList_State(Car_Info_Data_Getting_Axios.data.Car_Info_Data_Getting_Rows);
        }

    }

    useEffect(() => {
        Car_Info_Data_Getting();
    },[])
    return (
        <CarSelectorMainDivBox>
            <div>
                <div style={{ color: "#002FEF" }}>[법인]</div>
                <div>
                     <Select
                            onChange={e => handleChangeData(e)}
                            name="colors"
                            options={CarList_State}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isReadOnly={true}
                            isSearchable={false}
                            placeholder="선택바랍니다."
                            value={Car_Select}
                            />
                </div>
            </div>
        </CarSelectorMainDivBox>
    )
}

export default CarSelector;