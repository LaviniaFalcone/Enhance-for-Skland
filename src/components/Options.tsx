import React from 'react';
import {Setting} from '@icon-park/react';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {InputSwitch} from 'primereact/inputswitch';
import {observer} from 'mobx-react-lite';

interface OptionsProps {
    header: string;
    icon?: React.ReactNode;
    value?: OptionItem[];
}

export interface OptionItem {
    detail?: React.ReactNode;
    key: string;
    label: string;
    type: OptionItemType;
    value: any;
}

export enum OptionItemType {
    SWITCH
}

const Options = (props: OptionsProps) => {
    const optionValue = (item: OptionItem) => {
        const {type, value, key} = item;
        switch (type) {
            case OptionItemType.SWITCH:
                return <InputSwitch checked={value[key]} onChange={e => value[key] = e.value}/>;
        }
    };

    const option = (item: OptionItem, index: number) => (
        <>
            {index !== 0 && <Divider className='mt-2' type='dashed'/>}
            <div className='flex flex-column gap-1' key={item.key}>
                <div className='flex align-items-center'>
                    <div>{item.label}</div>
                    <div className='flex-grow-1'/>
                    <div>{optionValue(item)}</div>
                </div>
                {item.detail && <div className='text-sm text-300'>{item.detail}</div>}
            </div>
        </>
    );

    return (
        <div className='flex flex-column surface-0 border-round-xl select-none'>
            <div className='flex text-lg align-items-center gap-2 p-3'>
                <Avatar icon={props.icon}/>
                <div>{props.header}</div>
            </div>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-3'>
                {props.value?.map((item, index) => option(item, index))}
            </div>
        </div>
    );
};

Options.defaultProps = {
    icon: <Setting/>
};

export default observer(Options);