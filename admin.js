// Admin Panel JavaScript

// Storage Keys
const STORAGE_KEY_PRODUCTS = 'artfromtheheart_products';
const STORAGE_KEY_ORDERS = 'artfromtheheart_orders';
const SESSION_KEY = 'artfromtheheart_admin_session';

// Authentication Check
function checkAuthentication() {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) {
        window.location.href = 'login.html';
        return false;
    }
    
    const sessionData = JSON.parse(session);
    const now = new Date().getTime();
    
    // Check if session is still valid (24 hours)
    if (now - sessionData.timestamp >= 24 * 60 * 60 * 1000) {
        // Session expired
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
}

// Initialize default products if none exist
function initializeDefaultProducts() {
    const products = getProducts();
    if (products.length === 0) {
        const defaultProducts = [
            {
                id: '1',
                name: 'Ceramic Moonlight Vase',
                price: '$45.00',
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
                description: 'A beautifully hand-thrown ceramic vase with a subtle moonlit glaze, perfect for displaying your favorite blooms.',
                materials: 'Stoneware Clay',
                size: '8" H × 5" W',
                details: ['Handmade in USA']
            },
            {
                id: '2',
                name: 'Earth Tones Throw Blanket',
                price: '$85.00',
                image: 'https://images.unsplash.com/photo-1606800053560-9869313e8e14?w=400&h=400&fit=crop',
                description: 'Cozy handwoven throw blanket in warm earth tones, made from 100% organic cotton with a soft, luxurious feel.',
                materials: 'Organic Cotton',
                size: '50" × 60"',
                details: ['Handwoven']
            },
            {
                id: '3',
                name: 'Rustic Clay Bowl Set',
                price: '$65.00',
                image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
                description: 'A set of three handcrafted bowls in varying sizes, featuring a natural terracotta finish with subtle texture.',
                materials: 'Terracotta Clay',
                size: 'Set of 3 (S, M, L)',
                details: ['Food Safe Glaze']
            },
            {
                id: '4',
                name: 'Sage & Lavender Candle',
                price: '$28.00',
                image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d5ae4d?w=400&h=400&fit=crop',
                description: 'Hand-poured soy candle with a calming blend of sage and lavender, housed in a handcrafted ceramic vessel.',
                materials: 'Soy Wax',
                size: 'Burn Time: 40 hours',
                details: ['Natural Fragrance']
            },
            {
                id: '5',
                name: 'Macrame Wall Hanging',
                price: '$55.00',
                image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d5ae4d?w=400&h=400&fit=crop',
                description: 'Intricately knotted macrame wall art featuring natural cotton cord in a modern geometric pattern.',
                materials: 'Natural Cotton',
                size: '24" × 36"',
                details: ['Hand Knotted']
            },
            {
                id: '6',
                name: 'Reclaimed Wood Serving Tray',
                price: '$75.00',
                image: 'https://images.unsplash.com/photo-1606800053560-9869313e8e14?w=400&h=400&fit=crop',
                description: 'Beautifully crafted serving tray made from reclaimed barn wood, finished with food-safe natural oil.',
                materials: 'Reclaimed Wood',
                size: '18" × 12"',
                details: ['Hand Sanded & Finished']
            }
        ];
        saveProducts(defaultProducts);
    }
}

// Product Management Functions
function getProducts() {
    const productsJson = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return productsJson ? JSON.parse(productsJson) : [];
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
}

function addProduct(product) {
    const products = getProducts();
    product.id = Date.now().toString();
    products.push(product);
    saveProducts(products);
    return product;
}

function updateProduct(id, updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...updatedProduct, id };
        saveProducts(products);
        return true;
    }
    return false;
}

function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
    return filtered.length !== products.length;
}

// Order Management Functions
function getOrders() {
    const ordersJson = localStorage.getItem(STORAGE_KEY_ORDERS);
    return ordersJson ? JSON.parse(ordersJson) : [];
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
}

