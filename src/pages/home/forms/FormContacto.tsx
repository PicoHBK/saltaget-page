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

export const FormContacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormContactoData>();

  const { mutate } = useMutation({
    mutationFn: postContact,
    onSuccess: (data) => {
      console.log(data);
      reset();
      alert("Mensaje enviado con éxito");
    },
    onError: (error) => {
      console.log(error);
      alert("Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.");
    },
  });

  const onSubmit = (data: FormContactoData) => {
    console.log("Datos del formulario:", data);
    mutate(data);
  };

  return (
    <div className="mt-8 md:mt-12 bg-gradient-to-b from-white to-gray-50 text-gray-800 rounded-3xl md:rounded-4xl w-full md:w-11/12 lg:w-4/5 xl:w-2/3 mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200 border-opacity-30"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Contáctanos
        </h2>

        <div className="space-y-3 md:space-y-4">
          {/* Nombre Completo */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre Completo *
            </label>
            <input
              id="full_name"
              type="text"
              {...register("full_name", {
                required: "Por favor ingresa tu nombre completo",
              })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Ej: Juan Pérez"
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico *
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
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Ej: ejemplo@dominio.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Teléfono Celular */}
          <div>
            <label
              htmlFor="cellphone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono Celular *
            </label>
            <input
              id="cellphone"
              type="tel"
              {...register("cellphone", {
                required: "Por favor ingresa tu número de teléfono",
              })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Ej: +51 987654321"
            />
            {errors.cellphone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cellphone.message}
              </p>
            )}
          </div>

          {/* Asunto */}
          <div>
            <label
              htmlFor="issue"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Asunto *
            </label>
            <input
              id="issue"
              type="text"
              {...register("issue", {
                required: "Por favor ingresa el asunto",
              })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Ej: Consulta sobre servicios"
            />
            {errors.issue && (
              <p className="mt-1 text-sm text-red-600">{errors.issue.message}</p>
            )}
          </div>

          {/* Razón/Mensaje */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mensaje *
            </label>
            <textarea
              id="reason"
              rows={4}
              {...register("reason", {
                required: "Por favor ingresa tu mensaje",
              })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Describe tu consulta o motivo de contacto..."
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
            )}
          </div>

          {/* Botón de Envío */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r font-bold from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl rounded-xl md:rounded-2xl shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};