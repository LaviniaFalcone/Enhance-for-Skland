import React from 'react';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import {InfrastructureTraining} from '../../../skland-api/arknights';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {Dumbbell} from '@icon-park/react';
import MiniProgressBar from '../../MiniProgressBar';
import {RoomHeader, RoomResidentChars} from './Room';

const Training = ({model, method}: InfrastructureRoomProps<InfrastructureTraining>) => {
    const getSkillLevel = () => {
        if (model.trainee) {
            return method.getSkillLevel(model.trainee.charId, model.trainee.targetSkill);
        }
        return -1;
    };

    const isCompleted = (skillLevel: number) => {
        if (!model.trainee) return 0;
        if (getSkillLevel() >= skillLevel) {
            return 100;
        }
        return 0;
    };

    const isUpgrading = (targetLevel: number) => {
        if (model.remainSecs == 0) return false;
        return getSkillLevel() == targetLevel - 1;
    };

    return (
        <>
            <RoomHeader title='训练室' level={model.level}/>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2'>
                    <div className='flex surface-d border-round-lg overflow-hidden'>
                        {
                            model.trainee ?
                                <Avatar image={method.getAvatar(model.trainee.charId)}/> :
                                <Avatar icon={<Dumbbell/>}/>
                        }
                    </div>
                    {
                        model.trainee && model.trainee.targetSkill != -1 ?
                            <Avatar image={method.getSkillIcon(model.trainee.charId, model.trainee.targetSkill)}/> :
                            <Avatar/>
                    }
                    <MiniProgressBar className='flex-grow-1 h-full' color='lightgreen' value={isCompleted(0)}
                                     indeterminate={isUpgrading(1)}/>
                    <MiniProgressBar className='flex-grow-1 h-full' color='gold' value={isCompleted(1)}
                                     indeterminate={isUpgrading(2)}/>
                    <MiniProgressBar className='flex-grow-1 h-full' color='tomato' value={isCompleted(2)}
                                     indeterminate={isUpgrading(3)}/>
                </div>
                <RoomResidentChars chars={model.trainer && [model.trainer]} max={1} method={method}/>
            </div>
        </>
    );
};

export default Training;