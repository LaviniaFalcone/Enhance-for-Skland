import React from 'react';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {Order} from '@icon-park/react';
import MiniProgressBar from '../../MiniProgressBar';
import {RoomHeader, RoomResidentChars} from './Room';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import {InfrastructureTrading} from '../../../skland-api/arknights';


const Trading = ({model, method}: InfrastructureRoomProps<InfrastructureTrading>) => {
    return (
        <>
            <RoomHeader className='' title='贸易站' level={model.level}/>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2 select-none'>
                    <Avatar icon={<Order/>}/>
                    <div className='flex flex-column justify-content-end flex-grow-1 gap-1'>
                        <div className='flex align-items-baseline gap-1'>
                            <div className='text-lg' style={{color: 'deepskyblue'}}>{model.stock.length}</div>
                            <div className='text-xs'>/</div>
                            <div className='text-xs'>{model.stockLimit}</div>
                            <div className='flex-grow-1'/>
                            <div className='flex align-items-center gap-1'>
                                <div className='text-sm'
                                     style={{color: model.strategy == 'O_GOLD' ? 'deepskyblue' : 'tomato'}}>
                                    {model.strategy == 'O_GOLD' ? '龙门商法' : '开采协力'}
                                </div>
                            </div>
                        </div>
                        <MiniProgressBar value={model.stock.length / model.stockLimit * 100} color='deepskyblue'/>
                    </div>
                </div>
                <RoomResidentChars chars={model.chars} max={3} method={method}/>
            </div>
        </>
    );
};

export default Trading;