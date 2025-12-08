// LIVE DATA from Grocery_Track.js (grams → 50g threshold)
let groceryData = JSON.parse(localStorage.getItem('groceryData') || '[]');

const groceries = groceryData.map((item, index) => ({
    id: index + 1,
    name: item.name,
    quantity: parseFloat(item.qty) || 0,
    unit: "g",
    lowStockThreshold: 50,  // <50g = LOW STOCK
    expiryDate: item.expiry || null
}));

class AlertsPanel {
    constructor(groceries) {
        this.groceries = groceries;
        this.init();
    }
    
    init() {
        lucide.createIcons();
        this.render();
        lucide.createIcons();
    }
    
    getLowStockItems() {
        return this.groceries.filter(item => item.quantity <= 50); // 50g threshold
    }
    
    getExpiringItems() {
        return this.groceries.filter(item => {
            if (!item.expiryDate) return false;
            const expiry = new Date(item.expiryDate);
            const today = new Date();
            const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays <= 3 && diffDays >= 0;
        });
    }
    
    getAlerts() {
        const lowStockItems = this.getLowStockItems();
        const expiringItems = this.getExpiringItems();
        
        return [
            ...lowStockItems.map(item => ({
                id: `low-${item.id}`,
                type: "warning",
                icon: "alert-triangle",
                title: `Low Stock: ${item.name}`,
                description: `Only ${item.quantity}g remaining (<50g)`,
                action: "Add to Cart"
            })),
            ...expiringItems.map(item => ({
                id: `expiry-${item.id}`,
                type: "danger",
                icon: "clock",
                title: `Expiring Soon: ${item.name}`,
                description: `Expires on ${item.expiryDate}`,
                action: "Use Now"
            }))
        ];
    }
    
    updateStats(lowStockCount, expiringCount, totalCount) {
        document.getElementById('low-stock-count').textContent = lowStockCount;
        document.getElementById('expiring-count').textContent = expiringCount;
        document.getElementById('total-count').textContent = totalCount;
    }
    
    renderAlert(alert) {
        return `
            <div class="alert-item ${alert.type}" data-alert-id="${alert.id}">
                <div class="alert-icon">
                    <i data-lucide="${alert.icon}"></i>
                </div>
                <div>
                    <div class="alert-content">
                        <h4 class="alert-title">${alert.title}</h4>
                        <p class="alert-description">${alert.description}</p>
                    </div>
                    <div>
                        <button class="btn btn-soft">${alert.action}</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    render() {
        const lowStockItems = this.getLowStockItems();
        const expiringItems = this.getExpiringItems();
        const alerts = this.getAlerts();
        
        this.updateStats(lowStockItems.length, expiringItems.length, this.groceries.length);
        
        const alertsList = document.getElementById('alerts-list');
        if (alerts.length === 0) {
            alertsList.innerHTML = `
                <div class="no-alerts">
                    <i data-lucide="info"></i>
                    <p>No alerts at the moment. Your kitchen is well stocked!</p>
                </div>
            `;
        } else {
            alertsList.innerHTML = alerts.map(alert => this.renderAlert(alert)).join('');
        }
        
        this.attachEventListeners();
        lucide.createIcons();
    }
    
    attachEventListeners() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const alertItem = e.target.closest('.alert-item');
                const action = e.target.textContent;
                console.log(`Action: ${action} for alert ${alertItem.dataset.alertId}`);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AlertsPanel(groceries);
});
