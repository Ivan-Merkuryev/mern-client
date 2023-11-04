function PasswordInput ({ register, errors }) {
    return (
      <>
       <input
          className="input"
          placeholder="Пароль"
          type="password"
          {...register("password", {
            required: "Заполните поле",
          })}
        />
        {errors?.password && (
          <p className="msg-error">{errors.password.message}</p>
        )}
      </>
    );
  }
  export default PasswordInput