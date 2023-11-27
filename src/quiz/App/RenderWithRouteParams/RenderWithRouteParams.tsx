import cx from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';

export type RenderWithRouteParamsProps = {
    component: React.FC<any>;
}

const RenderWithRouteParams = ({component: Component} : RenderWithRouteParamsProps) => {
    const params = useParams();
    
    

    return <Component {...params}/>;
}

export default RenderWithRouteParams;