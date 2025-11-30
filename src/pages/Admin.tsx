import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, Tags, MessageSquare, Settings, LogOut,
  Plus, Edit, Trash2, Download, Upload, Eye, Heart
} from 'lucide-react';
import {
  products as initialProducts,
  categories as initialCategories,
  testimonials as initialTestimonials,
  Product,
  Category,
  Testimonial,
} from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Admin authentication (simple client-side for demo)
const ADMIN_CREDENTIALS = { username: 'admin', password: 'artfromtheheart2025' };

type TabType =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'enquiries'
  | 'testimonials'
  | 'settings';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return typeof window !== 'undefined'
      ? localStorage.getItem('adminLoggedIn') === 'true'
      : false;
  });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Data state
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return initialProducts;
    const saved = localStorage.getItem('adminProducts');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === 'undefined') return initialCategories;
    const saved = localStorage.getItem('adminCategories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    if (typeof window === 'undefined') return initialTestimonials;
    const saved = localStorage.getItem('adminTestimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Persist data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('adminCategories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('adminTestimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_CREDENTIALS.username &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminLoggedIn', 'true');
      }
      toast.success('Welcome back, Admin!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminLoggedIn');
    }
    toast.success('Logged out successfully');
  };

  const exportData = () => {
    const data = { products, categories, testimonials };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artfromtheheart-data.json';
    a.click();
    toast.success('Data exported successfully');
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.products) setProducts(data.products);
        if (data.categories) setCategories(data.categories);
        if (data.testimonials) setTestimonials(data.testimonials);
        toast.success('Data imported successfully');
      } catch {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary-foreground fill-current" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">ArtFromTheHeart</p>
          </div>
          <form onSubmit={handleLogin} className="card-aipan p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Demo: admin / artfromtheheart2025
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tags },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <div>
              <p className="font-heading font-bold">ArtFromTheHeart</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && (
          <Dashboard products={products} categories={categories} />
        )}
        {activeTab === 'products' && (
          <ProductsManager
            products={products}
            categories={categories}
            setProducts={setProducts}
            exportData={exportData}
            importData={importData}
          />
        )}
        {activeTab === 'categories' && (
          <CategoriesManager
            categories={categories}
            setCategories={setCategories}
            products={products}
          />
        )}
        {activeTab === 'enquiries' && <EnquiriesManager />}
        {activeTab === 'testimonials' && (
          <TestimonialsManager
            testimonials={testimonials}
            setTestimonials={setTestimonials}
          />
        )}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
}

// ---------------- Dashboard ----------------

