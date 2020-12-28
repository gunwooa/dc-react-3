import { firebaseDatabase } from "./firebase";

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);
    ref.on(`value`, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value); // value가 있다면
    });
    return () => ref.off(); // 끄는 함수 리턴,
  }
  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }
  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
