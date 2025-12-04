import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  type ComponentType,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  LayoutDashboard,
  Package,
  Tags,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  Heart,
} from "lucide-react";
import {
  products as initialProducts,
  categories as initialCategories,
  testimonials as initialTestimonials,
  Product,
  Category,
  Testimonial,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "@/lib/uploadImage";

// Simple client-side admin auth (demo only)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "artfromtheheart2025", // matches demo text on login screen
};

type TabType =
  | "dashboard"
  | "products"
  | "categories"
  | "enquiries"
  | "testimonials"
  | "settings";

// ---------------- Root Admin Component ----------------

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // ---------- Data state (products, categories, testimonials) ----------

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return initialProducts;
    const saved = localStorage.getItem("adminProducts");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === "undefined") return initialCategories;
    const saved = localStorage.getItem("adminCategories");
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    if (typeof window === "undefined") return initialTestimonials;
    const saved = localStorage.getItem("adminTestimonials");
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // ---------- Persistence ----------

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("adminCategories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("adminTestimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  // ---------- Auth ----------

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_CREDENTIALS.username &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("adminLoggedIn", "true");
      }
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminLoggedIn");
    }
    toast.success("Logged out successfully");
  };

  // ---------- Import / Export ----------

  const exportData = () => {
    const data = { products, categories, testimonials };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "artfromtheheart-data.json";
    a.click();
    toast.success("Data exported successfully");
  };

  const importData = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse((event.target?.result as string) || "{}");
        if (data.products) setProducts(data.products);
        if (data.categories) setCategories(data.categories);
        if (data.testimonials) setTestimonials(data.testimonials);
        toast.success("Data imported successfully");
      } catch {
        toast.error("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  // ---------- Login Screen ----------

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
                  setLoginData((prev) => ({ ...prev, username: e.target.value }))
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
                  setLoginData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Demo: <span className="font-mono">admin / artfromtheheart2025</span>
          </p>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: ComponentType<any> }[] = [

    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "enquiries", label: "Enquiries", icon: MessageSquare },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

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

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
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
      <main className="flex-1 p-6 md:p-8 overflow-auto space-y-6">
        {activeTab === "dashboard" && (
          <Dashboard products={products} categories={categories} />
        )}

        {activeTab === "products" && (
          <ProductsManager
            products={products}
            categories={categories}
            setProducts={setProducts}
            exportData={exportData}
            importData={importData}
          />
        )}

        {activeTab === "categories" && (
          <CategoriesManager
            categories={categories}
            setCategories={setCategories}
            products={products}
          />
        )}

        {activeTab === "enquiries" && <EnquiriesManager />}

        {activeTab === "testimonials" && (
          <TestimonialsManager
            testimonials={testimonials}
            setTestimonials={setTestimonials}
          />
        )}

        {activeTab === "settings" && <SettingsManager />}
      </main>
    </div>
  );
}

// ---------------- Dashboard ----------------

type DashboardProps = {
  products: Product[];
  categories: Category[];
};

