import saltagetApi from "@/api/saltagetApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormContactoData = {
  issue: string;
  email: string;
  cellphone: string;
  full_name: string;
  reason: string;
};

const postContact = async (Formdata: FormContactoData) => {
  const { data } = await saltagetApi.post("/email/send_email", Formdata);
  return data;
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500";
const labelClass =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";
const errorClass = "mt-1 text-sm text-red-500";

export const FormContacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormContactoData>();

  const { mutate } = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
      reset();
      alert("Mensaje enviado con éxito");
    },
    onError: () => {
      alert("Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.");
    },
  });

  const onSubmit = (data: FormContactoData) => mutate(data);

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <form
        id="form-contacto"
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900"
      >
        <h3 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Contáctanos
        </h3>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Completá el formulario y te respondemos a la brevedad.
        </p>

        <div className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="full_name" className={labelClass}>
                Nombre completo
              </label>
              <input
                id="full_name"
                type="text"
                {...register("full_name", {
                  required: "Por favor ingresa tu nombre completo",
                })}
                className={fieldClass}
                placeholder="Ej: Juan Pérez"
              />
              {errors.full_name && (
                <p className={errorClass}>{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Por favor ingresa tu correo electrónico",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico no válido",
                  },
                })}
                className={fieldClass}
                placeholder="ejemplo@dominio.com"
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cellphone" className={labelClass}>
                Teléfono celular
              </label>
              <input
                id="cellphone"
                type="tel"
                {...register("cellphone", {
                  required: "Por favor ingresa tu número de teléfono",
                })}
                className={fieldClass}
                placeholder="Ej: +54 387 6050942"
              />
              {errors.cellphone && (
                <p className={errorClass}>{errors.cellphone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="issue" className={labelClass}>
                Asunto
              </label>
              <input
                id="issue"
                type="text"
                {...register("issue", { required: "Por favor ingresa el asunto" })}
                className={fieldClass}
                placeholder="Consulta sobre servicios"
              />
              {errors.issue && (
                <p className={errorClass}>{errors.issue.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="reason" className={labelClass}>
              Mensaje
            </label>
            <textarea
              id="reason"
              rows={4}
              {...register("reason", { required: "Por favor ingresa tu mensaje" })}
              className={`${fieldClass} resize-none`}
              placeholder="Describe tu consulta o motivo de contacto..."
            />
            {errors.reason && (
              <p className={errorClass}>{errors.reason.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-400"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>
    </div>
  );
};
