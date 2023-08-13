import {Currency, Expenses, Income, Order, Share} from '@icon-park/react';
import {Avatar} from 'primereact/avatar';
import {Button} from 'primereact/button';
import {Carousel} from 'primereact/carousel';
import {Dialog} from 'primereact/dialog';
import {Divider} from 'primereact/divider';
import {Image} from 'primereact/image';
import {useState} from 'react';
import DiamondShardIcon from '../../../assets/arknights/img/icon_diamond_shard.png';

import MoneyIcon from '../../../assets/arknights/img/icon_money.png';
import {InfrastructureTrading} from '../../../skland-api/arknights';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import MiniProgressBar from '../../MiniProgressBar';
import {RoomHeader, RoomResidentChars} from './Room';


const Trading = ({model, method}: InfrastructureRoomProps<InfrastructureTrading>) => {
    const [showMore, setShowMore] = useState<boolean>(false);

    const itemTemplate = (stock: any) => (
        <div className='flex flex-column w-8rem flex-shrink-0 surface-0 border-round-lg m-2 select-none'>
            <div className='flex align-items-center p-2' style={{color: 'deepskyblue'}}>
                <div className='text-xs'>
                    {stock.type == 'O_GOLD' ? '贵金属订单' : '源石订单'}
                </div>
                <div className='flex-grow-1'/>
                <Currency/>
            </div>
            <Divider className='m-0' type='dashed'/>
            <div className='flex flex-column p-2'>
                <div className='flex text-xl'><Expenses/></div>
                <div className='flex text-6xl justify-content-center'>
                    {stock.delivery[0].count}
                </div>
                <div className='flex text-sm justify-content-end' style={{color: 'gold'}}>
                    {stock.delivery[0].id == 3003 ? '赤金' : '源石碎片'}
                </div>
            </div>
            <Divider className='m-0' type='dashed'/>
            <div className='flex text-sm align-items-center p-2 gap-1'>
                <Image width='24' src={stock.gain.type == 'GOLD' ? MoneyIcon : DiamondShardIcon}/>
                <div>{stock.gain.count}</div>
                <div className='flex-grow-1'/>
                <Income className='text-xl'/>
            </div>
        </div>
    );

    return (
        <>
            <RoomHeader title='贸易站' level={model.level}>
                <Button className='text-sm p-0' icon={<Share className='mr-1'/>} label='订单' text
                        onClick={() => setShowMore(true)} disabled={model.stock.length == 0}
                        style={{color: model.stock.length == 0 ? 'grey' : 'deepskyblue'}}/>
            </RoomHeader>
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

            <Dialog header='订单' headerClassName='select-none' style={{width: '55rem'}}
                    onHide={() => setShowMore(false)} visible={showMore} resizable={false} draggable={false}>
                <Carousel value={model.stock} itemTemplate={itemTemplate} numScroll={5} numVisible={5}/>
            </Dialog>
        </>
    );
};

export default Trading;