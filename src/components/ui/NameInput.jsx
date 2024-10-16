function NameInput ({ register, errors, placeholder }) {
    return (
      <>
       <input
          className="input"
          placeholder={placeholder || 'Имя'}
          type="text"
          {...register("name", {
            required: "Заполните поле",
          })}
        />
        {errors?.name && (
          <p className="msg-error">{errors.name.message}</p>
        )}
      </>
    );
  }
  export default NameInput