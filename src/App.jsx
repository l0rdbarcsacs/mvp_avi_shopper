import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ShoppingCart, 
  BarChart3, 
  CheckCircle, 
  Plus, 
  Users, 
  Store,
  AlertCircle,
  Trash2,
  MessageCircle,
  Sparkles,
  Brain,
  Zap,
  Heart
} from 'lucide-react';

// Mock data
const mockUsers = [
  { id: 'papa', name: 'Papá', role: 'admin', avatar: '👨' },
  { id: 'mama', name: 'Mamá', role: 'admin', avatar: '👩' },
  { id: 'nana', name: 'Nana', role: 'member', avatar: '👵' },
  { id: 'hijo', name: 'Hijo', role: 'member', avatar: '👦' }
];

const mockSupermarkets = {
  jumbo: { name: 'Jumbo', color: 'bg-red-500' },
  lider: { name: 'Líder', color: 'bg-blue-500' },
  santa_isabel: { name: 'Santa Isabel', color: 'bg-green-500' }
};

const mockPrices = {
  'Leche 1L': { jumbo: 1200, lider: 1150, santa_isabel: 1180 },
  'Pan de molde': { jumbo: 2500, lider: 2300, santa_isabel: 2400 },
  'Arroz 1kg': { jumbo: 1800, lider: 1650, santa_isabel: 1700 },
  'Aceite 1L': { jumbo: 3200, lider: 2980, santa_isabel: 3100 },
  'Detergente': { jumbo: 4500, lider: 4200, santa_isabel: 4300 }
};

// AVI's personality and suggestions
const aviSuggestions = [
  "🤖 Veo que Nana agregó leche. ¿Necesitan también cereales o galletas?",
  "💡 Mamá, el precio del arroz está mejor en Líder esta semana (-8%)",
  "🎯 Familia, llevan 3 productos. ¿Qué tal si agregamos algo de verduras?",
  "⚡ Papá, puedo coordinar la entrega para mañana si confirmas antes de las 6pm",
  "❤️ ¡Me encanta ver a toda la familia colaborando! Hijo agregó 2 productos hoy",
  "🧠 Basado en compras anteriores, usualmente necesitan detergente cada 15 días"
];

