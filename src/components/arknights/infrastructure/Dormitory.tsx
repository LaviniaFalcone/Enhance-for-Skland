import {Sleaves} from '@icon-park/react';
import {Divider} from 'primereact/divider';
import {InfrastructureDormitory} from '../../../skland-api/arknights';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import {RoomHeader, RoomResidentChars} from './Room';

const Dormitory = ({model, method}: InfrastructureRoomProps<InfrastructureDormitory>) => {
    return (
        <>
            <RoomHeader title='宿舍' level={model.level}>
                <div className='flex text-sm align-items-center gap-1' style={{color: 'greenyellow'}}>
                    <Sleaves/>
                    <div>{model.comfort}</div>
                </div>
            </RoomHeader>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <RoomResidentChars chars={model.chars} max={5} method={method}/>
            </div>
        </>
    );
};

export default Dormitory;