import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
  customText?: string;
}

interface EnquiryCartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, customText?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getWhatsAppMessage: () => string;
  totalItems: number;
}

const EnquiryCartContext = createContext<EnquiryCartContextType | undefined>(undefined);

export function EnquiryCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('enquiryCart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('enquiryCart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1, customText?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customText: customText || item.customText }
            : item
        );
      }
      return [...prev, { product, quantity, customText }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getWhatsAppMessage = () => {
    if (items.length === 0) return '';
    
    let message = 'Hi! I would like to enquire about the following products:\n\n';
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Price: ₹${item.product.price}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      if (item.customText) {
        message += `   Custom text: ${item.customText}\n`;
      }
      message += '\n';
    });
    
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    message += `Total Estimated: ₹${total}\n\n`;
    message += 'Please let me know the availability and delivery details.';
    
    return encodeURIComponent(message);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <EnquiryCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getWhatsAppMessage,
        totalItems,
      }}
    >
      {children}
    </EnquiryCartContext.Provider>
  );
}

export function useEnquiryCart() {
  const context = useContext(EnquiryCartContext);
  if (!context) {
    throw new Error('useEnquiryCart must be used within an EnquiryCartProvider');
  }
  return context;
}
