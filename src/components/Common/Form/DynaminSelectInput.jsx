import i18n from "@@/i18n";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select"
import { FormGroup, Label } from "reactstrap";
import * as axios from "@@/helpers/api_helper"
import { getErrorMessage } from "@@/helpers/errorResponse";
import Loader from "../Loader";
import { jsonToIConstant } from "@@/interfaces/constants";

const DynamicSelectInput = (props) => {
    const [options , setOptions] = useState(undefined);
    const [loading , setLoading] = useState(false);
    const {obj } = props;
    useEffect(()=>{
        setLoading(true)
   
            axios.post(`${obj.metadata.lookupAPIURL}` , {sortBy :""}).then(response => {
                setOptions(
                    response?.result?.items?.map((ele)=>{
                        return {
                            label : i18n.language === "ar"? ele.nameAR : ele.nameEN,
                            value : ele.id
                        }
                    }));
                setLoading(false)
              }).catch(err=>{
                getErrorMessage(err , true)
                setLoading(false)
              })
            
      
    },[])



   
    const getValue = () => {
        let data = props.validation;
        let extractedObject = undefined;
   
            extractedObject = options?.find(el => el.value == data.value);

      
        return extractedObject ?? null;
    }
    const customStyles = {
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,

          
   

       
        }), menuList: (provided) => {
            return {
                ...provided,
                maxHeight: "150px", // Adjust the height as per your requirement




            }
        },
        
        
      };
    return (
        <React.Fragment>
            <FormGroup >

                <Label >{props.name}</Label>
                <Loader loading={loading}>

                <Select 
                
                styles={customStyles}
                {...props}
                    value={getValue()}
                    onChange={(e) => {
                        props.onChangeSelect(e);
                    }}
                    options={options}

                ></Select>
                </Loader>

            </FormGroup>
        </React.Fragment>
    )

}
export default DynamicSelectInput