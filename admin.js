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
    window.location.replace('login.html');
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
                image: 'images/ceramic-vase.jpg',
                description: 'A beautifully hand-thrown ceramic vase with a subtle moonlit glaze, perfect for displaying your favorite blooms.',
                materials: 'Stoneware Clay',
                size: '8" H × 5" W',
                details: ['Handmade in USA']
            },
            {
                id: '2',
                name: 'Earth Tones Throw Blanket',
                price: '$85.00',
                image: 'images/throw-blanket.jpg',
                description: 'Cozy handwoven throw blanket in warm earth tones, made from 100% organic cotton with a soft, luxurious feel.',
                materials: 'Organic Cotton',
                size: '50" × 60"',
                details: ['Handwoven']
            },
            {
                id: '3',
                name: 'Rustic Clay Bowl Set',
                price: '$65.00',
                image: 'images/clay-bowls.jpg',
                description: 'A set of three handcrafted bowls in varying sizes, featuring a natural terracotta finish with subtle texture.',
                materials: 'Terracotta Clay',
                size: 'Set of 3 (S, M, L)',
                details: ['Food Safe Glaze']
            }
        ];
        saveProducts(defaultProducts);
        
        // Create images directory if it doesn't exist
        if (!localStorage.getItem('artfromtheheart_images')) {
            localStorage.setItem('artfromtheheart_images', JSON.stringify({}));
        }
    }
}

// Product Management Functions
function getProducts() {
    try {
        const productsJson = localStorage.getItem(STORAGE_KEY_PRODUCTS);
        return productsJson ? JSON.parse(productsJson) : [];
    } catch (e) {
        console.error('Error parsing products:', e);
        return [];
    }
}

function saveProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
        return true;
    } catch (e) {
        console.error('Error saving products:', e);
        return false;
    }
}

function addProduct(product) {
    try {
        const products = getProducts();
        product.id = Date.now().toString();
        product.images = product.images || [];
        products.push(product);
        return saveProducts(products) ? product : null;
    } catch (e) {
        console.error('Error adding product:', e);
        return null;
    }
}