function addOrder(order) {
    const orders = getOrders();
    order.id = Date.now().toString();
    order.date = new Date().toISOString();
    orders.unshift(order); // Add to beginning
    saveOrders(orders);
    return order;
}

function updateOrder(id, updatedOrder) {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        orders[index] = { ...orders[index], ...updatedOrder };
        saveOrders(orders);
        return true;
    }
    return false;
}

function deleteOrder(id) {
    const orders = getOrders();
    const filtered = orders.filter(o => o.id !== id);
    saveOrders(filtered);
    return filtered.length !== orders.length;
}

// Dashboard Functions
function updateDashboard() {
    const products = getProducts();
    const orders = getOrders();
    
    // Calculate statistics
    const totalProducts = products.length;
    const totalOrders = orders.length;
    
    let totalRevenue = 0;
    let pendingOrders = 0;
    const statusCounts = {
        pending: 0,
        confirmed: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
    };
    
    orders.forEach(order => {
        const priceMatch = order.productPrice.match(/\$?([\d.]+)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        if (order.status !== 'cancelled') {
            totalRevenue += price * order.quantity;
        }
        if (order.status === 'pending') {
            pendingOrders++;
        }
        if (statusCounts.hasOwnProperty(order.status)) {
            statusCounts[order.status]++;
        }
    });
    
    // Update stats cards
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toFixed(2);
    document.getElementById('pendingOrders').textContent = pendingOrders;
    
    // Render recent orders
    const recentOrders = orders.slice(0, 5);
    const recentOrdersContainer = document.getElementById('recentOrders');
    if (recentOrders.length === 0) {
        recentOrdersContainer.innerHTML = '<p style="color: #8B7355; text-align: center; padding: 2rem;">No orders yet</p>';
    } else {
        recentOrdersContainer.innerHTML = recentOrders.map(order => {
            const date = new Date(order.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
            const priceMatch = order.productPrice.match(/\$?([\d.]+)/);
            const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
            const total = (price * order.quantity).toFixed(2);
            return `
                <div class="recent-order-item">
                    <div>
                        <strong>${order.customerName}</strong> - ${order.productName}
                        <br><small style="color: #8B7355;">${formattedDate} • Qty: ${order.quantity} • $${total}</small>
                    </div>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </div>
            `;
        }).join('');
    }
    
    // Render status chart
    const statusChart = document.getElementById('orderStatusChart');
    statusChart.innerHTML = Object.entries(statusCounts).map(([status, count]) => `
        <div class="status-chart-item">
            <p style="text-transform: capitalize; margin-bottom: 0.5rem;">${status}</p>
            <h4>${count}</h4>
        </div>
    `).join('');
}

// Export Functions
function exportToJSON(data, filename) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportOrdersToCSV() {
    const orders = getOrders();
    if (orders.length === 0) {
        alert('No orders to export');
        return;
    }
    
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Product', 'Quantity', 'Price', 'Total', 'Status', 'Notes'];
    const rows = orders.map(order => {
        const priceMatch = order.productPrice.match(/\$?([\d.]+)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        const total = (price * order.quantity).toFixed(2);
        const date = new Date(order.date).toLocaleDateString();
        return [
            order.id,
            date,
            `"${order.customerName}"`,
            order.phone,
            `"${order.productName}"`,
            order.quantity,
            order.productPrice,
            total,
            order.status,
            `"${order.notes || ''}"`
        ].join(',');
    });
    
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Bulk Operations
let selectedProductIds = new Set();
let selectedOrderIds = new Set();

function toggleProductSelection(productId) {
    if (selectedProductIds.has(productId)) {
        selectedProductIds.delete(productId);
    } else {
        selectedProductIds.add(productId);
    }
    updateBulkProductActions();
}

function toggleOrderSelection(orderId) {
    if (selectedOrderIds.has(orderId)) {
        selectedOrderIds.delete(orderId);
    } else {
        selectedOrderIds.add(orderId);
    }
    updateBulkOrderActions();
}

function selectAllProducts(checked) {
    const products = getProducts();
    if (checked) {
        products.forEach(p => selectedProductIds.add(p.id));
    } else {
        selectedProductIds.clear();
    }
    updateBulkProductActions();
    renderProducts();
}

function selectAllOrders(checked) {
    const orders = getOrders();
    const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    let filteredOrders = orders;
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.phone.toLowerCase().includes(searchTerm) ||
            order.productName.toLowerCase().includes(searchTerm)
        );
    }
    if (statusFilter) {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    if (checked) {
        filteredOrders.forEach(o => selectedOrderIds.add(o.id));
    } else {
        selectedOrderIds.clear();
    }
    updateBulkOrderActions();
    renderOrders();
}

function updateBulkProductActions() {
    const bulkDeleteBtn = document.getElementById('bulkDeleteProducts');
    if (selectedProductIds.size > 0) {
        bulkDeleteBtn.style.display = 'inline-block';
        bulkDeleteBtn.textContent = `Delete Selected (${selectedProductIds.size})`;
    } else {
        bulkDeleteBtn.style.display = 'none';
    }
}

function updateBulkOrderActions() {
    const bulkDeleteBtn = document.getElementById('bulkDeleteOrders');
    const bulkUpdateBtn = document.getElementById('bulkUpdateStatus');
    const bulkStatusSelect = document.getElementById('bulkStatusSelect');
    
    if (selectedOrderIds.size > 0) {
        bulkDeleteBtn.style.display = 'inline-block';
        bulkDeleteBtn.textContent = `Delete Selected (${selectedOrderIds.size})`;
        bulkUpdateBtn.style.display = 'inline-block';
        bulkStatusSelect.style.display = 'inline-block';
    } else {
        bulkDeleteBtn.style.display = 'none';
        bulkUpdateBtn.style.display = 'none';
        bulkStatusSelect.style.display = 'none';
    }
}

// Display Functions
function renderProducts() {
    const products = getProducts();
    const container = document.getElementById('productsList');
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase() || '';
    
    let filteredProducts = products;
    if (searchTerm) {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)) ||
            (product.materials && product.materials.toLowerCase().includes(searchTerm))
        );
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No products found</h3><p>' + (searchTerm ? 'Try a different search term' : 'Click "Add New Product" to get started!') + '</p></div>';
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const isSelected = selectedProductIds.has(product.id);
        return `
        <div class="product-card-admin">
            <div style="position: relative;">
                <input type="checkbox" style="position: absolute; top: 10px; left: 10px; z-index: 10;" 
                       ${isSelected ? 'checked' : ''} 
                       onchange="toggleProductSelection('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="product-image-admin" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            </div>
            <div class="product-info-admin">
                <h3 class="product-name-admin">${product.name}</h3>
                <p class="product-price-admin">${product.price}</p>
                <p style="color: #8B7355; font-size: 0.9rem; margin-top: 0.5rem;">${product.description.substring(0, 80)}...</p>
                <div class="product-actions">
                    <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn-danger" onclick="deleteProductConfirm('${product.id}')">Delete</button>
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    updateBulkProductActions();
}

function renderOrders() {
    const orders = getOrders();
    const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const dateFrom = document.getElementById('dateFrom')?.value;
    const dateTo = document.getElementById('dateTo')?.value;
    
    let filteredOrders = orders;
    
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.phone.toLowerCase().includes(searchTerm) ||
            order.productName.toLowerCase().includes(searchTerm)
        );
    }
    
    if (statusFilter) {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    if (dateFrom) {
        const fromDate = new Date(dateFrom);
        filteredOrders = filteredOrders.filter(order => new Date(order.date) >= fromDate);
    }
    
    if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        filteredOrders = filteredOrders.filter(order => new Date(order.date) <= toDate);
    }
    
    const tbody = document.getElementById('ordersTableBody');
    const selectAllCheckbox = document.getElementById('selectAllOrders');
    
    if (filteredOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="empty-state"><h3>No orders found</h3><p>Orders will appear here when customers place them via WhatsApp.</p></td></tr>';
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
        return;
    }
    
    // Check if all visible orders are selected
    const allSelected = filteredOrders.every(order => selectedOrderIds.has(order.id));
    if (selectAllCheckbox) selectAllCheckbox.checked = allSelected;
    
    tbody.innerHTML = filteredOrders.map(order => {
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        const formattedTime = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Calculate total
        const priceMatch = order.productPrice.match(/\$?([\d.]+)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        const total = (price * order.quantity).toFixed(2);
        const isSelected = selectedOrderIds.has(order.id);
        
        return `
            <tr>
                <td><input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleOrderSelection('${order.id}')"></td>
                <td>#${order.id.substring(0, 8)}</td>
                <td>${formattedDate}<br><small style="color: #8B7355;">${formattedTime}</small></td>
                <td>${order.customerName}</td>
                <td><a href="https://wa.me/${order.phone.replace(/\D/g, '')}" target="_blank" style="color: #25D366; text-decoration: none;">${order.phone}</a></td>
                <td>${order.productName}</td>
                <td>${order.quantity}</td>
                <td>$${total}</td>
                <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                <td>
                    <button class="btn-edit" onclick="editOrder('${order.id}')">Edit</button>
                    <button class="btn-danger" onclick="deleteOrderConfirm('${order.id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
    
    updateBulkOrderActions();
}

// Product Form Functions
function openProductForm(productId = null) {
    const modal = document.getElementById('productFormModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('formTitle');
    
    if (productId) {
        const product = getProducts().find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productImage').value = product.image;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productMaterials').value = product.materials || '';
            document.getElementById('productSize').value = product.size || '';
            document.getElementById('productDetails').value = product.details ? product.details.join('\n') : '';
            title.textContent = 'Edit Product';
        }
    } else {
        form.reset();
        document.getElementById('productId').value = '';
        title.textContent = 'Add New Product';
    }
    
    modal.classList.add('active');
}

