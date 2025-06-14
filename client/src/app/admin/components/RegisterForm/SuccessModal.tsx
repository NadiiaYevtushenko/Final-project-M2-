import style from './RegisterModal.module.css';

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className={style.modalOverlay}>
    <div className={style.modal}>
      <h2 className={style.sectionTitle}>✅ Реєстрація пройшла успішно!</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Тепер ви можете увійти до свого акаунта.
      </p>
      <button onClick={onClose} className={style.submitBtn}>
        Закрити
      </button>
    </div>
  </div>
);

export default SuccessModal;
