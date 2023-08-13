import {Drone} from '@icon-park/react';
import {Divider} from 'primereact/divider';
import {Player} from '../../skland-api/arknights';
import {getSkillIconUrl, getSkinAvatarUrl} from '../../skland-api/arknights/character';
import {InfrastructureMethod} from '../../skland-api/arknights/infrastructure';
import ExperimentOptions from '../../store/arknights/config/ExperimentOptions';
import MiniProgressBar from '../MiniProgressBar';
import Control from './infrastructure/Control';
import Dormitory from './infrastructure/Dormitory';
import Hire from './infrastructure/Hire';
import Manufacture from './infrastructure/Manufacture';
import Meeting from './infrastructure/Meeting';
import Power from './infrastructure/Power';
import Room from './infrastructure/Room';
import Trading from './infrastructure/Trading';
import Training from './infrastructure/Training';

interface InfrastructureModuleProps {
    model: Player;
}

const InfrastructureModule = ({model}: InfrastructureModuleProps) => {
    const {building, chars, charInfoMap} = model;
    const {control, dormitories, hire, labor, manufactures, meeting, powers, tradings, training} = building;

    const getCharacter = (charId: string) => chars.find(char => char.charId == charId);

    const getAvatar = (charId: string) => {
        const char = getCharacter(charId);
        if (char) return getSkinAvatarUrl(char.skinId);
    };

    const getName = (charId: string) => charInfoMap[charId].name;

    const getSkillIcon = (charId: string, skillIndex: number) => {
        const char = getCharacter(charId);
        return getSkillIconUrl(char!.skills[skillIndex].id);
    };

    const getSkillLevel = (charId: string, skillIndex: number) => {
        const char = getCharacter(charId);
        return char!.skills[skillIndex].specializeLevel;
    };

    const method: InfrastructureMethod = {getAvatar, getName, getSkillIcon, getSkillLevel};

    const findRoom = (slotId: string) => {
        const search = (room: any) => room.slotId == slotId;

        const dormitory = dormitories.find(search);
        if (dormitory) return <Dormitory model={dormitory} method={method}/>;

        const manufacture = manufactures.find(search);
        if (manufacture) return <Manufacture model={manufacture} method={method}/>;

        const power = powers.find(search);
        if (power) return <Power model={power} method={method}/>;

        const trading = tradings.find(search);
        if (trading) return <Trading model={trading} method={method}/>;
    };

    const droneCount = ExperimentOptions.DroneCorrect ?
        Math.min(Math.round((Date.now() / 1000 - labor.lastUpdateTime) / 360 + labor.value), labor.maxValue) :
        labor.value;

    return (
        <div className='flex flex-column surface-card border-round-xl'>
            <div className='flex align-items-baseline gap-2 select-none p-3'>
                <div className='text-xl'>基建</div>
                <div className='text-sm'>RHODES ISLAND INFRASTRUCTURE COMPLEX</div>
                <div className='flex-grow-1'/>
                <div className='flex flex-column w-6rem'>
                    <div className='flex align-items-baseline gap-1'>
                        <Drone className='text-purple-300'/>
                        <div className='text-purple-300'>{droneCount}</div>
                        <div className='text-xs'>/</div>
                        <div className='text-xs'>{labor.maxValue}</div>
                    </div>
                    <MiniProgressBar value={droneCount / labor.maxValue * 100} color='var(--purple-300)'/>
                </div>
            </div>
            <Divider className='m-0'/>
            <div className='grid flex-wrap p-3'>
                <Room className='col-12'><Control model={control} method={method}/></Room>
                <Room className='col-4' children={findRoom('slot_24')}/>
                <Room className='col-4' children={findRoom('slot_25')}/>
                <Room className='col-4' children={findRoom('slot_26')}/>
                <Room className='col-4' children={findRoom('slot_14')}/>
                <Room className='col-4' children={findRoom('slot_15')}/>
                <Room className='col-4' children={findRoom('slot_16')}/>
                <Room className='col-4' children={findRoom('slot_5')}/>
                <Room className='col-4' children={findRoom('slot_6')}/>
                <Room className='col-4' children={findRoom('slot_7')}/>
                <Room className='col-4'><Meeting model={meeting} method={method}/></Room>
                <Room className='col-4'><Hire model={hire} method={method}/></Room>
                <Room className='col-4'><Training model={training} method={method}/></Room>
                <Room className='col-12' children={findRoom('slot_28')}/>
                <Room className='col-12' children={findRoom('slot_20')}/>
                <Room className='col-12' children={findRoom('slot_9')}/>
                <Room className='col-12' children={findRoom('slot_3')}/>
            </div>
        </div>
    );
};

export default InfrastructureModule;