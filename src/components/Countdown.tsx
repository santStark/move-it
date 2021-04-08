import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {

    const {minutes,seconds,hasFinished,isActive,startCountdown,resetCountdown} = useContext(CountdownContext);
    

    const [minutesL, minutesR] = minutes.toString().padStart(2,'0').split('');
    const [secondsL, secondsR] = seconds.toString().padStart(2,'0').split('');

    

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesL}</span>
                    <span>{minutesR}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsL}</span>
                    <span>{secondsR}</span>
                </div>

            </div>

            {
                hasFinished ? (
                    <button disabled className={styles.countdownButton}>
                        Ciclo finalizado
                    </button>
                ) : (
                    <>

                        {isActive ? (
                            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive} `} onClick={resetCountdown}>
                                Abandonar ciclo
                            </button>
                        ) : (
                            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                            Iniciar ciclo
                            </button>
                        )}
                        
                    </>
                )
            }            
            
        </div>
    );
}