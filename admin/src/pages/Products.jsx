import { Link } from 'react-router-dom'

const Products = () => {
    const products = [
        { id: 1, name: 'T-Shirt', price: '€ 25.00', stock: 120, status: 'Active' },
        { id: 2, name: 'Jeans', price: '€ 55.00', stock: 50, status: 'Active' },
        { id: 3, name: 'Jacket', price: '€ 120.00', stock: 10, status: 'Low Stock' },
        { id: 4, name: 'Shoes', price: '€ 85.00', stock: 0, status: 'Out of Stock' },
    ]

    return (
        <div className="card table-card">
            <div className="card-header">
                <div>
                    <div className="card-title">Products</div>
                    <div className="card-subtitle">Manage your product inventory</div>
                </div>
                <div className="table-actions">
                    <Link to="/products/new" className="btn primary">+ Add Product</Link>
                </div>
            </div>
            <div className="table">
                <div className="table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {products.map((product) => (
                    <div key={product.id} className="table-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                        <span>{product.stock}</span>
                        <span className={`status ${product.status === 'Active' ? 'status-success' :
                                product.status === 'Low Stock' ? 'status-pending' : 'status-failed'
                            }`}>
                            {product.status}
                        </span>
                        <Link to={`/products/${product.id}`} className="btn subtle" style={{ width: 'fit-content', padding: '4px 12px' }}>Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
