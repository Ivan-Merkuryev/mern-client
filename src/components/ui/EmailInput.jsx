function EmailInput({ register, errors }) {
  return (
    <>
      <input
        className="input"
        placeholder="Электронная почта"
        {...register("email", {
          required: "Заполните поле",
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
            message: "Введите корректный email",
          },
        })}
      />
      {errors?.email && <p className="msg-error">{errors.email.message}</p>}
    </>
  );
}
export default EmailInput 