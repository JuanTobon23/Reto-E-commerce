import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { imageMap } from "../../../assets/imageMap";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.19;
  const shipping = items.length > 0 ? 10.00 : 0;
  const total = subtotal + tax + shipping;

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-12 text-center transform transition-all">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">¡Orden Confirmada!</h2>
          <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
            Hemos recibido tu pedido correctamente. Este es un flujo de checkout simulado para el taller, ¡pero lograste completarlo!
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-12 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Tu carrito está esperando</h2>
          <p className="text-lg text-gray-500 mb-8">Parece que aún no te has decidido. ¡Descubre nuestra increíble galería de productos!</p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
          >
            Explorar Galería
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Finalizar Compra</h2>
        <p className="text-gray-500 mt-2">Completa tus datos para recibir tu pedido muy pronto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-3xl p-8 lg:p-10 border border-gray-100 space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Información de Envío</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ej. María Pérez"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección de Entrega</label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Calle Falsa 123, Ciudad"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full mt-8 px-6 py-4 rounded-xl bg-gray-900 text-white text-lg font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Confirmar Compra Simulada
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-4">
            Al confirmar, aceptas que esta es una simulación de compra con fines educativos.
          </p>
        </form>

        <aside className="bg-gray-50 rounded-3xl p-8 lg:p-10 h-fit border border-gray-100 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h3>
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {items.map(({ product, quantity }) => {
              const resolvedImage = imageMap[product.image] ?? product.image;
              return (
                <div key={product.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                    <img src={resolvedImage} alt={product.title} className="max-h-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-sm font-semibold text-gray-900 line-clamp-1">{product.title}</span>
                    <span className="text-xs text-gray-500">Cant: {quantity}</span>
                  </div>
                  <span className="font-bold text-gray-900 self-center">
                    ${(Number(product.price) * Number(quantity)).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-3 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos (19%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-end">
            <div>
              <span className="block text-gray-500 text-sm">Total a pagar</span>
              <span className="text-xs text-gray-400">Incluye IVA</span>
            </div>
            <span className="text-3xl font-black text-gray-900">${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
