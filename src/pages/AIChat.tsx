import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AIChatApi from "@/api/AIChat";
import { useProductsByIds } from "@/hooks/useProductsByIds";
import {
  Bot,
  Sparkles,
  User,
  ShoppingBag,
  Send,
  MessagesSquare,
  Info,
  Lightbulb,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import { AxiosError } from "axios";

type FormData = {
  message: string;
};

interface AIResponse {
  success: boolean;
  response: string;
  front_end_data?: {
    model: string;
    ids: number[];
  };
}

interface Product {
  id: number;
  name: string;
  final_price: string;
  is_available: boolean;
  discount_percentage: number;
  rating_stars: string;
}

interface ProductsResponse {
  products: Product[];
  count: number;
}

interface ConversationItem {
  type: string;
  content: string;
  data?: Product[];
}

const postChat = async (formData: FormData): Promise<AIResponse> => {
  const { data } = await AIChatApi.post("/api/chat/", formData);
  return data;
};

const AIChat = () => {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const conversationContainerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const message = watch("message", "");
  const remainingChars = 150 - (message?.length || 0);

  // Hook para obtener productos por IDs
  const productsMutation = useProductsByIds();

  // Función mejorada para hacer scroll
  const scrollToBottom = () => {
    if (conversationEndRef.current && conversationContainerRef.current) {
      // Opción 1: Scroll suave al final
      conversationEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });

      // Opción 2: Alternativa con setTimeout para asegurar que el DOM se haya actualizado
      setTimeout(() => {
        if (conversationEndRef.current) {
          conversationEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 100);
    }
  };

  // Scroll automático mejorado
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // También hacer scroll cuando cambia el estado de loading
  useEffect(() => {
    const hasLoading = conversation.some((msg) => msg.type === "loading");
    if (hasLoading) {
      scrollToBottom();
    }
  }, [conversation]);

  const mutation = useMutation({
    mutationFn: postChat,
    onSuccess: (data: AIResponse) => {
      if (data.success) {
        // Si la respuesta tiene datos de productos
        if (
          data.front_end_data &&
          data.front_end_data.model === "Product" &&
          data.front_end_data.ids.length > 0
        ) {
          // Obtener productos por IDs
          productsMutation.mutate(data.front_end_data.ids, {
            onSuccess: (productsData: ProductsResponse) => {
              // Eliminar el mensaje de carga y agregar la respuesta con datos de productos
              setConversation((prev) => {
                const newConversation = prev.filter(
                  (msg) => msg.type !== "loading"
                );
                // Mantener solo las 2 conversaciones más recientes (1 pregunta + 1 respuesta)
                const recentConversation = newConversation.slice(-2);
                const updatedConversation = [
                  ...recentConversation,
                  {
                    type: "ai",
                    content: data.response,
                    data: productsData.products, // Almacenar los productos en la conversación
                  },
                ];

                // Hacer scroll después de actualizar el estado
                setTimeout(scrollToBottom, 150);
                return updatedConversation;
              });
            },
            onError: (error) => {
              console.error("Error fetching products:", error);
              // Mostrar solo la respuesta de la IA sin los productos
              setConversation((prev) => {
                const newConversation = prev.filter(
                  (msg) => msg.type !== "loading"
                );
                const updatedConversation = [
                  ...newConversation,
                  { type: "ai", content: data.response },
                ];
                setTimeout(scrollToBottom, 150);
                return updatedConversation;
              });
            },
          });
        } else {
          // Respuesta normal sin datos de productos
          setConversation((prev) => {
            const newConversation = prev.filter(
              (msg) => msg.type !== "loading"
            );
            // Mantener solo las 2 conversaciones más recientes (1 pregunta + 1 respuesta)
            const recentConversation = newConversation.slice(-2);
            const updatedConversation = [
              ...recentConversation,
              { type: "ai", content: data.response },
            ];
            setTimeout(scrollToBottom, 150);
            return updatedConversation;
          });
        }
      }
      reset();
    },
    onError: (error: AxiosError) => {
      console.error("Error:", error);
      
      // Verificar si el error es 429 (Too Many Requests)
      let errorMessage = "Lo siento, solo soy un demo déjame descansar un poco o contratame para tener tu propio asistente.";
      
      if (error.response?.status === 429) {
        errorMessage = "¡Uff! Estoy un poco cansado de tanto trabajar solo me contrataron para la demo. Me voy a descansar un ratito. Intenta preguntarme algo más tarde, ¿vale?";
      }
      
      // Eliminar el mensaje de carga y mostrar error
      setConversation((prev) => {
        const newConversation = prev.filter((msg) => msg.type !== "loading");
        const updatedConversation = [
          ...newConversation,
          {
            type: "ai",
            content: errorMessage,
          },
        ];
        setTimeout(scrollToBottom, 150);
        return updatedConversation;
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.message.trim() || mutation.isPending) return;

    // Agregar el mensaje del usuario y un mensaje de carga
    const userMessage: ConversationItem = {
      type: "user",
      content: data.message,
    };
    const loadingMessage: ConversationItem = { type: "loading", content: "" };

    // Mantener solo las 2 conversaciones más recientes y agregar las nuevas
    setConversation((prev) => {
      const recentConversation = prev.slice(-2);
      return [...recentConversation, userMessage, loadingMessage];
    });

    // Enviar la consulta a la IA
    mutation.mutate(data);
  };

  // Componente para mostrar productos
  const ProductCard = ({ product }: { product: Product }) => {
    const handleBuyClick = () => {
      // Solo para estética, no hace nada
      console.log(`Clic en comprar producto ${product.id}`);
    };

    // Función para mostrar las estrellas correctamente
    const renderStars = (ratingString: string) => {
      // Si ya es un string con emojis de estrellas, mostrarlo directamente
      if (ratingString.includes("⭐")) {
        return <span>{ratingString}</span>;
      }

      // Si es un número, convertirlo a estrellas
      const rating = parseFloat(ratingString);
      if (!isNaN(rating)) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < fullStars
                    ? "text-yellow-500 fill-current"
                    : i === fullStars && hasHalfStar
                    ? "text-yellow-500 fill-half"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 text-xs ml-1">({rating})</span>
          </div>
        );
      }

      // Si no es reconocible, mostrar el texto original
      return <span className="text-gray-600 text-xs">{ratingString}</span>;
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm mb-2">
        <div className="flex items-start gap-2">
          <div className="bg-indigo-100 p-1.5 rounded-lg flex-shrink-0">
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-md font-bold text-indigo-700">
                {product.final_price}
              </span>
              <div className="flex items-center">
                {renderStars(product.rating_stars)}
              </div>
            </div>
            {product.discount_percentage > 0 && (
              <div className="mt-1">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-1.5 py-0.5 rounded">
                  {product.discount_percentage}% OFF
                </span>
              </div>
            )}
            <button
              onClick={handleBuyClick}
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 text-xs rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <ShoppingCart className="w-3 h-3" />
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header mejorado */}
        <div className="text-center mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-100">
          <div className="inline-flex items-center gap-4 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full">
            <div className="relative">
              <Bot className="w-10 h-10" />
              <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold">
              Asistente Virtual Inteligente SaltaGet
            </h1>
          </div>
          <p className="text-gray-700 text-lg mb-2">
            Conoce nuestros productos y servicios
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              Disponible 24/7
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              Respuestas precisas
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              Recomendaciones personalizadas
            </span>
          </div>
        </div>

        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl mb-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5" />
            <p className="font-medium flex items-center gap-2">
              Esta es una demostración de nuestro asistente IA con conocimiento
              de una tienda de tecnología.
              <a
                href="https://django-chat-ai-xcwc.onrender.com/admin/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-yellow-300 font-semibold underline hover:text-yellow-100 transition-colors"
              >
                Acceder al admin de la tienda{" "}
                <ExternalLink className="w-4 h-4" />
              </a>
            </p>
          </div>
        </div>

        {/* Conversation Display mejorado */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-100">
          {conversation.length > 0 ? (
            <div className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="bg-indigo-600 text-white p-4 flex items-center gap-3">
                <MessagesSquare className="w-5 h-5" />
                <span className="font-medium">Conversación en tiempo real</span>
              </div>
              <div
                ref={conversationContainerRef}
                className="p-6 space-y-6 max-h-[500px] overflow-y-auto scroll-smooth"
                style={{ scrollBehavior: "smooth" }}
              >
                {conversation.map((msg, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    {/* Mensaje del usuario o IA */}
                    <div
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-xl border max-w-[80%] ${
                          msg.type === "user"
                            ? "bg-indigo-100 border-indigo-200"
                            : msg.type === "loading"
                            ? "bg-transparent border-transparent"
                            : "bg-white border-gray-200 shadow-xs"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {msg.type === "ai" && (
                            <div className="bg-indigo-600 p-1 rounded-full">
                              <Bot className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                            </div>
                          )}
                          {msg.type === "user" && (
                            <div className="bg-indigo-300 p-1 rounded-full">
                              <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                            </div>
                          )}
                          {msg.type === "loading" ? (
                            <div className="flex items-center gap-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.4s" }}
                                ></div>
                              </div>
                              <span className="text-indigo-600">
                                Pensando...
                              </span>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <p className="text-gray-800 leading-relaxed">
                                {msg.content}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Productos recomendados debajo del mensaje de IA */}
                    {msg.type === "ai" && msg.data && msg.data.length > 0 && (
                      <div className="ml-12 mt-1">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-indigo-600" />
                            Productos recomendados
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.data.map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Elemento invisible para el scroll */}
                <div ref={conversationEndRef} style={{ height: "1px" }} />
              </div>
            </div>
          ) : (
            // Mensaje publicitario cuando no hay conversación
            <div className="mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border border-indigo-200 shadow-xl overflow-hidden p-8 text-center">
              <div className="bg-white/80 p-6 rounded-xl border border-indigo-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-indigo-800 mb-2">
                  ¡Descubre el poder de la IA en tu negocio!
                </h3>
                <p className="text-gray-700 mb-4">
                  Nuestro asistente virtual puede ayudarte a encontrar
                  productos, responder preguntas y ofrecerte recomendaciones
                  personalizadas las 24 horas del día, los 7 días de la semana.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg border border-indigo-100">
                    <Clock className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Respuestas instantáneas
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-indigo-100">
                    <TrendingUp className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Recomendaciones inteligentes
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-indigo-100">
                    <ShoppingBag className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      Productos personalizados
                    </p>
                  </div>
                </div>
                <p className="text-indigo-700 font-medium mt-6">
                  ¡Escribe tu primera pregunta para comenzar!
                </p>
              </div>
            </div>
          )}
          {/* Chat Input mejorado */}
          <div className="bg-blue-100 rounded-2xl border border-gray-200 shadow-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4 text-indigo-700">
              <Lightbulb className="w-5 h-5" />
              <p className="text-sm">
                Prueba preguntar sobre: precios, disponibilidad o
                características de productos
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <input
                  {...register("message", {
                    required: "El mensaje es requerido",
                    maxLength: {
                      value: 150,
                      message: "Máximo 150 caracteres",
                    },
                  })}
                  placeholder="Escribe tu consulta aquí..."
                  className="w-full px-5 py-4 pr-20 text-lg bg-indigo-50 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200 shadow-inner"
                  maxLength={150}
                  disabled={mutation.isPending}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span
                    className={`text-sm font-medium ${
                      remainingChars < 20 ? "text-red-500" : "text-indigo-600"
                    }`}
                  >
                    {remainingChars}
                  </span>
                </div>
              </div>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Máximo 150 caracteres
                </div>
                <button
                  type="submit"
                  disabled={!message.trim() || mutation.isPending}
                  className={`h-14 px-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-md`}
                >
                  {mutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Pensando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar consulta
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Value Proposition Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-100 shadow-lg mb-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            ¿Por qué implementar nuestro asistente IA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">
                  Disponibilidad 24/7
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Atiende a tus clientes en cualquier momento sin limitaciones de
                horario.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">
                  Aumenta tus ventas
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Recomienda productos relevantes y aumenta el valor promedio de
                compra.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">
                  Mejora la experiencia
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Ofrece respuestas instantáneas y personalizadas a cada cliente.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">Reduce costos</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Disminuye la carga de trabajo de tu equipo de atención al
                cliente.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section mejorada */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          <div className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Respuestas Inteligentes
            </h3>
            <p className="text-sm text-gray-600">
              IA entrenada con el conocimiento de tu negocio
            </p>
          </div>
          <div className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bot className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">IA Avanzada</h3>
            <p className="text-sm text-gray-600">
              Tecnología de última generación para tu negocio
            </p>
          </div>
          <div className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Send className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Respuesta Rápida
            </h3>
            <p className="text-sm text-gray-600">
              Resuelve consultas en segundos, no en horas
            </p>
          </div>
        </div>

        {/* Footer Call-to-Action */}
        <div className="text-center mt-10 pt-6 border-t border-indigo-100">
          <p className="text-gray-600 mb-4">
            ¿Interesado en implementar esta solución en tu negocio?
          </p>
          <a
            href="https://wa.me/543876050942"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIChat;