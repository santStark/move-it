import { createContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface IChallenge{
    type: 'body' | 'eye',
    description:string,
    amount:number
}
interface IChallengeContextData {
    level:number,
    currentExperience:number,
    challengesCompleted:number,
    experienceNextLevel:number,
    activeChallenge:IChallenge,
    levelUp:()=>void,
    startNewChallenge:()=>void,
    resetChallenge:()=>void,
    compliteChallenge:()=>void,
    closeLevelModalUp:()=>void,
}

export const ChallengesContext = createContext({} as IChallengeContextData);

export function ChallengesProvider(
    { 
        children, 
        ...rest 
    }) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [islevelUpModalOpen, setIslevelUpModalOpen] = useState(false);

    const experienceNextLevel = Math.pow(((level + 1) * 4) , 2);

    useEffect(()=>{
        Notification.requestPermission();
    },[]);

    useEffect(()=>{
       Cookie.set('level',level.toString());
       Cookie.set('currentExperience',currentExperience.toString());
       Cookie.set('challengesCompleted',challengesCompleted.toString());

    },[level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIslevelUpModalOpen(true);
    }

    function closeLevelModalUp(){
        setIslevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomIndex];

        setActiveChallenge(challenge);
        
        if(Notification.permission === 'granted'){

            new Audio('/notification.mp3').play();
            new Notification('Novo desafio!',{
                body:`Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function compliteChallenge(){

        if(!activeChallenge) return;

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceNextLevel){

            finalExperience = finalExperience - experienceNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (

        <ChallengesContext.Provider value={
            {
                level,
                currentExperience,
                challengesCompleted,
                experienceNextLevel,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                compliteChallenge,
                closeLevelModalUp
            }
        }>
            {children}
            { islevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}