import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0d159da7-1fa8-4ef6-96b3-a57cc639ac02/files/2c369bea-d770-4940-9dcf-b7ea88e71831.jpg";

const NAV_LINKS = [
  { id: "about", label: "О студии" },
  { id: "services", label: "Услуги" },
  { id: "shop", label: "Магазин" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  {
    icon: "Shirt",
    title: "Роспись одежды",
    desc: "Джинсы, куртки, футболки — ваш рисунок или из нашего каталога. Любой сюжет, техника и цветовая гамма.",
    price: "от 2 500 ₽",
  },
  {
    icon: "ShoppingBag",
    title: "Роспись аксессуаров",
    desc: "Сумки, шоперы, рюкзаки, кошельки. Авторский принт, который не повторится ни у кого.",
    price: "от 1 800 ₽",
  },
  {
    icon: "Palette",
    title: "Декоративные изделия",
    desc: "Вазы, кашпо, тарелки, зеркала — роспись любых предметов интерьера по вашему желанию.",
    price: "от 1 200 ₽",
  },
  {
    icon: "Gift",
    title: "Подарочные наборы",
    desc: "Уникальный подарок с именной росписью. Упаковка, открытка и доставка включены.",
    price: "от 3 500 ₽",
  },
];

const PRODUCTS = [
  { id: 1, name: "Джинсы с ботанической росписью", category: "Одежда", price: 6800, tag: "Хит" },
  { id: 2, name: "Шопер «Пионы»", category: "Сумки", price: 2400, tag: null },
  { id: 3, name: "Джинсовая куртка «Лето»", category: "Одежда", price: 9200, tag: "Новинка" },
  { id: 4, name: "Рюкзак «Ночной сад»", category: "Сумки", price: 5600, tag: null },
  { id: 5, name: "Футболка «Акварель»", category: "Одежда", price: 3100, tag: null },
  { id: 6, name: "Шопер «Абстракция»", category: "Сумки", price: 2800, tag: "Новинка" },
];

const REVIEWS = [
  { name: "Алина М.", text: "Заказала роспись на своей джинсовой куртке — просто нет слов. Мастер вникла в идею с первого раза, результат превзошёл ожидания.", stars: 5, date: "Март 2026" },
  { name: "Ольга Р.", text: "Купила шопер в подарок подруге. Она была в восторге! Качество краски отличное, цвета не выцветают после стирки.", stars: 5, date: "Февраль 2026" },
  { name: "Дарья К.", text: "Уникальная студия с настоящим подходом к каждому заказу. Уже сделала три заказа и буду возвращаться снова.", stars: 5, date: "Январь 2026" },
];

type CartItem = { id: number; name: string; price: number; qty: number };

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-body">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-xl tracking-[0.25em] uppercase text-stone-900 hover:text-stone-500 transition-colors">
            Atelier
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-xs tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors uppercase">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:text-stone-500 transition-colors">
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-stone-50 text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileNav(!mobileNav)}>
              <Icon name={mobileNav ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-stone-50 border-t border-stone-200 py-4 px-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900 transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="pt-16 min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Студия ручной росписи</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8 text-stone-900">
            Каждая вещь —<br />
            <em className="not-italic text-stone-400">произведение</em><br />
            искусства
          </h1>
          <p className="text-stone-500 text-base leading-relaxed mb-10 max-w-sm">
            Роспись одежды, сумок и декора по вашему эскизу. Авторская продукция в единственном экземпляре.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => scrollTo("services")} className="px-8 py-3.5 bg-stone-900 text-stone-50 text-xs tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors">
              Заказать роспись
            </button>
            <button onClick={() => scrollTo("shop")} className="px-8 py-3.5 border border-stone-300 text-stone-700 text-xs tracking-[0.2em] uppercase hover:border-stone-900 hover:text-stone-900 transition-colors">
              В магазин
            </button>
          </div>
        </div>
        <div className="flex-1 relative min-h-[50vh] md:min-h-screen overflow-hidden">
          <img src={HERO_IMAGE} alt="Роспись одежды" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 md:via-stone-50/20 md:to-transparent from-10% via-30%" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 block">О студии</span>
            <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">Живопись,<br />которую носят</h2>
            <p className="text-stone-600 leading-relaxed mb-5">
              Мы создаём уникальные росписи на одежде, сумках и предметах декора уже более 5 лет. Каждая работа выполняется вручную — акриловыми красками, тканевыми маркерами или акварелью по специальному грунту.
            </p>
            <p className="text-stone-600 leading-relaxed mb-10">
              Работаем с эскизами клиентов и создаём дизайны с нуля. Любой сюжет, стиль, размер. Роспись устойчива к стирке и не теряет яркости со временем.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-stone-200">
              {[["5+", "лет опыта"], ["800+", "работ"], ["100%", "ручная работа"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl text-stone-900 mb-1">{num}</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={HERO_IMAGE} alt="О студии" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 bg-stone-50 px-5 py-3 text-xs font-medium tracking-[0.2em] uppercase text-stone-900">
              Авторская роспись
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 block">Что мы делаем</span>
            <h2 className="font-display text-4xl md:text-5xl">Услуги</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-stone-200">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-stone-100 p-10 hover:bg-white transition-colors group">
                <div className="mb-6">
                  <Icon name={s.icon} size={26} className="text-stone-400 group-hover:text-stone-800 transition-colors" />
                </div>
                <h3 className="font-display text-2xl mb-3 text-stone-900">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <span className="text-sm font-medium text-stone-900 tracking-wide">{s.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => scrollTo("contacts")} className="px-10 py-4 bg-stone-900 text-stone-50 text-xs tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors">
              Обсудить заказ
            </button>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 block">Готовые работы</span>
              <h2 className="font-display text-4xl md:text-5xl">Магазин</h2>
            </div>
            <span className="text-sm text-stone-400 hidden md:block">{PRODUCTS.length} изделий</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                  <img src={HERO_IMAGE} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {p.tag && (
                    <span className="absolute top-4 left-4 bg-stone-900 text-stone-50 text-xs px-3 py-1 uppercase tracking-wider">
                      {p.tag}
                    </span>
                  )}
                  <button
                    onClick={() => addToCart(p)}
                    className="absolute bottom-0 left-0 right-0 bg-stone-900 text-stone-50 text-xs tracking-[0.2em] uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    В корзину
                  </button>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">{p.category}</div>
                    <div className="text-stone-900 text-sm font-medium leading-snug">{p.name}</div>
                  </div>
                  <div className="font-display text-lg text-stone-900 whitespace-nowrap">
                    {p.price.toLocaleString("ru-RU")} ₽
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 px-6 bg-stone-900 text-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 block">Говорят клиенты</span>
            <h2 className="font-display text-4xl md:text-5xl text-stone-50">Отзывы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-stone-800 p-8 hover:border-stone-600 transition-colors">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="text-stone-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-stone-300 leading-relaxed mb-8 text-sm">«{r.text}»</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-100 text-sm">{r.name}</span>
                  <span className="text-xs text-stone-500">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 block">Свяжитесь с нами</span>
            <h2 className="font-display text-4xl md:text-5xl mb-8">Контакты</h2>
            <p className="text-stone-500 leading-relaxed mb-10">
              Расскажите о своей идее — обсудим детали, сроки и стоимость. Работаем по всей России, отправляем готовые изделия почтой.
            </p>
            <div className="space-y-6">
              {[
                { icon: "Instagram", label: "Instagram", value: "@atelier.paint" },
                { icon: "MessageCircle", label: "Telegram", value: "@atelier_paint" },
                { icon: "Mail", label: "Email", value: "hello@atelier-paint.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Садовая, 12" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-stone-200 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={15} className="text-stone-400" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="text-stone-900 text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-stone-100 p-10">
            <h3 className="font-display text-2xl mb-8">Оставить заявку</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 mb-2 block">Ваше имя</label>
                <input type="text" placeholder="Анна" className="w-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 mb-2 block">Телефон или email</label>
                <input type="text" placeholder="+7 (900) 000-00-00" className="w-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 mb-2 block">Опишите идею</label>
                <textarea rows={4} placeholder="Хочу роспись на джинсовой куртке — цветы и бабочки..." className="w-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors resize-none" />
              </div>
              <button className="w-full py-4 bg-stone-900 text-stone-50 text-xs tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors">
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg tracking-[0.25em] uppercase text-stone-900">Atelier</span>
          <span className="text-xs text-stone-400 tracking-wider">© 2026 Студия ручной росписи. Все права защищены.</span>
          <div className="flex gap-6 flex-wrap justify-center">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-xs text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-wider">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative bg-stone-50 w-full max-w-md flex flex-col shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-8 py-6 border-b border-stone-200">
              <h2 className="font-display text-2xl">Корзина</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:text-stone-500 transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-stone-400">
                  <Icon name="ShoppingBag" size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="text-xs uppercase tracking-[0.2em]">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-stone-100 last:border-0">
                      <div className="w-16 h-20 bg-stone-100 flex-shrink-0 overflow-hidden">
                        <img src={HERO_IMAGE} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-snug mb-2">{item.name}</p>
                        <p className="font-display text-lg">{(item.price * item.qty).toLocaleString("ru-RU")} ₽</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 border border-stone-200 flex items-center justify-center hover:border-stone-900 transition-colors">
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="text-sm w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 border border-stone-200 flex items-center justify-center hover:border-stone-900 transition-colors">
                            <Icon name="Plus" size={12} />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-stone-300 hover:text-stone-900 transition-colors">
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="px-8 py-6 border-t border-stone-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-[0.15em] text-stone-500">Итого</span>
                  <span className="font-display text-2xl">{total.toLocaleString("ru-RU")} ₽</span>
                </div>
                <button className="w-full py-4 bg-stone-900 text-stone-50 text-xs tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors">
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;