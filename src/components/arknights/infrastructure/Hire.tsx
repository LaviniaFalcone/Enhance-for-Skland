import {Association} from '@icon-park/react';
import {Avatar} from 'primereact/avatar';
import {Divider} from 'primereact/divider';
import {InfrastructureHire} from '../../../skland-api/arknights';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import MiniProgressBar from '../../MiniProgressBar';
import {RoomHeader, RoomResidentChars} from './Room';

const Hire = ({model, method}: InfrastructureRoomProps<InfrastructureHire>) => {
    return (
        <>
            <RoomHeader title='办公室' level={model.level}/>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2'>
                    <Avatar icon={<Association/>}/>
                    <MiniProgressBar className='flex-grow-1 h-full' indeterminate={model.refreshCount == 0}
                                     value={model.refreshCount * 100}/>
                    <MiniProgressBar className='flex-grow-1 h-full' indeterminate={model.refreshCount == 1}
                                     value={Math.max(model.refreshCount - 1, 0) * 100}/>
                    <MiniProgressBar className='flex-grow-1 h-full' indeterminate={model.refreshCount == 2}
                                     value={Math.max(model.refreshCount - 2, 0) * 100}/>
                </div>
                <RoomResidentChars chars={model.chars} max={1} method={method}/>
            </div>
        </>
    );
};

export default Hire;