function Dashboard({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const featuredCount = products.filter((p) => p.isFeatured).length;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Products', value: products.length, color: 'bg-primary' },
          { label: 'Categories', value: categories.length, color: 'bg-accent' },
          { label: 'Featured', value: featuredCount, color: 'bg-green-500' },
          { label: 'Enquiries', value: 12, color: 'bg-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="card-aipan p-6">
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <div
              className={cn(
                'w-full h-1 rounded-full mt-3',
                stat.color,
                'opacity-20'
              )}
            >
              <div
                className={cn('h-full rounded-full', stat.color)}
                style={{ width: '60%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-aipan p-6">
          <h2 className="font-heading font-semibold mb-4">Recent Products</h2>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-aipan p-6">
          <h2 className="font-heading font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {/* This just hints – real adding is in Products tab */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info('Open the Products tab to add a new product.');
              }}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </a>
            <a
              href="/"
              target="_blank"
              className="w-full btn-outline flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> View Shop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Products Manager + Form ----------------

type ProductFormValues = {
  name: string;
  price: string;
  category: string;
  shortDescription: string;
  description: string;
  images: string; // comma-separated URLs
  stockStatus: 'in-stock' | 'made-to-order' | 'out-of-stock';
};

function ProductsManager({
  products,
  categories,
  setProducts,
  exportData,
  importData,
}: {
  products: Product[];
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  exportData: () => void;
  importData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success('Product deleted');
    }
  };

  const toggleFeatured = (id: string) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
      )
    );
  };

  const handleSave = (data: ProductFormValues) => {
    const imageArray = data.images
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (editingProduct) {
      // UPDATE
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: data.name,
                slug,
                price: Number(data.price) || 0,
                shortDescription: data.shortDescription,
                description: data.description,
                category: data.category,
                stockStatus: data.stockStatus,
                images: imageArray.length ? imageArray : p.images,
              }
            : p
        )
      );
      toast.success('Product updated');
    } else {
      // CREATE
      const nowId = Date.now().toString();

      const newProduct: Product = {
        id: nowId,
        slug,
        name: data.name,
        price: Number(data.price) || 0,
        originalPrice: Number(data.price) || 0,
        shortDescription: data.shortDescription,
        description: data.description,
        category: data.category,
        images: imageArray.length ? imageArray : [
          'https://via.placeholder.com/600x600?text=Product+Image',
        ],
        stockStatus: data.stockStatus,
        // sensible defaults for other fields used on site
        isFeatured: false,
        isBestseller: false,
        isNew: true,
        rating: 5,
        reviewCount: 0,
        dimensions: '',
        material: '',
        processingTime: '7-10 days',
        tags: [],
        careInstructions: '',
        customization: ''
      };

      setProducts([newProduct, ...products]);
      toast.success('Product added');
    }

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Products</h1>
        <div className="flex gap-3">
          <label className="btn-outline cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" /> Import
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          <button
            onClick={exportData}
            className="btn-outline flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="card-aipan overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium">Product</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Featured</th>
              <th className="text-right px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground capitalize">
                  {product.category.replace(/-/g, ' ')}
                </td>
                <td className="px-4 py-3 font-medium">₹{product.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'text-xs px-2 py-1 rounded-full',
                      product.stockStatus === 'in-stock'
                        ? 'bg-green-500/10 text-green-700'
                        : product.stockStatus === 'made-to-order'
                        ? 'bg-accent/20 text-aipan-gold'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {product.stockStatus.replace(/-/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleFeatured(product.id)}
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                      product.isFeatured
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    ★
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
                    }}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  categories,
  onSave,
  onClose,
}: {
  product: Product | null;
  categories: Category[];
  onSave: (values: ProductFormValues) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductFormValues>(() => ({
    name: product?.name ?? '',
    price: product ? String(product.price) : '',
    category: product?.category ?? (categories[0]?.slug ?? ''),
    shortDescription: product?.shortDescription ?? '',
    description: product?.description ?? '',
    images: product?.images?.join(', ') ?? '',
    stockStatus: product?.stockStatus ?? 'in-stock',
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error('Please fill all required fields');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-card max-w-2xl w-full rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                placeholder="Aipan Mandala Clock"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price (₹)<span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="number"
                min={0}
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Stock Status
              </label>
              <select
                name="stockStatus"
                value={form.stockStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background"
              >
                <option value="in-stock">In stock</option>
                <option value="made-to-order">Made to order</option>
                <option value="out-of-stock">Out of stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Short Description
            </label>
            <input
              name="shortDescription"
              type="text"
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background"
              placeholder="Perfect for pooja room, gifting, and festive décor."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Full Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Image URLs (comma-separated)
            </label>
            <textarea
              name="images"
              value={form.images}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
              placeholder="https://..., https://..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              First image will be used as the main thumbnail.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2 rounded-xl">
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------- Categories ----------------

function CategoriesManager({
  categories,
  setCategories,
  products,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  products: Product[];
}) {
  const deleteCategory = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    const productCount = products.filter((p) => p.category === cat?.slug).length;
    if (productCount > 0) {
      toast.error(`Cannot delete: ${productCount} products in this category`);
      return;
    }
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
      toast.success('Category deleted');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Categories</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => {
          const productCount = products.filter(
            (p) => p.category === category.slug
          ).length;
          return (
            <div
              key={category.id}
              className="card-aipan p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <p className="text-xs text-primary mt-1">
                  {productCount} products
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- Enquiries ----------------

function EnquiriesManager() {
  const enquiries = [
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '9876543210',
      products: 'Mandala Clock',
      quantity: 2,
      status: 'New',
    },
    {
      id: 2,
      name: 'Priya Verma',
      phone: '8765432109',
      products: 'Pooja Thali Set',
      quantity: 1,
      status: 'In Progress',
    },
    {
      id: 3,
      name: 'Amit Joshi',
      phone: '7654321098',
      products: 'Diya Set x 5',
      quantity: 5,
      status: 'Completed',
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Enquiries</h1>
      <div className="card-aipan overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium">
                Phone
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium">
                Products
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium">Qty</th>
              <th className="text-left px-4 py-3 text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{e.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.phone}</td>
                <td className="px-4 py-3">{e.products}</td>
                <td className="px-4 py-3">{e.quantity}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'text-xs px-2 py-1 rounded-full',
                      e.status === 'New'
                        ? 'bg-blue-500/10 text-blue-600'
                        : e.status === 'In Progress'
                        ? 'bg-accent/20 text-aipan-gold'
                        : 'bg-green-500/10 text-green-600'
                    )}
                  >
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- Testimonials ----------------

function TestimonialsManager({
  testimonials,
  setTestimonials,
}: {
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}) {
  const deleteTestimonial = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast.success('Testimonial deleted');
    }
  };

  const toggleFeatured = (id: string) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, isFeatured: !t.isFeatured } : t
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Testimonials</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="card-aipan p-4">
            <div className="flex items-start gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {t.location}
                  </span>
                  {t.isFeatured && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < t.rating ? 'text-accent' : 'text-muted'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground">"{t.review}"</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFeatured(t.id)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    t.isFeatured
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  ★
                </button>
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Settings ----------------

function SettingsManager() {
  const [settings, setSettings] = useState({
    siteName: 'ArtFromTheHeart',
    heroHeading: 'Handmade Aipan Art for Your Sacred Spaces',
    whatsappNumber: '919876543210',
    email: 'hello@artfromtheheart.in',
    instagram: 'artfromtheheart.in',
    footerTagline: 'Handmade with ♥ in Uttarakhand',
  });

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
    }
    toast.success('Settings saved!');
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Settings</h1>

      <div className="card-aipan p-6 space-y-6 max-w-2xl">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, [key]: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        ))}

        <button onClick={handleSave} className="btn-primary">
          Save Settings
        </button>
      </div>
    </div>
  );
}
