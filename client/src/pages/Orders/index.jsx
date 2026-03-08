import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  PackageSearch,
  Search,
  Truck
} from 'lucide-react';
import './Orders.css';

const ordersData = [
  {
    id: 'ORD-2031',
    date: 'March 6, 2026',
    status: 'Processing',
    items: 2,
    total: '$146.00',
    payment: 'Card',
    shipping: '24 Sunset St, New York, US'
  },
  {
    id: 'ORD-2024',
    date: 'March 2, 2026',
    status: 'Shipped',
    items: 1,
    total: '$79.99',
    payment: 'Cash on Delivery',
    shipping: '14 Market Road, Brooklyn, US'
  },
  {
    id: 'ORD-2012',
    date: 'February 24, 2026',
    status: 'Delivered',
    items: 4,
    total: '$228.50',
    payment: 'Card',
    shipping: '8 River View, Queens, US'
  },
  {
    id: 'ORD-1987',
    date: 'February 10, 2026',
    status: 'Cancelled',
    items: 1,
    total: '$33.00',
    payment: 'Card',
    shipping: '52 Broadway, Manhattan, US'
  }
];

const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const filterMatch = activeFilter === 'All' || order.status === activeFilter;
      const searchText = search.trim().toLowerCase();
      const searchMatch =
        !searchText ||
        order.id.toLowerCase().includes(searchText) ||
        order.shipping.toLowerCase().includes(searchText);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

  return (
    <section className="ordersPage">
      <div className="container ordersContainer">
        <div className="ordersTopActions">
          <Link to="/" className="ordersBackBtn">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="ordersHero">
          <div>
            <p className="ordersTag">My Orders</p>
            <h2>Order History</h2>
            <p>Track your recent orders, payments and delivery progress.</p>
          </div>
          <div className="ordersStat">
            <span>Total Orders</span>
            <strong>{ordersData.length}</strong>
          </div>
        </div>

        <div className="ordersToolbar">
          <div className="ordersSearch">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by order ID or address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ordersFilters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'filterBtn active' : 'filterBtn'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="ordersList">
          {filteredOrders.length === 0 ? (
            <div className="emptyOrders">
              <PackageSearch size={28} />
              <p>No orders found for this filter.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <article className="orderCard" key={order.id}>
                <div className="orderCardTop">
                  <div>
                    <h4>{order.id}</h4>
                    <p><CalendarDays size={15} /> {order.date}</p>
                  </div>
                  <span className={`orderStatus ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>

                <div className="orderDetailsGrid">
                  <div>
                    <small>Items</small>
                    <strong>{order.items}</strong>
                  </div>
                  <div>
                    <small>Total</small>
                    <strong>{order.total}</strong>
                  </div>
                  <div>
                    <small>Payment</small>
                    <strong><CreditCard size={15} /> {order.payment}</strong>
                  </div>
                  <div>
                    <small>Delivery</small>
                    <strong><Truck size={15} /> Standard</strong>
                  </div>
                </div>

                <p className="orderAddress"><MapPin size={15} /> {order.shipping}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
