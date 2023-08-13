import {BatteryCharge, Lightning} from '@icon-park/react';
import {Avatar} from 'primereact/avatar';
import {Divider} from 'primereact/divider';
import {InfrastructurePower} from '../../../skland-api/arknights';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import MiniProgressBar from '../../MiniProgressBar';
import {RoomHeader, RoomResidentChars} from './Room';

const Power = ({model, method}: InfrastructureRoomProps<InfrastructurePower>) => {
    const generation = 2 ** (model.level - 1) * 60 + (2 ** (model.level - 1) - 1) * 10;

    return (
        <>
            <RoomHeader title='发电站' level={model.level}>
                <div className='flex text-sm align-items-center gap-1' style={{color: 'greenyellow'}}>
                    <Lightning/>
                    <div>{generation}</div>
                </div>
            </RoomHeader>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2'>
                    <Avatar icon={<BatteryCharge/>}/>
                    <div className='flex align-items-center flex-grow-1 gap-2'>
                        <MiniProgressBar className='flex-grow-1 h-full' indeterminate color='greenyellow'/>
                    </div>
                </div>
                <RoomResidentChars chars={model.chars} max={1} method={method}/>
            </div>
        </>
    );
};

export default Power;