function updateProduct(id, updatedProduct) {
    try {
        const products = getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            // Preserve existing images if not provided in the update
            if (!updatedProduct.images && products[index].images) {
                updatedProduct.images = products[index].images;
            }
            products[index] = { ...products[index], ...updatedProduct, id };
            return saveProducts(products);
        }
        return false;
    } catch (e) {
        console.error('Error updating product:', e);
        return false;
    }
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
        // Support both old single image and new images array
        const mainImage = (product.images && product.images.length > 0) ? product.images[0] : (product.image || 'https://via.placeholder.com/400x400?text=No+Image');
        const imageCount = (product.images && Array.isArray(product.images)) ? product.images.length : (product.image ? 1 : 0);
        return `
        <div class="product-card-admin">
            <div style="position: relative;">
                <input type="checkbox" style="position: absolute; top: 10px; left: 10px; z-index: 10;" 
                       ${isSelected ? 'checked' : ''} 
                       onchange="toggleProductSelection('${product.id}')">
                <img src="${mainImage}" alt="${product.name}" class="product-image-admin" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                ${imageCount > 1 ? `<span class="image-count-badge">${imageCount} images</span>` : ''}
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

// Product Images Management
let productImages = []; // Array to store current product images (base64 or URLs)

// Save image to local storage
function saveImageToStorage(imageData, filename) {
    try {
        const images = JSON.parse(localStorage.getItem('artfromtheheart_images') || '{}');
        images[filename] = imageData;
        localStorage.setItem('artfromtheheart_images', JSON.stringify(images));
        return `local:${filename}`;
    } catch (e) {
        console.error('Error saving image:', e);
        return null;
    }
}

// Get image from local storage
function getImageFromStorage(key) {
    try {
        if (!key) return null;
        if (key.startsWith('local:')) {
            const images = JSON.parse(localStorage.getItem('artfromtheheart_images') || '{}');
            return images[key.substring(6)] || null;
        }
        return key; // Return as is if it's a regular URL
    } catch (e) {
        console.error('Error getting image:', e);
        return null;
    }
}

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function handleImageUpload(files) {
    if (!files || files.length === 0) return;
    
    for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;
        
        try {
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            
            const filename = `img_${Date.now()}_${file.name}`;
            const imageKey = saveImageToStorage(base64Data, filename);
            if (imageKey) {
                productImages.push(imageKey);
            }
        } catch (e) {
            console.error('Error processing image:', e);
        }
    }
    
    updateImagePreviewGallery();
}

function updateImagePreviewGallery() {
    const gallery = document.getElementById('imagePreviewGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    productImages.forEach((imgKey, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-preview';
        
        const imgElement = document.createElement('img');
        const imgSrc = getImageFromStorage(imgKey) || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMSAxNnYzYTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0ydi0xM2EyIDIgMCAwIDEgMi0yaDkiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSI4LjUgMTEgMTIgOC41IDE1LjUgMTEgMTkgOCI+PC9wb2x5bGluZT48cG9seWdvbiBwb2ludHM9IjMgMTYgNyAxMiAxMSAxNiAxNyA5IDIxIDEzIDIxIDE2IDMgMTYiPjwvcG9seWdvbj48L3N2Zz4=';
        imgElement.src = imgSrc;
        imgElement.alt = 'Product preview';
        imgElement.loading = 'lazy';
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-image';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = () => removeImage(index);
        
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(removeBtn);
        gallery.appendChild(imgContainer);
    });
    
    // Show message if no images
    if (productImages.length === 0) {
        const noImages = document.createElement('div');
        noImages.className = 'no-images';
        noImages.textContent = 'No images uploaded yet';
// Product Form Functions
function openProductForm(productId = null) {
    const modal = document.getElementById('productFormModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('formTitle');
    
    // Reset form and images
    form.reset();
    productImages = [];
    updateImagePreviewGallery();
    
    // Set modal title and action
    if (productId) {
        const product = getProducts().find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            
            // Load images - support both old single image and new images array
            if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                productImages = [...product.images];
            } else if (product.image) {
                // Legacy support: convert single image to array
                productImages = [product.image];
            }
            
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productMaterials').value = product.materials || '';
            document.getElementById('productSize').value = product.size || '';
            document.getElementById('productDetails').value = product.details ? product.details.join('\n') : '';
            title.textContent = 'Edit Product';
        }
    } else {
        title.textContent = 'Add New Product';
    }
    
    // Show modal with animation
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Focus on first input
    const firstInput = form.querySelector('input:not([type="hidden"]), textarea, select');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeProductForm() {
    document.getElementById('productFormModal').classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        document.getElementById('productFormModal').style.display = 'none';
    }, 300);
    document.getElementById('productForm').reset();
    productImages = [];
    updateImagePreviewGallery();
}

// Product form submission
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner">Saving...</span>';
        
        const productId = document.getElementById('productId').value;
        const productData = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value,
            materials: document.getElementById('productMaterials').value,
            size: document.getElementById('productSize').value,
            details: document.getElementById('productDetails').value.split('\n').filter(d => d.trim() !== ''),
            images: [...productImages]
        };
        
        // Basic validation
        if (!productData.name || !productData.price || !productData.description) {
            throw new Error('Please fill in all required fields');
        }
        
        if (productData.images.length === 0) {
            throw new Error('Please add at least one product image');
        }
        
        // Save product
        let success = false;
        if (productId) {
            success = updateProduct(productId, productData);
        } else {
            const newProduct = addProduct(productData);
            success = !!newProduct;
        }
        
        if (success) {
            renderProducts();
            closeProductForm();
            showNotification('Product saved successfully!', 'success');
        } else {
            throw new Error('Failed to save product');
        }
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification(error.message || 'Error saving product. Please try again.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
    
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

