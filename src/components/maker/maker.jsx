import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./maker.module.css";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: `1`,
      name: `Ellie`,
      company: `Samsung`,
      theme: `dark`,
      title: `Software Engineer`,
      email: `ellie@gmail.com`,
      message: `go for it`,
      fileName: `a`,
      fileURL: null,
    },
    2: {
      id: `2`,
      name: `Gunwoo`,
      company: `Samsung`,
      theme: `light`,
      title: `Software Engineer`,
      email: `ellie@gmail.com`,
      message: `go for it`,
      fileName: `b`,
      fileURL: `ellie.png`,
    },
    3: {
      id: `3`,
      name: `Minsu`,
      company: `Samsung`,
      theme: `colorful`,
      title: `Software Engineer`,
      email: `ellie@gmail.com`,
      message: `go for it`,
      fileName: `c`,
      fileURL: null,
    },
  });

  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push(`/`);
      }
    });
  }, []);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      // 동기적으로 처리가 안 될 수도 있기 때문에, 콜백으로 처리해야 안전하다
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
