import styles from '../styles/buttonStyles.module.css';


const SignupBtn = ({ signup }: { signup: () => void }) => {
  return (
    <button onClick={signup} className={styles.whitebtn}>
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
        className="bi bi-arrow-up-right-circle" viewBox="0 0 16 16">
        <path fillRule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z" />
      </svg>
      <h3>sign up</h3>
    </button>
  )
}

export default SignupBtn;