import {Chess} from '@icon-park/react';
import {Avatar} from 'primereact/avatar';
import {Divider} from 'primereact/divider';
import React from 'react';
import {ResidentCharacters} from '../../../skland-api/arknights';
import MiniProgressBar from '../../MiniProgressBar';

interface RoomProps {
    className?: string;
    children?: React.ReactNode;
}

interface RoomHeaderProps {
    title: string;
    level: number;
    className?: string;
    children?: React.ReactNode;
}

interface RoomResidentCharsProps {
    chars?: ResidentCharacters[];
    max: 1 | 2 | 3 | 4 | 5;
    method: {
        getAvatar: (charId: string) => string | undefined
        getName: (charId: string) => string
    };
}

const Room = ({className, children}: RoomProps) => {
    return (
        <div className={className}>
            <div className='flex flex-column surface-0 border-round-lg'>{children}</div>
        </div>
    );
};

export const RoomHeader = ({title, level, children, className}: RoomHeaderProps) => (
    <>
        <div className='flex align-items-center gap-2 select-none p-2' style={{height: '2.5rem'}}>
            <div className='flex align-items-baseline gap-2'>
                <div>{title}</div>
                <div className='text-xs'>Lv.{level}</div>
            </div>
            <div className='flex-grow-1'/>
            <div className={className}>{children}</div>
        </div>
        <Divider className='m-0'/>
    </>
);

export const RoomResidentChars = ({chars, max, method}: RoomResidentCharsProps) => {
    if (!chars) chars = [];

    if (chars.length < max) {
        for (let i = chars.length; i < max; i++) {
            chars.push({charId: `empty_${i}`, ap: 0, index: -1});
        }
    }

    return (
        <div className='flex h-2rem gap-2'>
            {chars.map(char => (
                <div className='flex col gap-2 overflow-hidden p-0' key={char.charId}>
                    <div className='flex flex-shrink-0 surface-d border-round-lg overflow-hidden'>
                        {char.index == -1 ? <Avatar icon={<Chess/>}/> : <Avatar image={method.getAvatar(char.charId)}/>}
                    </div>
                    <div className='flex flex-column flex-grow-1 justify-content-end overflow-hidden gap-1'>
                        <div className='text-xs text-ellipsis'>
                            {char.index != -1 ? method.getName(char.charId) : '虚位以待'}
                        </div>
                        <MiniProgressBar value={char.ap <= 0 && char.index != -1 ? 100 : char.ap / 86400}
                                         color={`hsl(${char.ap / 86400}, 100%, 64%)`}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Room;