function ErrorBtn() {
  const btnReload = () => {
    window.location.reload();
  };
  return (
    <div>
      <p>Произошла ошибка</p>
      <button className="open-btn" onClick={btnReload}>
        Обновить
      </button>
    </div>
  );
}

export default ErrorBtn;
