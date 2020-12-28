import { useHistory } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./login.module.css";
import { useEffect } from "react";

const Login = ({ authService }) => {
  const history = useHistory();
  const goToMaker = (userId) => {
    history.push({
      pathname: `/maker`,
      state: { id: userId },
    });
  };

  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => {
        // console.log(data);
        goToMaker(data.user.uid);
      });
  };

  useEffect(() => {
    authService //
      .onAuthChange((user) => {
        user && goToMaker(user.uid);
      });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={onLogin}
              disabled={false}
            >
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button
              className={`${styles.button} ${styles.github}`}
              onClick={onLogin}
              disabled={true}
            >
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
