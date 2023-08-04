import React from 'react';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {Box, Speed} from '@icon-park/react';
import MiniProgressBar from '../../MiniProgressBar';
import {RoomHeader, RoomResidentChars} from './Room';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import {InfrastructureManufacture} from '../../../skland-api/arknights';

const Manufacture = ({model, method}: InfrastructureRoomProps<InfrastructureManufacture>) => {
    const formula: { [id: string]: string } = {
        1: '基础作战记录',
        2: '初级作战记录',
        3: '中级作战记录',
        4: '赤金',
        5: '先锋双芯片',
        6: '近卫双芯片',
        7: '重装双芯片',
        8: '狙击双芯片',
        9: '术师双芯片',
        10: '医疗双芯片',
        11: '辅助双芯片',
        12: '特种双芯片',
        13: '源石碎片',
        14: '源石碎片'
    };

    return (
        <>
            <RoomHeader title='制造站' level={model.level}>
                <div className='flex text-sm align-items-center gap-1' style={{color: 'gold'}}>
                    <Speed/>
                    <div>{(model.speed * 100).toFixed(0)}%</div>
                </div>
            </RoomHeader>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2 select-none'>
                    <Avatar icon={<Box/>}/>
                    <div className='flex flex-column justify-content-end flex-grow-1 gap-1'>
                        <div className='flex align-items-baseline gap-1'>
                            <div className='text-lg' style={{color: 'gold'}}>{model.weight}</div>
                            <div className='text-xs'>/</div>
                            <div className='text-xs'>{model.capacity}</div>
                            <div className='flex-grow-1'/>
                            <div className='text-sm' style={{color: 'gold'}}>{formula[model.formulaId]}</div>
                        </div>
                        <MiniProgressBar value={model.weight / model.capacity * 100} color='gold'/>
                    </div>
                    <Avatar className='text-sm' label={model.complete.toString()} shape='circle'/>
                </div>
                <RoomResidentChars chars={model.chars} max={3} method={method}/>
            </div>
        </>
    );
};

export default Manufacture;