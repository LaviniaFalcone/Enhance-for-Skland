import React, {useState} from 'react';
import SklandBindingCard from '../components/SklandBindingCard';
import {useMountEffect} from 'primereact/hooks';
import {queryBind} from '../skland-api/fn';
import {useNavigate} from 'react-router-dom';
import {LocalUser} from '../location';
import {readSessionStorage} from '../util/storage';
import userStore from '../store/userStore';

const SklandBindingView = () => {
    const navigate = useNavigate();

    const [binding, setBinding] = useState<SklandBinding[]>();

    useMountEffect(() => {
        const current = readSessionStorage<LocalUser>('CurrentLogin');
        if (current) {
            userStore.setUser(current.user);
            queryBind(current.cred).then(r => setBinding(r));
        } else {
            navigate('/');
        }
    });

    return (
        <>{binding && binding.map((bind, index) => (<SklandBindingCard value={bind} key={index}/>))}</>
    );
};

export default SklandBindingView;