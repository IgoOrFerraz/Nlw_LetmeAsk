// Components
import firebase from 'firebase';
import { createContext, ReactNode, useEffect, useState } from 'react'; 
import { auth } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    //Toda function async retorna uma Promise
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children : ReactNode;
}
  
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    
    const [user, setUser] = useState<User>();

    /* O useEffect apresenta o formato useEffect(() => {}, []) onde as [] representa a situação em que será executado a function, monitorando o estado, onde por default é executado apenas uma vez */
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){
            const { displayName, photoURL, uid } = user;
    
            if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
            }
    
            setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
            })
        }
        })

        /* Boas práticas condizem com um return de uma unsubscribe sempre que houver uma function que executa monitoramento com o intuito de evitar erros */
        return () => { unsubscribe(); }
    }, [])

    async function signInWithGoogle() {

        const provider = new firebase.auth.GoogleAuthProvider();
        
        const result = await auth.signInWithPopup(provider);
        
        if (result.user){
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
        }

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        })
        }

    }
    
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}