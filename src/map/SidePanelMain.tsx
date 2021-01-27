import React, {useContext, useEffect, useState} from 'react';
import { ShapeContext } from '../hooks/ShapeContext';
import { StoreContainer } from '../store';
import * as turf from '@turf/turf';
import { useParams } from 'react-router';
import { Switch, Tooltip } from '@material-ui/core';

const SidePanelMain = () => {

    const store = StoreContainer.useContainer();
    const {shapeId, allowEdit, setAllowEdit} = useContext(ShapeContext);
    const [acres, setAcres] = useState<null | number>(null)

    useEffect(() => {
        if(shapeId){
            if(store.featureCollection){
                for(const feature of store.featureCollection?.features){
                    if(feature.id === shapeId){
                        setAcres(turf.area(feature) * 0.000247105);
                        break;
                    }
                }
            }   
        }else{
            setAcres(null)
        }
    }, [shapeId, store.featureCollection])

    const onChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllowEdit(event.target.checked);
    }

    return (<div>
        <Tooltip title={'edit toggle'}>
          <Switch
            checked={allowEdit}
            onChange={onChangeSwitch}
            name="checkedA"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Tooltip>

        <h3>ID: {shapeId}</h3>
        <h3>Acres: {acres}</h3>
    </div>)
}

export default SidePanelMain;