function closeProductForm() {
    document.getElementById('productFormModal').classList.remove('active');
    document.getElementById('productForm').reset();
}

function editProduct(id) {
    openProductForm(id);
}

function deleteProductConfirm(id) {
    const product = getProducts().find(p => p.id === id);
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        deleteProduct(id);
        selectedProductIds.delete(id);
        renderProducts();
        updateDashboard();
    }
}

// Order Form Functions
function openOrderForm(orderId = null) {
    const modal = document.getElementById('orderFormModal');
    const form = document.getElementById('orderForm');
    
    // Populate product dropdown
    const productSelect = document.getElementById('orderProduct');
    const products = getProducts();
    productSelect.innerHTML = '<option value="">Select a product</option>' +
        products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name} - ${p.price}</option>`).join('');
    
    if (orderId) {
        const order = getOrders().find(o => o.id === orderId);
        if (order) {
            document.getElementById('orderCustomerName').value = order.customerName;
            document.getElementById('orderPhone').value = order.phone;
            document.getElementById('orderProduct').value = order.productId;
            document.getElementById('orderQuantity').value = order.quantity;
            document.getElementById('orderStatus').value = order.status;
            document.getElementById('orderNotes').value = order.notes || '';
            form.dataset.orderId = order.id;
        }
    } else {
        form.reset();
        delete form.dataset.orderId;
    }
    
    modal.classList.add('active');
}

function closeOrderForm() {
    document.getElementById('orderFormModal').classList.remove('active');
    const form = document.getElementById('orderForm');
    form.reset();
    delete form.dataset.orderId;
}

function editOrder(id) {
    openOrderForm(id);
}

function deleteOrderConfirm(id) {
    const order = getOrders().find(o => o.id === id);
    if (confirm(`Are you sure you want to delete order #${id.substring(0, 8)}?`)) {
        deleteOrder(id);
        selectedOrderIds.delete(id);
        renderOrders();
        updateDashboard();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkAuthentication()) {
        return; // Will redirect to login
    }
    
    // Initialize default products
    initializeDefaultProducts();
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabName}Tab`).classList.add('active');
            
            // Render appropriate content
            if (tabName === 'dashboard') {
                updateDashboard();
            } else if (tabName === 'products') {
                renderProducts();
            } else if (tabName === 'orders') {
                renderOrders();
            }
        });
    });
    
    // Product form
    document.getElementById('addProductBtn').addEventListener('click', () => openProductForm());
    document.getElementById('closeModal').addEventListener('click', closeProductForm);
    document.getElementById('cancelBtn').addEventListener('click', closeProductForm);
    
    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = document.getElementById('productId').value;
        const product = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value,
            materials: document.getElementById('productMaterials').value,
            size: document.getElementById('productSize').value,
            details: document.getElementById('productDetails').value
                .split('\n')
                .filter(d => d.trim())
        };
        
        if (productId) {
            updateProduct(productId, product);
        } else {
            addProduct(product);
        }
        
        closeProductForm();
        renderProducts();
        updateDashboard();
    });
    
    // Order form
    document.getElementById('addOrderBtn').addEventListener('click', () => openOrderForm());
    document.getElementById('closeOrderModal').addEventListener('click', closeOrderForm);
    document.getElementById('cancelOrderBtn').addEventListener('click', closeOrderForm);
    
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const orderId = this.dataset.orderId;
        const productId = document.getElementById('orderProduct').value;
        const product = getProducts().find(p => p.id === productId);
        
        if (!product) {
            alert('Please select a product');
            return;
        }
        
        const order = {
            customerName: document.getElementById('orderCustomerName').value,
            phone: document.getElementById('orderPhone').value,
            productId: productId,
            productName: product.name,
            productPrice: product.price,
            quantity: parseInt(document.getElementById('orderQuantity').value),
            status: document.getElementById('orderStatus').value,
            notes: document.getElementById('orderNotes').value
        };
        
        if (orderId) {
            updateOrder(orderId, order);
        } else {
            addOrder(order);
        }
        
        closeOrderForm();
        renderOrders();
        updateDashboard();
    });
    
    // Order search and filter
    document.getElementById('orderSearch')?.addEventListener('input', renderOrders);
    document.getElementById('statusFilter')?.addEventListener('change', renderOrders);
    document.getElementById('dateFrom')?.addEventListener('change', renderOrders);
    document.getElementById('dateTo')?.addEventListener('change', renderOrders);
    document.getElementById('clearOrderFilters')?.addEventListener('click', function() {
        document.getElementById('orderSearch').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('dateFrom').value = '';
        document.getElementById('dateTo').value = '';
        selectedOrderIds.clear();
        renderOrders();
    });
    
    // Product search
    document.getElementById('productSearch')?.addEventListener('input', renderProducts);
    document.getElementById('clearProductSearch')?.addEventListener('click', function() {
        document.getElementById('productSearch').value = '';
        selectedProductIds.clear();
        renderProducts();
    });
    
    // Bulk product operations
    document.getElementById('bulkDeleteProducts')?.addEventListener('click', function() {
        if (selectedProductIds.size === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedProductIds.size} product(s)?`)) {
            selectedProductIds.forEach(id => deleteProduct(id));
            selectedProductIds.clear();
            renderProducts();
        }
    });
    
    // Bulk order operations
    document.getElementById('bulkDeleteOrders')?.addEventListener('click', function() {
        if (selectedOrderIds.size === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedOrderIds.size} order(s)?`)) {
            selectedOrderIds.forEach(id => deleteOrder(id));
            selectedOrderIds.clear();
            renderOrders();
            updateDashboard();
        }
    });
    
    document.getElementById('bulkUpdateStatus')?.addEventListener('click', function() {
        if (selectedOrderIds.size === 0) return;
        const newStatus = document.getElementById('bulkStatusSelect').value;
        if (confirm(`Update ${selectedOrderIds.size} order(s) to "${newStatus}"?`)) {
            selectedOrderIds.forEach(id => {
                const order = getOrders().find(o => o.id === id);
                if (order) {
                    updateOrder(id, { ...order, status: newStatus });
                }
            });
            selectedOrderIds.clear();
            renderOrders();
            updateDashboard();
        }
    });
    
    document.getElementById('selectAllOrders')?.addEventListener('change', function(e) {
        selectAllOrders(e.target.checked);
    });
    
    // Dashboard
    document.getElementById('refreshDashboard')?.addEventListener('click', updateDashboard);
    document.getElementById('exportAllData')?.addEventListener('click', function() {
        const data = {
            products: getProducts(),
            orders: getOrders(),
            exportDate: new Date().toISOString()
        };
        exportToJSON(data, `artfromtheheart_backup_${new Date().toISOString().split('T')[0]}.json`);
    });
    
    // Settings - Export
    document.getElementById('exportProducts')?.addEventListener('click', function() {
        exportToJSON(getProducts(), `products_${new Date().toISOString().split('T')[0]}.json`);
    });
    
    document.getElementById('exportOrders')?.addEventListener('click', function() {
        exportToJSON(getOrders(), `orders_${new Date().toISOString().split('T')[0]}.json`);
    });
    
    document.getElementById('exportOrdersCSV')?.addEventListener('click', exportOrdersToCSV);
    
    // Settings - Import
    document.getElementById('importData')?.addEventListener('click', function() {
        document.getElementById('importFile').click();
    });
    
    document.getElementById('importFile')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                if (data.products) {
                    if (confirm('Import products? This will replace all existing products.')) {
                        saveProducts(data.products);
                        renderProducts();
                        updateDashboard();
                        alert('Products imported successfully!');
                    }
                }
                if (data.orders) {
                    if (confirm('Import orders? This will replace all existing orders.')) {
                        saveOrders(data.orders);
                        renderOrders();
                        updateDashboard();
                        alert('Orders imported successfully!');
                    }
                }
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });
    
    // Settings - Change Password
    document.getElementById('changePasswordForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('passwordError');
        
        // Note: In a real app, this would be handled server-side
        // For now, we'll just show a message (actual password change would need backend)
        if (newPassword !== confirmPassword) {
            errorDiv.textContent = 'New passwords do not match';
            errorDiv.style.display = 'block';
            return;
        }
        
        if (newPassword.length < 6) {
            errorDiv.textContent = 'Password must be at least 6 characters';
            errorDiv.style.display = 'block';
            return;
        }
        
        // In a real implementation, you'd send this to a server
        alert('Password change functionality requires backend integration. For now, update the password in login.js file.');
        this.reset();
        errorDiv.style.display = 'none';
    });
    
    // Settings - Danger Zone
    document.getElementById('clearAllData')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
            if (confirm('This will delete ALL products and orders. Are you absolutely sure?')) {
                localStorage.removeItem(STORAGE_KEY_PRODUCTS);
                localStorage.removeItem(STORAGE_KEY_ORDERS);
                selectedProductIds.clear();
                selectedOrderIds.clear();
                initializeDefaultProducts();
                renderProducts();
                renderOrders();
                updateDashboard();
                alert('All data cleared. Default products restored.');
            }
        }
    });
    
    document.getElementById('resetToDefaults')?.addEventListener('click', function() {
        if (confirm('Reset all products to defaults? This will replace all existing products.')) {
            initializeDefaultProducts();
            renderProducts();
            updateDashboard();
            alert('Products reset to defaults.');
        }
    });
    
    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    });
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Initial render
    renderProducts();
    renderOrders();
    updateDashboard();
});

// Make functions globally available
window.editProduct = editProduct;
window.deleteProductConfirm = deleteProductConfirm;
window.editOrder = editOrder;
window.deleteOrderConfirm = deleteOrderConfirm;
window.toggleProductSelection = toggleProductSelection;
window.toggleOrderSelection = toggleOrderSelection;
window.selectAllProducts = selectAllProducts;
window.selectAllOrders = selectAllOrders;

