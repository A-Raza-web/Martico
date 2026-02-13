import { Link, useNavigate } from 'react-router-dom'

const Products = () => {
    const navigate = useNavigate();

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
                    <div className="card-title">Products Category List</div>
                    <div className="card-subtitle">View your product category List</div>
                </div>
            </div>

            <div className="table">
                <div className="table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span>Status</span>
                </div>

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="table-row"
                        style={{
                            gridTemplateColumns: '2fr 1fr 1fr 1fr',
                            cursor: "pointer"
                        }}
                        onClick={() => navigate(`/product-list/${product.id}`)}
                    >
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                        <span>{product.stock}</span>
                        <span className={`status ${
                            product.status === 'Active' ? 'status-success' :
                            product.status === 'Low Stock' ? 'status-pending' :
                            'status-failed'
                        }`}>
                            {product.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;