function Dashboard({ products, categories }: DashboardProps) {
  const featuredCount = products.filter((p) => p.isFeatured).length;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: products.length, color: "bg-primary" },
          { label: "Categories", value: categories.length, color: "bg-accent" },
          { label: "Featured", value: featuredCount, color: "bg-green-500" },
          { label: "Enquiries", value: 12, color: "bg-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="card-aipan p-4 space-y-2">
            <p className="text-muted-foreground text-xs">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <div className={cn("w-full h-1 rounded-full", stat.color, "opacity-20")}>
              <div
                className={cn("h-full rounded-full", stat.color)}
                style={{ width: "60%" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-aipan p-4 space-y-3">
          <h2 className="font-heading font-semibold text-sm">Recent Products</h2>
          <div className="space-y-2">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-aipan p-4 space-y-3">
          <h2 className="font-heading font-semibold text-sm">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() =>
                toast.info("Open the Products tab to add a new product.")
              }
              className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full btn-outline flex items-center justify-center gap-2 text-sm"
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
  stockStatus: "in-stock" | "made-to-order" | "out-of-stock";
};

type ProductsManagerProps = {
  products: Product[];
  categories: Category[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  exportData: () => void;
  importData: (e: ChangeEvent<HTMLInputElement>) => void;
};

function ProductsManager({
  products,
  categories,
  setProducts,
  exportData,
  importData,
}: ProductsManagerProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const deleteProduct = (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const handleSave = (data: ProductFormValues) => {
    const imageArray = data.images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (editingProduct) {
      // UPDATE
      setProducts((prev) =>
        prev.map((p) =>
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
      toast.success("Product updated");
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
        images:
          imageArray.length > 0
            ? imageArray
            : ["https://via.placeholder.com/600x600?text=Product+Image"],
        stockStatus: data.stockStatus,
        isFeatured: false,
        isBestseller: false,
        isNew: true,
        rating: 5,
        reviewCount: 0,
        dimensions: "",
        material: "",
        processingTime: "7-10 days",
        tags: [],
        careInstructions: "",
        customization: "",
      };

      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product added");
    }

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold">Products</h1>

        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background text-sm min-w-[180px]"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background text-sm min-w-[150px] capitalize"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <label className="btn-outline cursor-pointer flex items-center gap-2 text-sm">
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
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" /> Export
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="card-aipan overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Product</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Featured</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium truncate max-w-[180px]">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground capitalize">
                  {product.category.replace(/-/g, " ")}
                </td>
                <td className="px-4 py-3 font-medium">₹{product.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      product.stockStatus === "in-stock"
                        ? "bg-green-500/10 text-green-700"
                        : product.stockStatus === "made-to-order"
                        ? "bg-accent/20 text-aipan-gold"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {product.stockStatus.replace(/-/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleFeatured(product.id)}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      product.isFeatured
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    ★
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
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
                  </div>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  No products found. Try changing the search or filters.
                </td>
              </tr>
            )}
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

// ---------------- Product Form (with Cloudinary uploads) ----------------

type ProductFormProps = {
  product: Product | null;
  categories: Category[];
  onSave: (values: ProductFormValues) => void;
  onClose: () => void;
};

function ProductForm({ product, categories, onSave, onClose }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormValues>(() => ({
    name: product?.name ?? "",
    price: product ? String(product.price) : "",
    category: product?.category ?? categories[0]?.slug ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    images: product?.images?.join(", ") ?? "",
    stockStatus: product?.stockStatus ?? "in-stock",
  }));

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const url = await uploadImageToCloudinary(file);
        uploaded.push(url);
      }

      setForm((prev) => ({
        ...prev,
        images: prev.images
          ? `${prev.images.trim()}, ${uploaded.join(", ")}`
          : uploaded.join(", "),
      }));

      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch (error) {
      console.error(error);
      toast.error("Could not upload images. Please try again.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price, and category are required.");
      return;
    }

    onSave(form);
  };

  const parsedImages = form.images
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const removeImageAtIndex = (index: number) => {
    const next = parsedImages.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, images: next.join(", ") }));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-card max-w-2xl w-full rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold">
            {product ? "Edit Product" : "Add Product"}
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
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm"
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
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm"
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
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock Status</label>
              <select
                name="stockStatus"
                value={form.stockStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm"
              >
                <option value="in-stock">In stock</option>
                <option value="made-to-order">Made to order</option>
                <option value="out-of-stock">Out of stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <input
              name="shortDescription"
              type="text"
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm"
              placeholder="Perfect for pooja room, gifting, and festive décor."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images</label>

            <textarea
              name="images"
              value={form.images}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
              placeholder="Paste image URLs here, comma-separated"
            />

            <p className="text-xs text-muted-foreground mt-1">
              First image will be used as the main thumbnail. You can paste
              URLs above or upload image files below. Uploaded images are
              stored on Cloudinary.
            </p>

            <div className="mt-3 space-y-1">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={isUploading}
                className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20 disabled:opacity-50"
              />
              {isUploading && (
                <p className="text-xs text-muted-foreground">Uploading images…</p>
              )}
            </div>

            {parsedImages.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <div className="flex flex-wrap gap-2">
                  {parsedImages.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border"
                    >
                      <img
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageAtIndex(idx)}
                        className="absolute -top-1 -right-1 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------- Enquiries ----------------

function EnquiriesManager() {
  const enquiries = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      products: "Mandala Clock",
      quantity: 2,
      status: "New",
    },
    {
      id: 2,
      name: "Priya Verma",
      phone: "8765432109",
      products: "Pooja Thali Set",
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 3,
      name: "Amit Joshi",
      phone: "7654321098",
      products: "Diya Set x 5",
      quantity: 5,
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Enquiries</h1>
      <div className="card-aipan overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Customer</th>
              <th className="text-left px-4 py-3 font-medium">Phone</th>
              <th className="text-left px-4 py-3 font-medium">Products</th>
              <th className="text-left px-4 py-3 font-medium">Qty</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
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
                      "text-xs px-2 py-1 rounded-full",
                      e.status === "New"
                        ? "bg-blue-500/10 text-blue-600"
                        : e.status === "In Progress"
                        ? "bg-accent/20 text-aipan-gold"
                        : "bg-green-500/10 text-green-600"
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

type TestimonialsManagerProps = {
  testimonials: Testimonial[];
  setTestimonials: Dispatch<SetStateAction<Testimonial[]>>;
};


function TestimonialsManager({
  testimonials,
  setTestimonials,
}: TestimonialsManagerProps) {
  const deleteTestimonial = (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial deleted");
  };

  const toggleFeatured = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isFeatured: !t.isFeatured } : t
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Testimonials</h1>
        <button
          type="button"
          onClick={() => toast("Add testimonial feature coming soon.")}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-3">
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
                  <span className="font-semibold text-sm">{t.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.location}
                  </span>
                  {t.isFeatured && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < (t.rating ?? 5) ? "text-accent" : "text-muted"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"{t.review}"</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleFeatured(t.id)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    t.isFeatured
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground"
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
    siteName: "ArtFromTheHeart",
    heroHeading: "Handmade Aipan Art for Your Sacred Spaces",
    whatsappNumber: "919876543210",
    email: "hello@artfromtheheart.in",
    instagram: "artfromtheheart.in",
    footerTagline: "Handmade with ♥ in Uttarakhand",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("siteSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch {
        // ignore invalid json
      }
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("siteSettings", JSON.stringify(settings));
    }
    toast.success("Settings saved!");
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">Settings</h1>

      <div className="card-aipan p-6 space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <label className="block text-sm font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, [key]: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        ))}

        <button onClick={handleSave} className="btn-primary text-sm">
          Save Settings
        </button>
      </div>
    </div>
  );
}

// ---------------- Categories Manager ----------------

// ---------------- Categories Manager ----------------

type CategoriesManagerProps = {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  products: Product[];
};

function CategoriesManager({
  categories,
  setCategories,
  products,
}: CategoriesManagerProps) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Category name cannot be empty");
      return;
    }

    const slug = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (categories.some((c) => c.slug === slug)) {
      toast.error("Category already exists");
      return;
    }

    // Use first category as template to satisfy any extra required fields
    const template = categories[0];

    const newCategory: Category = template
      ? {
          ...template,
          id: Date.now().toString(),
          name: trimmed,
          slug,
          description: "",
        }
      : ({
          id: Date.now().toString(),
          name: trimmed,
          slug,
          description: "",
        } as Category);

    setCategories((prev) => [...prev, newCategory]);
    setName("");
    toast.success("Category added");
  };

  const deleteCategory = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (!category) return;

    const used = products.some((p) => p.category === category.slug);
    if (used) {
      toast.error("Cannot delete category that is used by products");
      return;
    }

    if (!window.confirm("Delete this category?")) return;

    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">Categories</h1>

      <div className="card-aipan p-4 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm"
          />
          <button onClick={handleAdd} className="btn-primary text-sm">
            Add
          </button>
        </div>
      </div>

      <div className="card-aipan p-4">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Name</th>
              <th className="text-left px-4 py-2 font-medium">Slug</th>
              <th className="text-right px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t border-border">
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2 text-xs text-muted-foreground">
                  {cat.slug}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
