// Products Display Script for Main Page

const STORAGE_KEY_PRODUCTS = 'artfromtheheart_products';

function getDefaultProducts() {
    // Return default products if none exist (for first-time visitors)
    return [
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
}

function getProducts() {
    const productsJson = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (productsJson) {
        try {
            const products = JSON.parse(productsJson);
            if (Array.isArray(products) && products.length > 0) {
                return products;
            }
        } catch (e) {
            console.error('Error parsing products from localStorage:', e);
        }
    }
    // If no products in storage, get defaults and save them
    const defaultProducts = getDefaultProducts();
    try {
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(defaultProducts));
    } catch (e) {
        console.error('Error saving default products:', e);
    }
    return defaultProducts;
}

function renderProducts() {
    try {
        const products = getProducts();
        const container = document.querySelector('.products-grid') || document.getElementById('productsGrid');
        
        if (!container) {
            console.error('Products grid container not found');
            return;
        }
        
        if (!products || products.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #8B7355;"><h3>No products available at the moment</h3><p>Please check back soon!</p></div>';
            return;
        }
        
        container.innerHTML = products.map(product => {
            // Build details HTML
            const details = [];
            if (product.materials) {
                details.push(`<span class="detail-item">Material: ${product.materials}</span>`);
            }
            if (product.size) {
                details.push(`<span class="detail-item">Size: ${product.size}</span>`);
            }
            if (product.details && product.details.length > 0) {
                product.details.forEach(detail => {
                    if (detail && detail.trim()) {
                        details.push(`<span class="detail-item">${detail}</span>`);
                    }
                });
            }
            
            // Escape quotes in product name for onclick
            const escapedName = (product.name || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
            const productPrice = product.price || '$0.00';
            const productImage = product.image || 'https://via.placeholder.com/400x400?text=No+Image';
            const productName = product.name || 'Unnamed Product';
            const productDesc = product.description || 'No description available.';
            
            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${productImage}" alt="${productName}" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${productName}</h3>
                        <p class="product-price">${productPrice}</p>
                        <p class="product-description">${productDesc}</p>
                        <div class="product-details">
                            ${details.join('')}
                        </div>
                        <a href="#" class="product-button" onclick="window.open(getWhatsAppLink('${escapedName}', '${productPrice}'), '_blank'); return false;">Order via WhatsApp</a>
                    </div>
                </div>
            `;
        }).join('');
        
        console.log(`Successfully rendered ${products.length} products`);
    } catch (error) {
        console.error('Error rendering products:', error);
        const container = document.querySelector('.products-grid');
        if (container) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #8B7355;"><h3>Error loading products</h3><p>Please refresh the page.</p></div>';
        }
    }
}

// Load products when page loads - try multiple methods for reliability
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProducts);
} else {
    // DOM already loaded
    renderProducts();
}

// Also try after a small delay to ensure everything is ready
setTimeout(renderProducts, 100);

