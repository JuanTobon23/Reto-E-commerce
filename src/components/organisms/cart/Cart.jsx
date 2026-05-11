import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { imageMap } from "../../../assets/imageMap";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = getTotalPrice();
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "REACT20") {
      setDiscountPercent(20);
      alert("¡Cupón aplicado! 20% de descuento.");
    } else if (couponCode.toUpperCase() === "DESC10") {
      setDiscountPercent(10);
      alert("¡Cupón aplicado! 10% de descuento.");
    } else {
      setDiscountPercent(0);
      alert("Cupón inválido.");
    }
  };

  const discountValue = subtotal * (discountPercent / 100);
  const subtotalWithDiscount = subtotal - discountValue;
  const tax = subtotalWithDiscount * 0.19;
  const shipping = items.length > 0 ? 10.00 : 0;
  const finalTotal = subtotalWithDiscount + tax + shipping;

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito esta vacio</h2>
          <p className="text-gray-500 mb-6">
            Agrega productos desde la galeria para iniciar la compra.
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:opacity-90"
          >
            Ir a productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Carrito de compras</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
          {items.map(({ product, quantity }) => {
            const resolvedImage = imageMap[product.image] ?? product.image;
            const itemSubtotal = Number(product.price) * Number(quantity);
            return (
              <article key={product.id} className="p-4 flex gap-4 items-center">
                <img
                  src={resolvedImage}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                  <p className="text-sm text-gray-500">${Number(product.price).toFixed(2)} c/u</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    Subtotal: ${itemSubtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decrementItem(product.id)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => incrementItem(product.id)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Quitar
                </button>
              </article>
            );
          })}
        </div>

        <aside className="bg-white rounded-2xl border border-gray-200 p-6 h-fit">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Resumen</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Código de cupón</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Ej. REACT20"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({items.length} productos)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Descuento ({discountPercent}%)</span>
                <span>-${discountValue.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos (19% IVA)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full inline-flex justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
          >
            Ir a checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
