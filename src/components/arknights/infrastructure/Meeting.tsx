import React from 'react';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {CircleFiveLine, FiveKey, FourKey, Notes, OneKey, SevenKey, SixKey, ThreeKey, TwoKey} from '@icon-park/react';
import MiniProgressBar from '../../MiniProgressBar';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import {InfrastructureMeeting} from '../../../skland-api/arknights';
import {RoomHeader, RoomResidentChars} from './Room';

const Meeting = ({model, method}: InfrastructureRoomProps<InfrastructureMeeting>) => {
    const findClue = (clue: string) => {
        return model.clue.board.find(item => item == clue) && 'white';
    };

    return (
        <>
            <RoomHeader title='会客室' level={model.level}>
                <div className='flex text-sm align-items-center gap-1'
                     style={{color: 'orange'}}>
                    {
                        model.clue.sharing &&
                        <>
                            <CircleFiveLine className='p-icon-spin'/>
                            <div>线索交流开启中</div>
                        </>
                    }
                </div>
            </RoomHeader>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2'>
                    <Avatar icon={<Notes/>}/>
                    <div className='flex flex-column justify-content-end flex-grow-1 gap-1'>
                        <div className='flex align-items-baseline gap-1'>
                            <div className='text-lg' style={{color: 'orange'}}>{model.clue.own}</div>
                            <div className='text-xs'>/</div>
                            <div className='text-xs'>10</div>
                            <div className='flex-grow-1'/>
                            <div className='flex gap-1' style={{color: 'transparent'}}>
                                <OneKey style={{color: findClue('RHINE')}}/>
                                <TwoKey style={{color: findClue('PENGUIN')}}/>
                                <ThreeKey style={{color: findClue('BLACKSTEEL')}}/>
                                <FourKey style={{color: findClue('URSUS')}}/>
                                <FiveKey style={{color: findClue('GLASGOW')}}/>
                                <SixKey style={{color: findClue('KJERAG')}}/>
                                <SevenKey style={{color: findClue('RHODES')}}/>
                            </div>
                        </div>
                        <MiniProgressBar value={model.clue.own * 10} color='orange'/>
                    </div>
                </div>
                <RoomResidentChars chars={model.chars} max={2} method={method}/>
            </div>
        </>
    );
};

export default Meeting;