// Initial shopping list
const initialProducts = [
  { id: 1, nombre: 'Leche 1L', quien: 'Nana', comprado: false, aviSuggestion: true },
  { id: 2, nombre: 'Pan de molde', quien: 'Mamá', comprado: false, aviSuggestion: false },
  { id: 3, nombre: 'Arroz 1kg', quien: 'Hijo', comprado: false, aviSuggestion: false }
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [shoppingList, setShoppingList] = useState({
    id: 'lista_familiar_2025',
    status: 'abierta',
    products: initialProducts,
    supermercadoElegido: null
  });
  const [newProduct, setNewProduct] = useState('');
  const [notification, setNotification] = useState('');
  const [aviMessage, setAviMessage] = useState('');
  const [aviIsThinking, setAviIsThinking] = useState(false);
  const [aviMood, setAviMood] = useState('happy'); // happy, thinking, excited

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const aviSpeak = (message) => {
    setAviIsThinking(true);
    setTimeout(() => {
      setAviMessage(message);
      setAviIsThinking(false);
      setTimeout(() => setAviMessage(''), 5000);
    }, 1000);
  };

  const addProduct = () => {
    if (!newProduct.trim()) return;
    
    const product = {
      id: Date.now(),
      nombre: newProduct,
      quien: currentUser.name,
      comprado: false,
      aviSuggestion: false
    };
    
    setShoppingList(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
    
    setNewProduct('');
    showNotification(`${newProduct} agregado por ${currentUser.name}`);
    
    // AVI reacts to new products
    setTimeout(() => {
      const randomSuggestion = aviSuggestions[Math.floor(Math.random() * aviSuggestions.length)];
      aviSpeak(randomSuggestion);
    }, 2000);
  };

  const removeProduct = (productId) => {
    setShoppingList(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
    showNotification('Producto eliminado');
    aviSpeak("🤖 Producto eliminado. ¿Necesitas que sugiera algo similar?");
  };

  const toggleProduct = (productId) => {
    setShoppingList(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId ? { ...p, comprado: !p.comprado } : p
      )
    }));
  };

  const confirmOrder = (supermarket) => {
    setShoppingList(prev => ({
      ...prev,
      status: 'en_proceso',
      supermercadoElegido: supermarket
    }));
    setCurrentPage('home');
    showNotification(`Pedido confirmado en ${mockSupermarkets[supermarket].name}`);
    aviSpeak(`🎉 ¡Excelente! Coordiné el pedido con ${mockSupermarkets[supermarket].name}. Te notificaré cuando esté listo para recoger.`);
  };

  const aviSuggestProduct = () => {
    const suggestions = ['Yogurt natural', 'Plátanos', 'Huevos', 'Tomate', 'Cebolla'];
    const randomProduct = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    const product = {
      id: Date.now(),
      nombre: randomProduct,
      quien: 'AVI',
      comprado: false,
      aviSuggestion: true
    };
    
    setShoppingList(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
    
    aviSpeak(`💡 Agregué ${randomProduct} - vi que lo suelen comprar y puede ser útil.`);
  };

  // AVI welcome message when user logs in
  useEffect(() => {
    if (currentUser && currentPage === 'home') {
      setTimeout(() => {
        aviSpeak(`¡Hola ${currentUser.name}! 👋 Soy AVI, tu asistente de compras familiar. ¿En qué puedo ayudarte hoy?`);
      }, 1000);
    }
  }, [currentUser, currentPage]);

  // Login Page
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="relative">
              <div className="text-6xl mb-4 animate-pulse">🤖</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AVI Shopper
            </h1>
            <p className="text-gray-600 mt-2">Tu IA familiar para compras inteligentes</p>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                🧠 <strong>AVI</strong> aprende de tu familia y coordina las compras automáticamente
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">¿Quién eres?</h2>
            {mockUsers.map(user => (
              <button
                key={user.id}
                onClick={() => {
                  setCurrentUser(user);
                  setCurrentPage('home');
                }}
                className="w-full flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{user.avatar}</span>
                <div className="text-left">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-500">
                    {user.role === 'admin' ? 'Puede confirmar pedidos' : 'Miembro activo'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main App Layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Bar */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* AVI Chat Bubble */}
      {(aviMessage || aviIsThinking) && (
        <div className="fixed bottom-4 left-4 max-w-sm z-50">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-2xl shadow-lg relative">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">
                {aviIsThinking ? (
                  <div className="animate-spin">🤖</div>
                ) : (
                  <div className="animate-pulse">🤖</div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-xs mb-1">AVI</div>
                {aviIsThinking ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                ) : (
                  <div className="text-sm">{aviMessage}</div>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-500 transform translate-y-full"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl animate-pulse">🤖</div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AVI Shopper
                </h1>
                <div className="text-xs text-gray-500">Tus compras del supermercado consolidadas</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{currentUser?.avatar}</span>
                <span className="font-medium">{currentUser?.name}</span>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentPage('login');
                  setAviMessage('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'home', name: 'AVI Central', icon: Brain },
              { id: 'list', name: 'Lista Smart', icon: ShoppingCart },
              { id: 'compare', name: 'Análisis IA', icon: BarChart3 },
              { id: 'checkout', name: 'Confirmar', icon: CheckCircle }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  currentPage === id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home Page - AVI Central */}
        {currentPage === 'home' && (
          <div className="space-y-6">
            {/* AVI Status Card */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">AVI está activa 🤖✨</h2>
                  <p className="opacity-90">Coordinando las compras de tu familia inteligentemente</p>
                </div>
                <div className="text-6xl animate-pulse opacity-80">🧠</div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-sm opacity-80">Precisión AVI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">$15K</div>
                  <div className="text-sm opacity-80">Ahorrado este mes</div>
                </div>
              </div>
            </div>

            {/* Family Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Actividad Familiar Inteligente</h3>
                <button
                  onClick={aviSuggestProduct}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center space-x-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AVI Sugiere</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {shoppingList.products.slice(-4).map(product => (
                  <div key={product.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                    product.aviSuggestion ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
                  }`}>
                    <span className="text-lg">
                      {product.quien === 'AVI' ? '🤖' : mockUsers.find(u => u.name === product.quien)?.avatar}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm">
                        <strong>{product.quien}</strong> {product.quien === 'AVI' ? 'sugirió' : 'agregó'} <em>{product.nombre}</em>
                      </div>
                      {product.aviSuggestion && (
                        <div className="text-xs text-purple-600 font-medium">✨ Sugerencia inteligente</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Categories Controlled by AVI */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Categorías Controladas por AVI</h3>
                <div className="flex items-center space-x-2 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <Brain className="w-4 h-4" />
                  <span>10 categorías activas</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { name: 'Lácteos y Refrigerados', icon: '🥛', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                  { name: 'Panadería y Harinas', icon: '🍞', color: 'bg-orange-50 border-orange-200 text-orange-700' },
                  { name: 'Cereales y Legumbres', icon: '🌾', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                  { name: 'Abarrotes y Despensa', icon: '🥫', color: 'bg-red-50 border-red-200 text-red-700' },
                  { name: 'Carnes y Proteínas', icon: '🥩', color: 'bg-pink-50 border-pink-200 text-pink-700' },
                  { name: 'Frutas y Verduras', icon: '🥕', color: 'bg-green-50 border-green-200 text-green-700' },
                  { name: 'Higiene y Cuidado Personal', icon: '🧴', color: 'bg-purple-50 border-purple-200 text-purple-700' },
                  { name: 'Limpieza del Hogar', icon: '🧽', color: 'bg-teal-50 border-teal-200 text-teal-700' },
                  { name: 'Bebidas y Líquidos', icon: '🥤', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
                  { name: 'Snacks y Reposición Rápida', icon: '🍿', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' }
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`p-3 border-2 rounded-lg transition-all hover:shadow-md cursor-pointer ${category.color}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-xs font-medium leading-tight">{category.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="text-lg">🤖</div>
                  <div className="text-sm text-gray-600">
                    <strong>AVI monitorea precios y stock</strong> en tiempo real para optimizar tus compras familiares
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Insights de AVI</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    💡 Líder tiene mejores precios esta semana (-12% promedio)
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    📊 Tu familia gasta 23% menos desde que uso AVI
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    🎯 Predicción: Necesitarán detergente en 3 días
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Armonía Familiar</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Colaboración:</span>
                    <span className="font-medium text-green-600">Excelente</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participación:</span>
                    <span className="font-medium text-blue-600">100% activa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Satisfacción:</span>
                    <span className="font-medium text-purple-600">😊 Muy alta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List Page - Smart List */}
        {currentPage === 'list' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lista Inteligente</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Brain className="w-4 h-4" />
                  <span>AVI monitoreando</span>
                </div>
              </div>
              
              {shoppingList.status === 'abierta' && (
                <div className="flex space-x-3 mb-6">
                  <input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="¿Qué necesitas? AVI te ayudará..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addProduct()}
                  />
                  <button
                    onClick={addProduct}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {shoppingList.products.map(product => (
                  <div
                    key={product.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      product.comprado ? 'bg-green-50 border-green-200' : 
                      product.aviSuggestion ? 'bg-purple-50 border-purple-200' : 
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={product.comprado}
                        onChange={() => toggleProduct(product.id)}
                        className="w-5 h-5 text-purple-600"
                        disabled={shoppingList.status !== 'abierta'}
                      />
                      <div>
                        <div className={`font-medium flex items-center space-x-2 ${product.comprado ? 'line-through text-gray-500' : ''}`}>
                          <span>{product.nombre}</span>
                          {product.aviSuggestion && <Sparkles className="w-4 h-4 text-purple-500" />}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <span>
                            {product.quien === 'AVI' ? '🤖' : mockUsers.find(u => u.name === product.quien)?.avatar}
                          </span>
                          <span>
                            {product.quien === 'AVI' ? 'Sugerido por AVI' : `Agregado por ${product.quien}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {shoppingList.status === 'abierta' && (
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {shoppingList.products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>AVI está lista para ayudarte</p>
                  <p className="text-sm">Agrega productos y verás la magia</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Compare Page - AI Analysis */}
        {currentPage === 'compare' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Análisis Inteligente de Precios</h2>
                <div className="flex items-center space-x-2 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <Brain className="w-4 h-4" />
                  <span>AVI analizando</span>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="font-medium text-purple-700">Recomendación de AVI</div>
                    <div className="text-sm text-purple-600">
                      Te recomiendo comprar en <strong>Líder</strong> - ahorrarías $2.340 (8.2%) vs otros supermercados
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Producto</th>
                      {Object.entries(mockSupermarkets).map(([key, market]) => (
                        <th key={key} className="text-center py-3 px-4">
                          <div className={`inline-block px-3 py-1 rounded-full text-white text-sm ${market.color}`}>
                            {market.name}
                          </div>
                        </th>
                      ))}
                      <th className="text-center py-3 px-4 font-medium">AVI Recomienda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingList.products.map(product => {
                      const prices = mockPrices[product.nombre] || {};
                      const minPrice = Math.min(...Object.values(prices));
                      const bestStore = Object.entries(prices).find(([_, price]) => price === minPrice)?.[0];
                      
                      return (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{product.nombre}</span>
                              {product.aviSuggestion && <Sparkles className="w-4 h-4 text-purple-500" />}
                            </div>
                          </td>
                          {Object.entries(mockSupermarkets).map(([key, market]) => (
                            <td key={key} className="text-center py-3 px-4">
                              {prices[key] ? (
                                <span className={`font-medium ${prices[key] === minPrice ? 'text-green-600' : ''}`}>
                                  ${prices[key].toLocaleString()}
                                </span>
                              ) : (
                                <span className="text-gray-400">N/D</span>
                              )}
                            </td>
                          ))}
                          <td className="text-center py-3 px-4">
                            {bestStore && (
                              <div className="text-sm">
                                <div className="font-medium text-green-600 flex items-center justify-center space-x-1">
                                  <span>${minPrice.toLocaleString()}</span>
                                  <Zap className="w-3 h-3" />
                                </div>
                                <div className="text-gray-500">{mockSupermarkets[bestStore].name}</div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {shoppingList.products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>AVI necesita productos para analizar</p>
                  <p className="text-sm">Ve a la lista y agrega algunos productos</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Checkout Page */}
        {currentPage === 'checkout' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Confirmación Inteligente</h2>
              
              {shoppingList.status === 'en_proceso' ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🤖✨</div>
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">¡AVI Coordinó Todo Perfectamente!</h3>
                  <p className="text-gray-600 mb-4">
                    El pedido fue procesado y enviado a {mockSupermarkets[shoppingList.supermercadoElegido].name}
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-700">
                      🤖 <strong>AVI está monitoreando:</strong> Te notificaré cuando el pedido esté listo para recoger
                    </div>
                  </div>
                </div>
              ) : currentUser?.role !== 'admin' ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🤖</div>
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-xl font-semibold text-yellow-600 mb-2">AVI Requiere Autorización</h3>
                  <p className="text-gray-600 mb-4">
                    Solo Papá o Mamá pueden autorizar la compra final
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-sm text-yellow-700">
                      🤖 <strong>AVI sugiere:</strong> Pide a un administrador que confirme el pedido
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* AVI Recommendation */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">🤖</div>
                      <div>
                        <div className="font-bold">Recomendación Final de AVI</div>
                        <div className="text-sm opacity-90">
                          Basado en precios, calidad y tu historial familiar, te sugiero <strong>Líder</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-4">Resumen Inteligente del Pedido:</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        {shoppingList.products.map(product => (
                          <div key={product.id} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span>{product.nombre}</span>
                              {product.aviSuggestion && <Sparkles className="w-4 h-4 text-purple-500" />}
                            </div>
                            <div className="text-right text-sm">
                              <div className="text-gray-500">
                                {product.quien === 'AVI' ? '🤖 AVI' : `${product.quien}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-medium">
                          <span>Total de productos:</span>
                          <span>{shoppingList.products.length}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Sugeridos por AVI:</span>
                          <span>{shoppingList.products.filter(p => p.aviSuggestion).length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">AVI recomienda estos supermercados:</h3>
                    {Object.entries(mockSupermarkets).map(([key, market], index) => {
                      const total = shoppingList.products.reduce((sum, product) => {
                        const prices = mockPrices[product.nombre] || {};
                        return sum + (prices[key] || 0);
                      }, 0);

                      const isRecommended = key === 'lider'; // AVI recommends Líder
                      const savings = index === 1 ? 2340 : index === 0 ? -1200 : -800;

                      return (
                        <button
                          key={key}
                          onClick={() => confirmOrder(key)}
                          className={`w-full p-4 border-2 rounded-lg transition-all text-left relative ${
                            isRecommended 
                              ? 'border-purple-400 bg-purple-50 hover:bg-purple-100' 
                              : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          {isRecommended && (
                            <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                              <Sparkles className="w-3 h-3" />
                              <span>AVI Recomienda</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${market.color}`}></div>
                              <span className="font-medium">{market.name}</span>
                              {isRecommended && <div className="text-2xl">🤖</div>}
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${total.toLocaleString()}</div>
                              <div className={`text-sm ${savings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {savings > 0 ? `Ahorras ${savings}` : `+${Math.abs(savings)}`}
                              </div>
                            </div>
                          </div>
                          {isRecommended && (
                            <div className="mt-2 text-sm text-purple-600">
                              ✨ Mejor relación precio-calidad según análisis de AVI
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* AVI Tips */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🤖</div>
                      <div>
                        <div className="font-medium text-blue-700 mb-1">Consejo de AVI:</div>
                        <div className="text-sm text-blue-600">
                          Si confirmas ahora, puedo coordinar la entrega para mañana en la tarde. 
                          También agregaré automáticamente productos que sueles necesitar cada mes.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating AVI Helper */}
      <button
        onClick={() => aviSpeak("¡Hola! Soy AVI, tu asistente inteligente. ¿En qué puedo ayudarte? 🤖✨")}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40 animate-bounce"
        style={{animationDuration: '3s', animationIterationCount: 'infinite'}}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;