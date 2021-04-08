import { useContext } from 'react';
import { ChallengesContext } from '../contexts/CallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, compliteChallenge} = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded(){
        compliteChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {
                activeChallenge ? (

                    <div className={styles.challengeActive}>
                        <header>
                            Ganhe {activeChallenge.amount}xp
                        </header>
                        <main>
                            <img src = {`icons/${activeChallenge.type}.svg`} alt=""/>
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer>
                            <button type="button" className={styles.challengeFailedBtn} onClick={handleChallengeFailed}>Falhei</button>
                            <button type="button" className={styles.challengeSucceededBtn} onClick={handleChallengeSucceeded}>Completar</button>
                        </footer>

                    </div>

                ):(

                    <div className={styles.challengeNotActive}>
                        <strong>Finalise um ciclo para ganhar XP!</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level UP"/>
                            Avance de levels completando desafios.
                        </p>

                    </div>

                )
            }
            
        </div>
    );
}